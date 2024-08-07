import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, BadRequestException, NotFoundException  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from '../projects/projects.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly projectsService: ProjectsService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
    @ApiResponse({ status: 400, description: 'Bad Request. Title is required.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({ type: Task })
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
    @ApiOperation({ summary: 'Retrieve a list of tasks' })
    @ApiResponse({ status: 200, description: 'A list of tasks', type: [Task] })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll() {
        return this.tasksService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific task by ID' })
    @ApiResponse({ status: 200, description: 'The task details', type: Task })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the task to retrieve' })
    async findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiOperation({ summary: 'Update a specific task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
    @ApiResponse({ status: 400, description: 'Bad Request. Title is required.' })
    @ApiResponse({ status: 404, description: 'Task or Project not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the task to update' })
    @ApiBody({ type: Task })
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
    @ApiOperation({ summary: 'Delete a specific task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the task to delete' })
    async delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}
