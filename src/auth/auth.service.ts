import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from '../database/repository'
import { LoginDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { id: userId } = await this.userRepository.createUser(signupDto)

    return this.signToken(userId)
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findUserByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedException('invalid email')
    }

    const { id: userId, password } = user

    const isMatchedPassword = await bcrypt.compare(loginDto.password, password)

    if (!isMatchedPassword) {
      throw new UnauthorizedException('invalid password')
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
