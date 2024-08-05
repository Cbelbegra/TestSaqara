import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task {
  title: string;
  description: string;
  projectId: string;

  constructor(title: string, description: string, projectId: string) {
    this.title = title;
    this.description = description;
    this.projectId = projectId;
  }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
