import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { Participant, ParticipantDocument } from '../participant/schemas/participant.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
constructor(
  @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
) {}

async createWithParticipants(createEventWithParticipantsDto: CreateEventWithParticipantsDto): Promise<Event> {
  const session = await this.eventModel.db.startSession();
  session.startTransaction();

  try {
    const createdEvent = new this.eventModel(createEventWithParticipantsDto);
    const savedEvent = await createdEvent.save({ session });

    const participants = createEventWithParticipantsDto.participants.map(participant => ({
      ...participant,
      eventId: savedEvent._id,
    }));

    await this.participantModel.insertMany(participants, { session });

    await session.commitTransaction();
    session.endSession();

    return savedEvent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async create(createEventDto: CreateEventDto): Promise<Event> {
  const createdEvent = new this.eventModel(createEventDto);
  return createdEvent.save();
}

async findAll(): Promise<Event[]> {
  return this.eventModel.find().exec();
}

async findOne(id: string): Promise<Event> {
  const event = await this.eventModel.findById(id).exec();
  if (!event) {
    throw new NotFoundException(`Event with ID ${id} not found`);
  }
  return event;
}

async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
  const updatedEvent = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
  if (!updatedEvent) {
    throw new NotFoundException(`Event with ID ${id} not found`);
  }
  return updatedEvent;
}

async remove(id: string): Promise<Event> {
  const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
  if (!deletedEvent) {
    throw new NotFoundException(`Event with ID ${id} not found`);
  }
  return deletedEvent;
}
}