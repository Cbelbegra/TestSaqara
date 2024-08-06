import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

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
