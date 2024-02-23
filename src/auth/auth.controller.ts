import { Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailUserDto } from './dto/emailUser.dto';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { AdminDto } from './dto/admin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/email')
    async createUserWithEmail(@Body() req: EmailUserDto) {
        try {
            let response = await this.authService.createUserWithEmail(req)
            return response
        } catch (error) {
            console.error(error, 'err')
            throw new HttpException(error, 400);
        }
    }

    @Post('/verifyOtp')
    async verifyOtpWithEmail(@Body() req: VerifyOtpDto) {
        try {
            let response = await this.authService.verifyOtpWithEmail(req)
            return response
        } catch (error) {
            console.error(error, 'err')
            throw new HttpException(error, 400);
        }
    }

    @Post('/admin')
    async newAdmin(@Body() req: AdminDto) {
        try {
            let response = await this.authService.newAdmin(req)
            return response
        } catch (error) {
            console.error(error, 'err')
            throw new HttpException(error, 400);
        }
    }
}
