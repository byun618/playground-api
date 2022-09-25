import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserRepository } from '../../database/repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    })
  }

  async validate({ userId }) {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
      where: {
        id: userId,
      },
    })

    return user
  }
}
