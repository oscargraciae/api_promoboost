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
  // sessions = new Map<string, any>()

  async start (res?) {
    const { state, saveCreds } = await useRedisAuthState('auth_info_baileys', this.sessionName)
    const sock = makeWASocket({ printQRInTerminal: false, auth: state, connectTimeoutMs: 30 * 1000 })

    let connectionIsOpen = false

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', (update) => {
      const { connection, qr } = update
      if (qr) {
        if (this.res && !this.res.headersSent) {
          return this.res.json({ success: false, message: 'unauthorized', qr })
        }
      }

      if (connection === 'open') {
        sessions.set(this.sessionName, sock)
        connectionIsOpen = true

        sock.ev.on('messages.upsert', (resp) => {
          console.log('TRATANDO DE CONSULTAR LOS CHATS==========>')
          console.log(JSON.stringify(resp, undefined, 2))
        })
      }
      if (connection === 'close') {
        this.handleConnectionClose(update)
      }
    })

    while (!connectionIsOpen) {
      await delay(1000)
    }

    return sock
  }

  async getSessionUser (): Promise<any> {
    // return await readDataConnection(this.sessionName)
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

  handleConnectionClose (update: Partial<ConnectionState>) {
    const { lastDisconnect, qr } = update
    const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut

    if (shouldReconnect) {
      this.start()
    } else {
      sessions.delete(this.sessionName)
      removeDataConnection(this.sessionName)
      this.res.status(500).json({ error: 'Session closed', message: 'this session is already closed, auth again with the QR code', qr })
    }
  }
}
