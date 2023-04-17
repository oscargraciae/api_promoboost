/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/quotes */
import { Response } from 'express'
import makeWASocket, { ConnectionState, delay, DisconnectReason } from "@adiwajshing/baileys"
import { Boom } from '@hapi/boom'

import { removeDataConnection } from "./redis.service"
// import { readDataConnection, writeDataConnection } from "./redis_redis"

import { useRedisAuthState } from "./redis-at"

const sessions = new Map<string, any>()

export default class WhatsAppConnection {
  constructor (sessionName: string, res?: Response) {
    this.sessionName = sessionName
    this.res = res
  }

  sessionName: string
  res: any

  async start (res?) {
    try {
      const { state, saveCreds } = await useRedisAuthState('auth_info_baileys', this.sessionName)

      // const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${this.sessionName}`)
      const sock = makeWASocket({ printQRInTerminal: false, auth: state, connectTimeoutMs: 30 * 1000 })

      let connectionIsOpen = false

      sock.ev.on('creds.update', saveCreds)
      sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update

        if (qr) {
          if (this.res && !this.res.headersSent) {
            return this.res.json({ isAuth: false, success: false, message: 'unauthorized', qr })
          }
        }

        if (connection === 'open') {
          console.log('OPEN CONNECTION==========', connection)
          sessions.set(this.sessionName, sock)
          connectionIsOpen = true
        }

        if (connection === 'close') {
          console.log('CLOSE CONNECTION==========', connection)
          this.handleConnectionClose(update)
        }
      })

      while (!connectionIsOpen) {
        await delay(1000)
      }

      return sock
    } catch (error) {
      console.error('ERROR STARTING CONNECTION==========', error.message)
      return null
    }
  }

  async getSessionUser (): Promise<any> {
    try {
      if (sessions.has(this.sessionName)) {
        return sessions.get(this.sessionName)
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  async createSession () {
    const sock = await this.start()
    return sock
  }

  async handleConnectionClose (update: Partial<ConnectionState>) {
    try {
      const { lastDisconnect, qr } = update
      // console.log('LAST DISCONNECT===========', lastDisconnect)
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut

      // console.log('SHOULD RECONNECT===========', shouldReconnect)
      if (shouldReconnect) {
        await this.start()
      } else {
        sessions.delete(this.sessionName)
        removeDataConnection(this.sessionName)
        this.res.status(500).json({ error: 'Session closed', message: 'this session is already closed, auth again with the QR code', qr })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
