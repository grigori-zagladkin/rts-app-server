import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventDto, SortEvents } from './event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEventBySlug(slug: string) {
    return await this.prismaService.event.findUniqueOrThrow({
      where: { slug },
    });
  }

  async getAllEvents(filterType: SortEvents) {
    if (filterType === 'all') {
      return await this.prismaService.event.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return await this.prismaService.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: filterType == 'active' ? true : false,
      },
    });
  }

  async createEvent() {
    return await this.prismaService.event
      .create({
        data: {
          slug: '',
          status: false,
          title: '',
          description: '',
          date: '0',
        },
      })
      .then((data) => data.id);
  }

  async getEventById(id: number) {
    return await this.prismaService.event.findUniqueOrThrow({ where: { id } });
  }

  async updateEvent(id: number, dto: EventDto) {
    const event = await this.getEventById(id);
    return await this.prismaService.event.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteEvent(id: number) {
    const event = await this.getEventById(id);
    return await this.prismaService.event.delete({
      where: { id },
    });
  }
}
