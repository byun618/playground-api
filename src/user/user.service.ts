import { Injectable } from '@nestjs/common'
import { okJson } from '../constants'
import { CryptoRepository, UserRepository } from '../database/repository'
import { EditMeDto } from './dto'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoRepository: CryptoRepository,
  ) {}

  async editMe(userId: number, editMeDto: EditMeDto) {
    const { name, phone } = editMeDto

    const value = {}

    if (name) {
      Object.assign(value, {
        name,
      })
    }

    if (phone) {
      Object.assign(value, {
        phone,
      })
    }

    await this.userRepository.update(userId, value)

    return okJson
  }

  async getUserCryptos(userId: number) {
    const cryptos = await this.userRepository.findUserCryptos(userId)
    return { cryptos }
  }

  async createUserCrypto(userId: number) {
    const crypto = await this.cryptoRepository.findOne({
      where: {
        id: 1,
      },
    })

    await this.userRepository.createUserCrypto({ userId, crypto })
  }
}
