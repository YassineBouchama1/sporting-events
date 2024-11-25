import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { Participant } from './schemas/participant.schema';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantController {
constructor(private readonly participantService: ParticipantService) {}

@Post()
create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
  return this.participantService.create(createParticipantDto);
}

@Get(':eventId')
findAll(@Param('eventId') eventId: string): Promise<Participant[]> {
  return this.participantService.findAll(eventId);
}

@Get(':id')
findOne(@Param('id') id: string): Promise<Participant> {
  return this.participantService.findOne(id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
  return this.participantService.update(id, updateParticipantDto);
}

@Delete(':id')
remove(@Param('id') id: string): Promise<Participant> {
  return this.participantService.remove(id);
}
}