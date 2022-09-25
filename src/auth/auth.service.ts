import { Injectable } from '@nestjs/common'
import { User } from '../database/entity'
import { UserRepository } from '../database/repository'
import { LoginDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signup(signupDto: SignupDto): Promise<User> {
    return this.userRepository.createUser(signupDto)
  }

  login(loginDto: LoginDto) {
    console.log(loginDto)

    return 'login'
  }
}
