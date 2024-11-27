import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { StatusEvenet } from '../../common/types/event.enum';
import { User } from 'src/user/schemas/user.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
    @Prop()
    name: string;

    @Prop({ default: 'https://avatar.iran.liara.run/public' })
    logo?: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop({ enum: StatusEvenet, default: StatusEvenet.PUBLIC })
    status: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    participants: Types.ObjectId[] | User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);