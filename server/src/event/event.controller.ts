import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  createWithParticipants(@Body() createEventWithParticipantsDto: CreateEventWithParticipantsDto): Promise<Event> {
    return this.eventService.createWithParticipants(createEventWithParticipantsDto);
  }

  @Post('only')
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    try {
      return this.eventService.create(createEventDto);
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Get()
  findAll(): Promise<Event[]> {
    try {
      return this.eventService.findAll();
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    try {
      return this.eventService.findOne(id);
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      return this.eventService.update(id, updateEventDto);
    } catch (error) {
      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Event> {
    try {
      return this.eventService.remove(id);
    } catch (error) {
      throw new BadRequestException('Failed ', error.message);
    }
  }
}