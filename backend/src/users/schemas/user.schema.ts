import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {

    @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
    @Prop({ required: true })
    username: string;

    @ApiProperty({ description: 'The password of the user', example: 'securepassword123' })
    @Prop({ required: true })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
