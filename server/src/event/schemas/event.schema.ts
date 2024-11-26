import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusEvenet } from '../../common/types/event.enum';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
    @Prop()
    name: string;

    @Prop({ enum: StatusEvenet, default: StatusEvenet.PUBLIC })
    status: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);