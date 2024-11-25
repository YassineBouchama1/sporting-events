import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { Types } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
const eventId = new Types.ObjectId('507f1f77bcf86cd799439011');

describe('ParticipantController', () => {
  let controller: ParticipantController;
  let service: ParticipantService;

  const mockParticipantService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }]),
      ],
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockParticipantService,
        },
      ],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
    service = module.get<ParticipantService>(ParticipantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a participant', async () => {
      const createParticipantDto: CreateParticipantDto = {
        name: 'John Doe',
        email: 'john@example.com',
        eventId: eventId,
      };
      const result: Participant = {
        _id: new Types.ObjectId(),
        ...createParticipantDto,
      };
      mockParticipantService.create.mockResolvedValue(result);

      expect(await controller.create(createParticipantDto)).toEqual(result);
      expect(mockParticipantService.create).toHaveBeenCalledWith(createParticipantDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of participants', async () => {
      const result: Participant[] = [
        {
          _id: new Types.ObjectId(),
          name: 'John Doe',
          email: 'john@example.com',
          eventId: eventId,
        },
      ];
      mockParticipantService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(eventId?.toString())).toEqual(result);
      expect(mockParticipantService.findAll).toHaveBeenCalledWith(eventId);
    });
  });

  describe('findOne', () => {
    it('should return a single participant', async () => {
      const result: Participant = {
        _id: new Types.ObjectId(),
        name: 'John Doe',
        email: 'john@example.com',
        eventId: eventId,
      };
      mockParticipantService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockParticipantService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a participant', async () => {
      const updateParticipantDto: UpdateParticipantDto = { name: 'Jane Doe' };
      const result: Participant = {
        _id: new Types.ObjectId(),
        name: 'Jane Doe',
        email: 'john@example.com',
        eventId: eventId,
      };
      mockParticipantService.update.mockResolvedValue(result);

      expect(await controller.update('1', updateParticipantDto)).toEqual(result);
      expect(mockParticipantService.update).toHaveBeenCalledWith('1', updateParticipantDto);
    });
  });

  describe('remove', () => {
    it('should remove a participant', async () => {
      const result: Participant = {
        _id: new Types.ObjectId(),
        name: 'John Doe',
        email: 'john@example.com',
        eventId: eventId,
      };
      mockParticipantService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(mockParticipantService.remove).toHaveBeenCalledWith('1');
    });
  });
});