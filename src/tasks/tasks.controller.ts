
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from './dto/task-status-validation-pipe';
import { TaskStatus } from './task-status-enum';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService : TasksService){}

  @Get()
  async getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User
    ): Promise<TaskEntity[]>{
    return await this.taskService.getTasks(filterDto, user)
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() newTask : CreateTaskDto,
    @GetUser() user: User
    ) : Promise<TaskEntity>{
    return await this.taskService.createTask(newTask, user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
    ): Promise<TaskEntity>{
    return this.taskService.updateTaskStatus(id, status, user )
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ){
    return await this.taskService.getTaskById(id, user)
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number){
    return this.taskService.deleteTask(id)
  }

}
