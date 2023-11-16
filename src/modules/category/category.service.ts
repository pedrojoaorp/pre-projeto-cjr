import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const categoryIDExists = await this.prisma.category.findFirst({
      where: {
        id: data.id,
      },
    });

    const categoryTitleExists = await this.prisma.category.findFirst({
      where: {
        title: data.title,
      },
    });

    if (categoryIDExists) {
      throw new Error(
        'Category ID tried to overwrite another. Something went real wrong oops',
      );
    }

    if (categoryTitleExists) {
      throw new Error('Category titles have to be unique');
    }

    return await this.prisma.category.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.category.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    const categoryIDExists = await this.prisma.category.findFirst({
      where: {
        id,
      },
    });

    const categoryTitleExists = await this.prisma.category.findFirst({
      where: {
        title: data.title,
      },
    });

    if (!categoryIDExists) {
      throw new Error('Category with given ID not found');
    }

    if (categoryTitleExists) {
      throw new Error('Category titles have to be unique');
    }
    return await this.prisma.category.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const categoryIDExists = await this.prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!categoryIDExists) {
      throw new Error('Category with given ID not found');
    }

    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
