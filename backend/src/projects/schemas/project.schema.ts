import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Project {
    @ApiProperty({ description: 'The name of the project', example: 'Project Alpha' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'The description of the project', example: 'This is a sample project' })
    @Prop()
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
