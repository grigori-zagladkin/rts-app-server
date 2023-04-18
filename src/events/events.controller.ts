import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { EventDto, SortEvents } from './event.dto';
import EventResponse from './events.response';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export default class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Получение новости по слагу' })
  @ApiResponse({ status: 200, type: EventResponse })
  @HttpCode(200)
  @Get('/by-slug/:slug')
  async getEventBySlug(@Param('slug') slug: string) {
    return await this.eventsService.getEventBySlug(slug);
  }

  @ApiOperation({ summary: 'Получение новости по слагу' })
  @ApiResponse({ status: 200, type: [EventResponse] })
  @HttpCode(200)
  @Get()
  async getAllEvent(@Query('filterType') filterType: SortEvents) {
    return await this.eventsService.getAllEvents(filterType);
  }

  @Auth('ADMIN')
  @ApiOperation({ summary: 'Создание новости' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post()
  async createEvent() {
    return await this.eventsService.createEvent();
  }

  @Auth('ADMIN')
  @ApiOperation({ summary: 'Обновление новости' })
  @ApiResponse({ status: 200, type: EventResponse })
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(`/:id`)
  async updateEvent(@Param('id') id: string, @Body() dto: EventDto) {
    return await this.eventsService.updateEvent(+id, dto);
  }

  @Auth('ADMIN')
  @ApiOperation({ summary: 'Удаление новости' })
  @ApiResponse({ status: 200, type: EventResponse })
  @HttpCode(200)
  @Delete(`/:id`)
  async deleteEvent(@Param('id') id: string) {
    return await this.eventsService.deleteEvent(+id);
  }
}
