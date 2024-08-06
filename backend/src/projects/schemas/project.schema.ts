import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
    @Prop()
    name: string;

    @Prop()
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
