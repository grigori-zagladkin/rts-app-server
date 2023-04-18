import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export default class CompetenceDto {
  @ApiProperty({ example: 'Владениее с++', description: 'Компетенция' })
  @IsString({ message: 'title should be a string' })
  title: string;

  @ApiProperty({
    example: 'Обладание данной компетенцией позволит вам...',
    description: 'Описание компетенции',
  })
  @IsString({ message: 'description should be a string' })
  description: string;

  @ApiProperty({
    example: ['wefegrege.jpg', 'wefewff.jpg'],
    description: 'Массив путей к картинкам',
  })
  @IsArray({ each: true })
  imagesPath: string[];

  @ApiProperty({
    example: 'Обеспечение',
    description: 'Обеспечение компетенции',
  })
  @IsString({ message: '' })
  production: string;

  @ApiProperty({ example: 'владение-с++', description: 'слаг компетенции' })
  slug: string;

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
