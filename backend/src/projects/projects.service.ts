import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) { }

    async create(project: Project): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async findOne(id: string): Promise<Project | null> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
            return null;
        }
        return project;
    }

    async update(id: string, project: Project): Promise<Project| null> {
        return this.projectModel.findByIdAndUpdate(id, project, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.projectModel.findByIdAndDelete(id).exec();
    }
}
