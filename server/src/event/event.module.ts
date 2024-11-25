import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { Participant, ParticipantSchema } from 'src/participant/schemas/participant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }, { name: Participant.name, schema: ParticipantSchema }]),],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule { }
