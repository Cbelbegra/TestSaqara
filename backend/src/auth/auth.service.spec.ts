import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

const mockUser = { username: 'testuser', userId: '12345', password: 'hashedpassword' };

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(mockUser),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('signed-jwt-token'),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user data without password if validation is successful', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            const result = await authService.validateUser('testuser', 'password');
            expect(result).toEqual({ username: 'testuser', userId: '12345' });
        });

        it('should return null if validation fails', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            const result = await authService.validateUser('testuser', 'wrongpassword');
            expect(result).toBeNull();
        });

        it('should return null if user is not found', async () => {
            jest.spyOn(usersService, 'findOne').mockResolvedValue(undefined);
            const result = await authService.validateUser('nonexistentuser', 'password');
            expect(result).toBeNull();
        });

        it('should handle errors during bcrypt comparison', async () => {
            (usersService.findOne as jest.Mock).mockResolvedValue({ username: 'testuser', password: 'hashedpassword' });
            (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Random error'));
            
            await expect(authService.validateUser('testuser', 'password')).rejects.toThrow('Random error');
          });
    });
});
