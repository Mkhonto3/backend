import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
    const task = this.taskRepository.create({ ...createTaskDto, userId });
    return this.taskRepository.save(task);
  }
}
