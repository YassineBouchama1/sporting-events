import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RoleTypes } from 'src/common/types/user.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async createWithParticipants(createEventWithParticipantsDto: CreateEventWithParticipantsDto): Promise<Event> {
    try {
      // Create and save the event
      const createdEvent = new this.eventModel(createEventWithParticipantsDto);
      const savedEvent = await createdEvent.save();

      // Prepare participants data
      const participantsData = await Promise.all(createEventWithParticipantsDto.participants.map(async (participant) => {
        // Check if the participant already exists
        const existingParticipant = await this.userModel.findOne({ email: participant.email });

        if (!existingParticipant) {
          // Generate hashed password
          const hashedPassword = await bcrypt.hash(participant.email, 10);

          // If participant does not exist, prepare the participant data
          return {
            ...participant,
            password: hashedPassword,
            eventId: savedEvent._id,
            role: RoleTypes.Participant
          };
        }

        // If participant exists, return null
        return null;
      }));

      // Filter out null values (existing participants)
      const newParticipants = participantsData.filter(participant => participant !== null);

      // Insert new participants
      if (newParticipants.length > 0) {
        await this.userModel.insertMany(newParticipants);
      }

      return savedEvent;
    } catch (error) {
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