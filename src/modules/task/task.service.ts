import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id: data.id,
      },
    });

    if (taskExists) {
      throw new Error(
        'Task ID tried to overwrite another. Something went real wrong oops',
      );
    }

    return await this.prisma.task.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateTaskDto) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new Error('Task with matching ID not found');
    }

    return await this.prisma.task.update({
      data,
      where: {
        id,
      },
    });
  }

  async removeFinished() {
    return await this.prisma.task.deleteMany({
      where: {
        finished: true,
      },
    });
  }

  async remove(id: number) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new Error('Task with matching ID not found');
    }

    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
