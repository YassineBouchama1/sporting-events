import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEvenet } from '../../common/types/event.enum';

export class CreateEventDto {

    @IsString()
    name: string;

    @IsEnum(StatusEvenet)
    @IsOptional()
    status?: StatusEvenet;


    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}


export class ParticipantDto {
    @IsString()
    name: string;

    @IsString()
    email: string;
}

