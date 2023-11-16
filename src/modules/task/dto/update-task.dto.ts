import { PartialType, PickType } from '@nestjs/mapped-types';
import { TaskEntity } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(
  PickType(TaskEntity, ['id', 'title', 'finished', 'categoryId']),
) {}
