import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const password = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password,
        },
      })

      return this.signToken(user.id, user.email)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email already taken')
        }
      }

      throw err
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) {
      throw new ForbiddenException('Invalid credentials')
    }

    const isMatchedPassword = await argon.verify(user.password, dto.password)

    if (!isMatchedPassword) {
      throw new ForbiddenException('Invalid credentials')
    }

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: number, email: string) {
    const token = await this.jwt.signAsync(
      { userId, email },
      {
        expiresIn: '168h',
        secret: this.config.get('JWT_SECRET'),
      },
    )

    return {
      access_token: token,
    }
  }
}
