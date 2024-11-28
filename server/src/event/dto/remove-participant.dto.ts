import { IsNotEmpty, IsString } from "class-validator";

export class RemoveParticipantDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  participantId: string;
}
