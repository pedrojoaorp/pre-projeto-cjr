import { Task } from '@prisma/client';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TaskEntity implements Task {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsBoolean()
  finished: boolean;

  @IsNumber()
  categoryId: number;
}
