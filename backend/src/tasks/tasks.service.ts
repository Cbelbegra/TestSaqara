import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async create(task: Task): Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save();
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, task: Task): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
