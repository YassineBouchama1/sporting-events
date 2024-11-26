import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventWithParticipantsDto } from './dto/create-event-with-participants.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';

describe('EventController', () => {
    let eventController: EventController;
    let eventService: EventService;


    // this is work before run test for setup module
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [
                {
                    provide: EventService,
                    useValue: {
                        createWithParticipants: jest.fn(),
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        // create instant 
        eventController = module.get<EventController>(EventController);
        eventService = module.get<EventService>(EventService);
    });

    describe('createWithParticipants', () => {
        it('should create an event with participants', async () => {
            const dto: CreateEventWithParticipantsDto = {
                name: 'Test Event',
                participants: [{ name: 'John Doe', email: 'john@example.com' }],
            };

            const result = { _id: 'eventId', ...dto };
            jest.spyOn(eventService, 'createWithParticipants').mockResolvedValue(result as any);

            expect(await eventController.createWithParticipants(dto)).toEqual(result);
        });
    });

    describe('create', () => {
        it('should create a simple event', async () => {
            const dto: CreateEventDto = { name: 'Simple Event' };

            const result = { _id: 'eventId', ...dto };
            jest.spyOn(eventService, 'create').mockResolvedValue(result as any);

            expect(await eventController.create(dto)).toEqual(result);
        });
    });

    describe('findAll', () => {
        it('should return an array of events', async () => {
            const result = [{ _id: 'eventId', name: 'Event 1' }];
            jest.spyOn(eventService, 'findAll').mockResolvedValue(result as any);

            expect(await eventController.findAll()).toEqual(result);
        });
    });

    describe('findOne', () => {
        it('should return a single event', async () => {
            const result = { _id: 'eventId', name: 'Event 1' };
            jest.spyOn(eventService, 'findOne').mockResolvedValue(result as any);

            expect(await eventController.findOne('eventId')).toEqual(result);
        });

        it('should throw NotFoundException if event not found', async () => {
            jest.spyOn(eventService, 'findOne').mockRejectedValue(new NotFoundException('Event not found'));

            await expect(eventController.findOne('invalidId')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update an event', async () => {
            const dto: UpdateEventDto = { name: 'Updated Event' };
            const result = { _id: 'eventId', ...dto };
            jest.spyOn(eventService, 'update').mockResolvedValue(result as any);

            expect(await eventController.update('eventId', dto)).toEqual(result);
        });

        it('should throw NotFoundException if event not found', async () => {
            const dto: UpdateEventDto = { name: 'Updated Event' };
            jest.spyOn(eventService, 'update').mockRejectedValue(new NotFoundException('Event not found'));

            await expect(eventController.update('invalidId', dto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove an event', async () => {
            const result = { _id: 'eventId', name: 'Event 1' };
            jest.spyOn(eventService, 'remove').mockResolvedValue(result as any);

            expect(await eventController.remove('eventId')).toEqual(result);
        });

        it('should throw NotFoundException if event not found', async () => {
            jest.spyOn(eventService, 'remove').mockRejectedValue(new NotFoundException('Event not found'));

            await expect(eventController.remove('invalidId')).rejects.toThrow(NotFoundException);
        });
    });
});