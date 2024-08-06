import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    async create(@Body() project: Project) {
        return this.projectsService.create(project);
    }

    @Get()
    async findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() project: Project) {
        return this.projectsService.update(id, project);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.projectsService.delete(id);
    }
}
