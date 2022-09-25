import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { DataSource, Repository, QueryFailedError } from 'typeorm'
import { SignupDto } from '../../auth/dto'
import { User } from '../entity'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(
      User,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async createUser(signupDto: SignupDto) {
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
          throw new ConflictException('User already exists')
        }
      } else {
        throw new InternalServerErrorException('Something went wrong')
      }
    }
  }
}
