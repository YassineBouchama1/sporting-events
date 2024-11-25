import { IsEmail, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateParticipantDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    eventId: Types.ObjectId;
}
