import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
    @ApiResponse({ status: 400, description: 'Bad Request. Username and password are required.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['username', 'password'],
        },
    })
    async createUser(@Body('username') username: string, @Body('password') password: string): Promise<any> {
        if (!username || !password) {
            throw new BadRequestException('Username and password are required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            password: hashedPassword,
        };
        return this.usersService.create(newUser);
    }
}
