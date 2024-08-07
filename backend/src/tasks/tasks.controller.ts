import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, BadRequestException, NotFoundException  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from '../projects/projects.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly projectsService: ProjectsService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() task: Task) {

        if (!task.title) {
            throw new BadRequestException('Title is required');
        }

        const project = await this.projectsService.findOne(task.projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return this.tasksService.create(task);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        return this.tasksService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: string, @Body() task: Task) {
        if (!task.title) {
            throw new BadRequestException('Title is required');
        }

        const project = await this.projectsService.findOne(task.projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return this.tasksService.update(id, task);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}
