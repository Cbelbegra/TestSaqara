import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Task {

    @ApiProperty({ description: 'The title of the task', example: 'Implement authentication' })
    @Prop({ required: true })
    title: string;

    @ApiProperty({ description: 'The description of the task', example: 'Implement user authentication using JWT' })
    @Prop()
    description: string;

    @ApiProperty({ description: 'The status of the task', example: 'In Progress' })
    @Prop()
    status: string;

    @ApiProperty({ description: 'The ID of the project this task belongs to', example: '60d21b4667d0d8992e610c85' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true })
    projectId: string;

    constructor(title: string, description: string, status: string, projectId: string) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.projectId = projectId;
    }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
