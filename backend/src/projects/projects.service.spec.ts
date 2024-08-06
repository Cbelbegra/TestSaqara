import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
    let service: ProjectsService;
    let model: any;

    const mockProject = { name: 'Test Project', description: 'Test Description' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                {
                    provide: getModelToken('Project'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockProject),
                        constructor: jest.fn().mockResolvedValue(mockProject),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ProjectsService>(ProjectsService);
        model = module.get(getModelToken('Project'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    //TODO: Fix create Project test
    /*
    it('should create a new project', async () => {
        model.save.mockResolvedValue(mockProject);
        const project = await service.create(mockProject);
        expect(project).toEqual(mockProject);
    });*/

    it('should return all projects', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValue([mockProject]),
        } as any);
        const projects = await service.findAll();
        expect(projects).toEqual([mockProject]);
    });

    it('should return a single project', async () => {
        jest.spyOn(model, 'findById').mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockProject),
        } as any);
        const project = await service.findOne('someId');
        expect(project).toEqual(mockProject);
    });

    it('should return null if project not found', async () => {
        jest.spyOn(model, 'findById').mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        } as any);
        const project = await service.findOne('someId');
        expect(project).toBeNull();
    });

    it('should update a project', async () => {
        const updatedProject = { ...mockProject, name: 'Updated Project' };
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
            exec: jest.fn().mockResolvedValue(updatedProject),
        } as any);
        const project = await service.update('someId', updatedProject);
        expect(project).toEqual(updatedProject);
    });

    it('should delete a project', async () => {
        jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockProject),
        } as any);
        const result = await service.delete('someId');
        expect(result).toEqual(mockProject);
    });
});
