import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtGuard } from '../auth/guard/jwt.guard'
import { User } from '../database/entity'
import { EditMeDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return { me: user }
  }

  @Patch('me')
  editMe(@GetUser('id') userId: number, @Body() editMeDto: EditMeDto) {
    return this.userService.editMe(userId, editMeDto)
  }
}
