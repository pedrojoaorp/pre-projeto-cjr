import { Category } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CategoryEntity implements Category {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
