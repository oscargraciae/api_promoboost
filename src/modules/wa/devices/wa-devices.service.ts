import { CreateDeviceDTO } from './dto/create-device'

export class WADeviceService {
  async create (device: CreateDeviceDTO) {
    return { message: 'OK' }
  }
}
