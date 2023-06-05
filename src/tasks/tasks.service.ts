import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';


@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');
  constructor(
    @InjectRepository(TaskEntity) private taskRepository: Repository<TaskEntity>
    ){}

  async getTasks(
    filterDto: GetTaskFilterDto,
    user: User){
    const {status, search} = filterDto

    const query = this.taskRepository.createQueryBuilder('task')

    query.where('task.userId = :userId', {userId: user.id})

    if(status){
      query.andWhere('task.status = :status', {status})
    }

    if(search){
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
    }

    const tasks = await query.getMany()
    return tasks
  }


  async getTaskById(
    id: number,
    @GetUser() user: User
    ): Promise<TaskEntity>{
    const foundTask = await this.taskRepository.findOne({where: {
      id,
      userId: user.id
    }});

    if(!foundTask){
      throw new NotFoundException(`Task with id ${id} is not found`)
    } else{
      return foundTask
    }
  }

  async createTask(
    createTask: CreateTaskDto,
    @GetUser() user: User
    ): Promise<TaskEntity>{
    const {title, description} = createTask

    const task = new TaskEntity()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user
    try{
        await this.taskRepository.save(task)

    }catch(error){
      this.logger.error(`Failed to create task for user ${user.username}. Data: ${CreateTaskDto}`, error.stack)
      throw new InternalServerErrorException()
    }
  
    delete task.user
    return task
  }

  async updateTaskStatus(
    id: number, status: TaskStatus,
    @GetUser() user: User
    ): Promise<TaskEntity>{
    const task: TaskEntity = await this.getTaskById(id, user)

    task.status = status
    return this.taskRepository.save(task)
  }


  async deleteTask(id: number){
    const result = await this.taskRepository.delete(id)
    
    if (result.affected === 0){
      throw new BadRequestException(`The task with ID ${id} not found`)
   }
   return result;
  }

}
