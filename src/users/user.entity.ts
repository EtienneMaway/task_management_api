import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TaskEntity } from "src/tasks/task.entity";
import * as bcrypt from 'bcrypt'

@Entity('users')
  @Unique(['username'])export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  username: string

  @Column()
  password:string
  
  @Column()
  salt:string

  @OneToMany(() => TaskEntity, task => task.user, { eager: true })
  tasks: TaskEntity[]


  @BeforeInsert()
  async setPassword(password: string){
    const salt = await bcrypt.genSalt()
    return this.password = await bcrypt.hash(password || this.password, salt)
  }

}