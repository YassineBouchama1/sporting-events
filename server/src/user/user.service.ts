import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoleTypes } from '../common/types/user.enum';
import * as bcrypt from 'bcrypt';
import { Event, EventDocument } from 'src/event/schemas/event.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel
      .find({ role: RoleTypes.Participant }, { password: 0 })
      .exec(); // bring only users that have role Participant
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // generate password from email
    const hashedPassword = await bcrypt.hash(createUserDto.email, 10);

    const newParticipant = {
      ...createUserDto,
      password: hashedPassword,
      role: RoleTypes.Participant,
    };
    const createdParticipant = await this.userModel.create(newParticipant);
    return createdParticipant;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedParticipant = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedParticipant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return updatedParticipant;
  }

  async remove(id: string): Promise<User> {
    try {
      const participantId = new Types.ObjectId(id);

      //check ifd exist
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }

      // remove participant from event usieng pull 
      await this.eventModel.updateMany(
        { participants: { $in: [participantId] } },
        {
          $pull: {
            participants: participantId,
          },
        },
      );

      // delete the user
      const deletedParticipant = await this.userModel
        .findByIdAndDelete(id)
        .exec();

      return deletedParticipant;
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
}