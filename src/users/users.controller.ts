import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentialsDto } from './dto/user.credentials.dto';
import { SETTINGS } from 'src/utils/app.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body(SETTINGS.VALIDATION_PIPE) userCredetialsDto: UserCredentialsDto){
    return await this.usersService.signup(userCredetialsDto)
  }
}
