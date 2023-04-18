import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';

export default class EventResponse implements Event {
  @ApiProperty({ example: 1, description: 'id новости' })
  id: number;

  @ApiProperty({ example: 'встреча-12.02.2006', description: 'Слаг новости' })
  slug: string;

  @ApiProperty({
    example: 'Встреча 12.02.2006',
    description: 'Название новости',
  })
  title: string;

  @ApiProperty({
    example: 'На этой встрече произойдёт....',
    description: 'Описание новости',
  })
  description: string;

  @ApiProperty({ example: '12.02.2006', description: 'Дата события' })
  date: string;

  @ApiProperty({
    example: ['wefewffewf.jpg', 'wefegreg.jpg'],
    description: 'Массив путей к картинкам',
  })
  imagesPath: string[];

  @ApiProperty({
    example: true,
    description:
      'Статус прохождение события true - уже произошло, false - ещё не было',
  })
  status: boolean;

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'created time',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'updatedAt time',
  })
  updatedAt: Date;
}
