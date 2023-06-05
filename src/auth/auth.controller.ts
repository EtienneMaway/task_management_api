import {Body, Controller,Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from 'src/users/dto/user.credentials.dto';
import { SETTINGS } from 'src/utils/app.utils';



@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    ) {}


@Post('/signin')
async signIn(@Body(SETTINGS.VALIDATION_PIPE) userCredentials: UserCredentialsDto): 
Promise<{accessToken: string;}>{
  return await this.authService.signIn(userCredentials)
}

}
