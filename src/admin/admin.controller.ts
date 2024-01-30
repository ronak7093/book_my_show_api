import { Body, Controller, HttpException, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { CategoriesDto } from './dto/categories.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) { }

    // add categories 
    @Post('/add-categories')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async addCategories(@Body() body: CategoriesDto, @Request() req) {
        try {
            let response = await this.adminService.doAddCategories(body, req)
            return response
        } catch (error) {
            console.error(error, 'err')
            throw new HttpException(error, 400);
        }
    }
}
