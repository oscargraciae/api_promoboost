import Redis from 'ioredis'
const redis = new Redis('redis://localhost:6379')

export const removeDataConnection = async (key: string) => {
  const _key = `auth_info_baileys/${key}`
  try {
    await redis.del(_key)
  } catch {

  }
}
