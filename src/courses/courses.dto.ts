import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export default class CourseDto {
  @IsString({ message: 'title should be a string' })
  @ApiProperty({ example: 'курс по c++', description: 'Название курса' })
  title: string;

  @IsString({ message: 'description should be a string' })
  @ApiProperty({
    example: 'этот курс длится год и т.д и т.п ...',
    description: 'Описание курса',
  })
  description: string;

  @IsArray({ each: true })
  @ApiProperty({
    example: ['ewfewrgfe.jpg', 'regegeg.jpg'],
    description: 'Массив изображений относящихся к курсу',
  })
  imagesPath: string[];
}
