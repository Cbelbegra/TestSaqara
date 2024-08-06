import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

const mockUser = {
    username: 'testuser',
    password: 'testpassword',
    toObject: jest.fn().mockReturnValue({
        username: 'testuser',
        password: 'testpassword',
    }),
};

const mockUserModel = {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
    }),
    exec: jest.fn(),
    save: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersService', () => {
    let service: UsersService;
    let model: Model<UserDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        model = module.get<Model<UserDocument>>(getModelToken(User.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    //TODO: Fix create new user test
    /*it('should create a new user', async () => {
        const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpassword' };
        jest.spyOn(model, 'save' as any).mockResolvedValueOnce(mockUser as any);
        const result = await service.create(createUserDto);
        expect(result).toEqual(mockUser);
    });*/

    it('should return all users', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce([mockUser]),
        } as any);
        const result = await service.findAll();
        expect(result).toEqual([mockUser]);
    });

    it('should return one user by username', async () => {
        const result = await service.findOne('testuser');
        expect(result).toEqual(mockUser.toObject());
    });

    it('should return undefined if user not found', async () => {
        jest.spyOn(model, 'findOne').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
        const result = await service.findOne('unknownuser');
        expect(result).toBeUndefined();
    });
});
