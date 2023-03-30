/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { BufferJSON, initAuthCreds, proto, AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '@adiwajshing/baileys'
import { Redis } from 'ioredis'
import { join } from 'path'

export const useRedisAuthState = async (schemakey: string, device: string): Promise<{ state: AuthenticationState, saveCreds: () => Promise<any> }> => {
  const redis = global.redis as Redis

  const AUTH_BASE_KEY = 'auth'

  const getAuthKey = (key: string) => join(AUTH_BASE_KEY, schemakey, device, fixKeyName(key))

  const fixKeyName = (key: string) => key?.replace(/\//g, '__')?.replace(/:/g, '-')

  const writeData = async (data: any, key: string) => {
    const _key = getAuthKey(key)
    return await redis.set(_key, JSON.stringify(data, BufferJSON.replacer))
  }

  const readData = async (key: string) => {
    try {
      const _key = getAuthKey(key)
      const data = await redis.get(_key)
      if (data !== null) {
        return JSON.parse(data, BufferJSON.reviver)
      }
    } catch (error) {
      return null
    }
  }

  const removeData = async (key: string) => {
    try {
      await redis.del(getAuthKey(key))
    } catch {

    }
  }

  const creds: AuthenticationCreds = await readData(schemakey) || initAuthCreds()

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const data: { [_: string]: SignalDataTypeMap[typeof type] } = {}
          await Promise.all(
            ids.map(
              async id => {
                let value = await readData(`${type}-${id}`)
                if (type === 'app-state-sync-key' && value) {
                  value = proto.Message.AppStateSyncKeyData.fromObject(value)
                }

                data[id] = value
              }
            )
          )

          return data
        },
        set: async (data) => {
          const tasks: Array<Promise<any>> = []
          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id]
              const key = `${category}-${id}`
              tasks.push(value ? writeData(value, key) : removeData(key))
            }
          }

          await Promise.all(tasks)
        }
      }
    },
    saveCreds: async () => {
      return await writeData(creds, schemakey)
    }
  }
}
