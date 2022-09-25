import { Injectable } from '@nestjs/common'
import { LoginDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  signup(signupDto: SignupDto) {
    console.log(signupDto)

    return 'signup'
  }

  login(loginDto: LoginDto) {
    console.log(loginDto)

    return 'login'
  }
}
