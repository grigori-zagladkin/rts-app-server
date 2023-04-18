import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';

export default class CourseResponse implements Course {
  slug: string;
  @ApiProperty({ example: 1, description: 'id курса' })
  id: number;

  @ApiProperty({ example: 'курс по c++', description: 'Название курса' })
  title: string;

  @ApiProperty({
    example: 'этот курс длится год и т.д и т.п ...',
    description: 'Описание курса',
  })
  description: string;

  @ApiProperty({
    example: ['ewfewrgfe.jpg', 'regegeg.jpg'],
    description: 'Массив изображений относящихся к курсу',
  })
  imagesPath: string[];

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'created time',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Dec 18 1995 03:24:00 GMT...',
    description: 'updated time',
  })
  updatedAt: Date;
}
