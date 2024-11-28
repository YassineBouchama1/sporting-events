import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
  ) {}

  async createWithParticipants(
    createEventWithParticipantsDto: CreateEventWithParticipantsDto,
  ): Promise<String> {
    try {
      //check if participantIds validats
      const participantIds = createEventWithParticipantsDto.participantIds;
      const existingParticipants = await this.userModel.find({
        _id: { $in: participantIds },
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
        participants: participantIds,
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
    return this.eventModel
      .find()
      .populate({
        path: 'participants',
        model: 'User',
        select: 'name email _id',
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
        select: 'name email _id',
      })
      .exec();

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      const existingEvent = await this.eventModel.findById(id);
      if (!existingEvent) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }

      if (updateEventDto.participants) {
        // convert existing IDs to strings
        const existingParticipantIds = (existingEvent.participants || []).map(
          (id) => id.toString(),
        );

        // convert new IDs to strings
        const newParticipantIds = updateEventDto.participants.map((id) =>
          id.toString(),
        );

        // merge and remove duplicates
        const mergedParticipantIds = [
          ...new Set([...existingParticipantIds, ...newParticipantIds]),
        ];

        // validate all participant IDs
        const existingParticipants = await this.userModel.find({
          _id: { $in: mergedParticipantIds },
        });

        if (existingParticipants.length !== mergedParticipantIds.length) {
          const foundIds = existingParticipants.map((p) => p._id.toString());
          const invalidIds = mergedParticipantIds.filter(
            (id) => !foundIds.includes(id),
          );
          throw new NotFoundException(
            `Invalid participant IDs found: ${invalidIds.join(', ')}`,
          );
        }
        console.log('debugging');
        console.log(mergedParticipantIds);
        // assign the merged IDs back to the DTO
        updateEventDto.participants = mergedParticipantIds;
      }

      const updatedEvent = await this.eventModel
        .findByIdAndUpdate(id, updateEventDto, { new: true })
        .exec();

      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update event: ${error.message}`);
    }
  }

  async removeParticipant(
    eventId: string,
    participantId: string,
  ): Promise<Event> {
    try {
      const event = await this.eventModel.findById(eventId);
      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      // here i convert participantId to ObjectId for comparison
      const participantObjectId = new Types.ObjectId(participantId);

      // filter  existing  participants  participantId wants delete
      const participantExists = event.participants.filter(
        (id) => id.toString() !== participantObjectId.toString(),
      );

      // update participant  event
      const updatedEvent = await this.eventModel
        .findByIdAndUpdate(
          eventId,
          {
            participants: participantExists,
          },
          { new: true },
        )
        .exec();

      return updatedEvent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid participant ID format');
      }
      throw new Error(`Failed to remove participant: ${error.message}`);
    }
  }


  

  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deletedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return deletedEvent;
  }
}