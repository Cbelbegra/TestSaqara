import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

describe('TasksService', () => {
    let service: TasksService;
    let model: Model<Task>;
    const mockTask = { title: 'Test Task', description: 'Test Description' } as Task;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getModelToken('Task'),
                    useValue: {
                        new: jest.fn().mockImplementation((task) => ({
                            ...task,
                            save: jest.fn().mockResolvedValue(mockTask),
                        })),
                        create: jest.fn().mockResolvedValue(mockTask),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        model = module.get<Model<Task>>(getModelToken('Task'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    //TODO: Fix create task test
    /*it('should create a new task', async () => {
        const task = await service.create(mockTask);
        expect(task).toEqual(mockTask);
    });*/

    it('should return all tasks', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValue([mockTask]),
        } as any);
        const tasks = await service.findAll();
        expect(tasks).toEqual([mockTask]);
    });

    it('should return a single task', async () => {
        jest.spyOn(model, 'findById').mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockTask),
        } as any);
        const task = await service.findOne('someId');
        expect(task).toEqual(mockTask);
    });

    it('should update a task', async () => {
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockTask),
        } as any);
        const task = await service.update('someId', mockTask as Task);
        expect(task).toEqual(mockTask);
    });

    it('should delete a task', async () => {
        jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockTask),
        } as any);
        const result = await service.delete('someId');
        expect(result).toEqual(mockTask);
    });
});
