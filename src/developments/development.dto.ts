import { ApiProperty } from '@nestjs/swagger';
import { Development } from '@prisma/client';
import { IsString } from 'class-validator';

export default class DevelopmentDto
  implements Omit<Development, 'id' | 'createdAt' | 'updatedAt'>
{
  technicalStats: string[];

  @ApiProperty({ example: 'Радар мт-190', description: 'Название разработки' })
  @IsString({ message: 'title should be a string' })
  title: string;

  @ApiProperty({ example: 'радар-мт-190', description: 'Slug разработки' })
  @IsString({ message: 'slug should be a string' })
  slug: string;

  @ApiProperty({
    example: 'Эта разработка ....',
    description: 'описание разработки',
  })
  @IsString({ message: 'description should be a string' })
  description: string;
}
