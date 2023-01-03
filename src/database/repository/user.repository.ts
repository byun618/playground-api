import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { DataSource, Repository, QueryFailedError } from 'typeorm'
import { SignupDto } from '../../auth/dto'
import { Crypto, User } from '../entity'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(
      User,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hashSync(signupDto.password, salt)

      const user = this.create({
        ...signupDto,
        password,
      })

      await this.save(user)

      return user
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if ((err as any).code === 'ER_DUP_ENTRY') {
          throw new ConflictException('user already exists')
        }
      } else {
        throw new InternalServerErrorException('something went wrong')
      }
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({
      select: {
        id: true,
        password: true,
      },
      where: {
        email,
      },
    })

    if (!user) {
      throw new ForbiddenException('invalid email')
    }

    return user
  }

  async findUserCryptos(userId: number): Promise<Crypto[]> {
    const user = await this.findOne({
      select: {
        cryptos: {
          id: true,
          ticker: true,
          name: true,
          imageUrl: true,
        },
      },
      where: {
        id: userId,
      },
      relations: ['cryptos'],
    })

    if (!user) {
      throw new ForbiddenException('invalid email')
    }

    return user.cryptos
  }

  async createUserCrypto({
    userId,
    crypto,
  }: {
    userId: number
    crypto: Crypto
  }) {
    const user = await this.findOne({
      select: {
        id: true,
      },
      where: {
        id: userId,
      },
      relations: ['cryptos'],
    })

    if (!user) {
      throw new ForbiddenException('invalid email')
    }

    const { cryptos } = user

    const isCryptoExists = cryptos.some((crypto) => crypto.id === crypto.id)

    if (isCryptoExists) {
      throw new ConflictException('crypto already exists')
    }

    user.cryptos = [...cryptos, crypto]

    await this.save(user)
  }
}
