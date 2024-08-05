import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
    username: string;

  @Prop({ required: true })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
      }
}

export const UserSchema = SchemaFactory.createForClass(User);
