import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'The project has been successfully created.', type: Project })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({ type: Project })
    async create(@Body() project: Project) {
        return this.projectsService.create(project);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({ summary: 'Retrieve a list of projects' })
    @ApiResponse({ status: 200, description: 'A list of projects', type: [Project] })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll() {
        return this.projectsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific project by ID' })
    @ApiResponse({ status: 200, description: 'The project details', type: Project })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the project to retrieve' })
    async findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiOperation({ summary: 'Update a specific project by ID' })
    @ApiResponse({ status: 200, description: 'The project has been successfully updated.', type: Project })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the project to update' })
    @ApiBody({ type: Project })
    async update(@Param('id') id: string, @Body() project: Project) {
        return this.projectsService.update(id, project);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific project by ID' })
    @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the project to delete' })
    async delete(@Param('id') id: string) {
        return this.projectsService.delete(id);
    }
}
