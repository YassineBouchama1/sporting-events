import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusEvenet } from '../../common/types/event.enum';
import { User } from 'src/user/schemas/user.schema';

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ParticipantDto)
    participants: User[];
}