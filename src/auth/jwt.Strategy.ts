import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
     super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
  })
  }

  async validate(payLoad: JwtPayload): Promise<User>{
    const { username } = payLoad
    const user = await this.userRepository.findOne({where: {username}})

    if(!user){
      throw new UnauthorizedException()
    }

    return user
  }
}