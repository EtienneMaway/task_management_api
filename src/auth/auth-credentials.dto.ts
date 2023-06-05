import { IsString, Length, Matches } from "class-validator"
import { MESSAGE, REGEX } from "src/utils/app.utils"

export class UserCredentialsDto{
  @IsString()
  @Length(5, 25)
  username: string

  @IsString()
  @Length(6, 22)
  @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE})
  password: string
}
