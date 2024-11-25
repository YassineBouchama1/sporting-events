import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
constructor(private readonly eventService: EventService) {}

@Post()
createWithParticipants(@Body() createEventWithParticipantsDto: CreateEventWithParticipantsDto): Promise<Event> {
  return this.eventService.createWithParticipants(createEventWithParticipantsDto);
}

@Post('simple')
create(@Body() createEventDto: CreateEventDto): Promise<Event> {
  return this.eventService.create(createEventDto);
}

@Get()
findAll(): Promise<Event[]> {
  return this.eventService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string): Promise<Event> {
  return this.eventService.findOne(id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
  return this.eventService.update(id, updateEventDto);
}

@Delete(':id')
remove(@Param('id') id: string): Promise<Event> {
  return this.eventService.remove(id);
}
}