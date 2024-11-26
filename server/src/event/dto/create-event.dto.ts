import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEvenet } from '../../common/types/event.enum';

export class CreateEventDto {

    @IsString()
    name: string;

    @IsEnum(StatusEvenet)
    @IsOptional()
    status?: StatusEvenet;
}
