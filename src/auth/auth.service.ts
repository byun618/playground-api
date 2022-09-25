import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from '../database/repository'
import { LoginDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { id: userId } = await this.userRepository.createUser(signupDto)

    return this.signToken(userId)
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { id: userId, password } = await this.userRepository.findUserByEmail(
      loginDto.email,
    )

    const isMatchedPassword = await bcrypt.compare(loginDto.password, password)

    if (!isMatchedPassword) {
      throw new UnauthorizedException('login failed')
    }

    return this.signToken(userId)
  }

  async signToken(userId: number): Promise<{ token: string }> {
    const token = await this.jwtService.signAsync(
      { userId },
      {
        secret: process.env.SECRET,
        expiresIn: '168h',
      },
    )
    return { token }
  }
}
