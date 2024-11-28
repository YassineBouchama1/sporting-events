import { IsArray, IsDateString, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusEvenet } from '../../common/types/event.enum';
import { User } from '../../user/schemas/user.schema';

export class ParticipantDto {
    @IsString()
    name: string;

    @IsString()
    email: string;
}


export class CreateEventWithParticipantsDto {
    @IsString()
    name: string;

    @IsEnum(StatusEvenet)
    @IsOptional()
    status?: StatusEvenet;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsArray()
    @IsString({ each: true })
    participantIds: string[];
}