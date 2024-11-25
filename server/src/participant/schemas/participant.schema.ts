import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ collection: 'Event', timestamps: true })
export class Participant {
  @Prop()
  _id: Types.ObjectId;
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);