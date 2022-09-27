import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { User } from '../database/entity'
import { KisService } from '../kis/kis.service'
import { EditMeDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly kisService: KisService,
  ) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return { me: user }
  }

  @Get('test')
  async test() {
    return this.kisService.getDailyPrice('TSLA', '20220927', 2)
  }

  @Patch('me')
  editMe(@GetUser('id') userId: number, @Body() editMeDto: EditMeDto) {
    return this.userService.editMe(userId, editMeDto)
  }
}
