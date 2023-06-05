import {  BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException  } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import * as  bcrypt from 'bcrypt'
import { UserCredentialsDto } from 'src/users/dto/user.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ){}


  async signIn(userCredentials: UserCredentialsDto): Promise<{accessToken: string;}>{
    const {username, password} = userCredentials

    const user = await this.usersRepository.findOne({where: {username}})
    
    if(!user){
      throw new UnauthorizedException('Invalid credentials')
    }

    if(!await bcrypt.compare(password, user.password)){
      throw new UnauthorizedException('Invalid credentials')
    }
    
    const payLoad: JwtPayload = { username }

    const accessToken = this.jwtService.sign(payLoad)
   
    return { accessToken }
  }



}
