import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusEvenet } from '../../common/types/event.enum';

class ParticipantDto {
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

@IsArray()
@ValidateNested({ each: true })
@Type(() => ParticipantDto)
participants: ParticipantDto[];
}