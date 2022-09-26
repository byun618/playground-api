import { Injectable } from '@nestjs/common'
import { okJson } from '../constants'
import { UserRepository } from '../database/repository'
import { EditMeDto } from './dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
