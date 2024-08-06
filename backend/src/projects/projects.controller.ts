import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() project: Project) {
        return this.projectsService.create(project);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        return this.projectsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: string, @Body() project: Project) {
        return this.projectsService.update(id, project);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.projectsService.delete(id);
    }
}
