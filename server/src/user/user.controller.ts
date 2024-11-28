import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  findAll(

  ) {
    try {
      return this.userService.findAll()
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {

    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.remove(id);
    } catch (error) {

      throw new BadRequestException('Failed ', error.message);
    }
  }
}