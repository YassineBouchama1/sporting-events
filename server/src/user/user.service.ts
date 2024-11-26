import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

async findAll(eventId: string): Promise<User[]> {
  return this.userModel.find({ eventId }).exec();
}

async findOne(id: string): Promise<User> {
  const user = await this.userModel.findById(id).exec();
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  const updatedParticipant = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  if (!updatedParticipant) {
    throw new NotFoundException(`Participant with ID ${id} not found`);
  }
  return updatedParticipant;
}

async remove(id: string): Promise<User> {
  const deletedParticipant = await this.userModel.findByIdAndDelete(id).exec();
  if (!deletedParticipant) {
    throw new NotFoundException(`Participant with ID ${id} not found`);
  }
  return deletedParticipant;
}
}