import { IsNotEmpty, IsOptional, IsString, Length, isIn } from "class-validator";
import { TaskStatus } from "../task-status-enum";

export class CreateTaskDto{
  @IsString()
  title: string;
  
  @IsString()
  @Length(5, 500)
  description: string

  @IsOptional()
  status: TaskStatus.OPEN
}