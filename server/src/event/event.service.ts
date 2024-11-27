import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User, UserDocument } from '../user/schemas/user.schema';


@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async createWithParticipants(createEventWithParticipantsDto: CreateEventWithParticipantsDto): Promise<String> {
    try {
      //check if participantIds validats
      const participantIds = createEventWithParticipantsDto.participantIds;
      const existingParticipants = await this.userModel.find({
        _id: { $in: participantIds }
      });

      // hre we check if all provided IDs exist
      if (existingParticipants.length !== participantIds.length) {
        throw new NotFoundException('One or more participant IDs are invalid');
      }

      // create and save thevnt with participant IDs
      const eventData = {
        name: createEventWithParticipantsDto.name,
        startDate: createEventWithParticipantsDto.startDate,
        endDate: createEventWithParticipantsDto.endDate,
        status: createEventWithParticipantsDto.status,
        participants: participantIds
      };

      const createdEvent = new this.eventModel(eventData);
      await createdEvent.save();



      return 'event Created';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find()
      .populate({
        path: 'participants',
        model: 'User',
        select: 'name email -_id'
      })
      .exec();
  }

  async findOne(id: string): Promise<Event> {

    // return event details wth all participantIds
    const event = await this.eventModel
      .findById(id)
      .populate({
        path: 'participants',
        model: 'User',
        select: 'name email -_id'
      })
      .exec();

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