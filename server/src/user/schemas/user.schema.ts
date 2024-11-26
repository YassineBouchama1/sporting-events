import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { RoleTypes, StatusUser } from '../../common/types/user.enum';


export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;



  @Prop({ enum: StatusUser, default: StatusUser.OFFLINE })
  status: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
 