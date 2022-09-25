import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { KisService } from '../kis/kis.service'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private kisService: KisService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return { me: user }
  }

  @Get('test')
  test() {
    // return this.kisService.getCurrentPrice()
    return this.kisService.getDailyPrice()
  }
}
