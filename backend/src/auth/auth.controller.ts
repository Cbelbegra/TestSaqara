import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: { username: string, password: string }) {
        try {
            return await this.authService.login(loginDto.username, loginDto.password);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Invalid credentials');
            }
            throw error;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('validate-token')
    async validateToken(@Req() req: Request) {
        return { valid: true };
    }
}
