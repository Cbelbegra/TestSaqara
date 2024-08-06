import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop()
    projectId: string;

    constructor(title: string, description: string, status: string, projectId: string) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.projectId = projectId;
    }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
