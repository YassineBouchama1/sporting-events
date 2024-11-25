import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEvenet } from 'src/common/types/event.enum';

export class CreateEventDto {

    @IsString()
    name: string;

    @IsEnum(StatusEvenet)
    @IsOptional()
    status?: StatusEvenet;
}
