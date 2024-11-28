import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleTypes, StatusUser } from '../common/types/user.enum';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

 const mockUser: User = {
   name: 'Test User',
   email: 'test@example.com',
   password: 'hashedPassword123',
   role: RoleTypes.Participant,
   status: StatusUser.OFFLINE,
 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users successfully', async () => {
      const mockUsers = [mockUser];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle errors in findAll ', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.findAll()).rejects.toThrow(BadRequestException);
    });
  });

 

  describe('findONe', () => {
    it('should return a single user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      expect(await controller.findOne('someId')).toBe(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('nonexistentId')).rejects.toThrow(
        BadRequestException,
      );
    });
  })

  describe("create user",()=>{
    it("create user successfully",async()=>{
   const createUserDto: CreateUserDto = {
     name: 'New User',
     email: 'new@example.com',
   };
        jest.spyOn(service, 'create').mockResolvedValue(mockUser);

        expect(await controller.create(createUserDto)).toBe(mockUser);
    })


        it('throw error while create user', async () => {
   const createUserDto: CreateUserDto = {
     name: 'New User',
     email: 'new@example.com',
   };


         jest
           .spyOn(service, 'create')
           .mockRejectedValue(new BadRequestException());

         await expect(controller.create(createUserDto)).rejects.toThrow(
           BadRequestException,
         );
        });
  })



  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockUser);

      expect(await controller.update('someId', updateUserDto)).toBe(mockUser);
    });

    it('should throw BadRequestException when service fails', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.update('someId', updateUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);

      expect(await controller.remove('someId')).toBe(mockUser);
    });

    it('should throw BadRequestException when service fails', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.remove('someId')).rejects.toThrow(
        BadRequestException,
      );
    });
  });


});
