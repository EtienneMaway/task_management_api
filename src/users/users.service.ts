import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCredentialsDto } from './dto/user.credentials.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async signup(userCredetialsDto: UserCredentialsDto){

    const {username, password} = userCredetialsDto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = password
    await user.save()
    return {message: 'User saved successfully in the database'}
  }



  async getByUserName(user: UserCredentialsDto){

    const {username } = user
    return this.userRepository.findOne({where: {username}})
  }
}
