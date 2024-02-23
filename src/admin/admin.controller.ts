import { Body, Controller, HttpException, Post, UseGuards, Request, UseInterceptors, UploadedFile, Get, Query, Delete, Param, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesDto } from './dto/categories.dto';
import { AdminService } from './admin.service';
import { RoleGuard } from 'src/auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieDto } from './dto/movie.dto';
import { GenresDto } from './dto/genres.dto';
import { TheatreDto } from './dto/theatre.dto';
import { LanguageDto } from './dto/language.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

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

    //get Categories
    @Get('/categories/List')
    @UseGuards(JwtAuthGuard)
    async getCategories(@Request() req, @Query() query) {
        try {
            let response = await this.adminService.doGetCategories(req.user, query.limit, query.page)
            console.log(response, 'response');
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    // add genres
    @Post('/genres')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async doAddGenres(@Body() body: GenresDto, @Request() req) {
        try {
            console.log(req.user, 'req');
            let response = await this.adminService.doAddGenres(body, req.user)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    // get genres
    @Get('/genres/List')
    @UseGuards(JwtAuthGuard)
    async getGenres(@Request() req, @Query() query) {
        try {
            let response = await this.adminService.doGetGenres(req.user, query.limit, query.page)
            console.log(response, 'response');
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    //add theatre
    @Post('/theatre')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async doAddTheatre(@Body() body: TheatreDto, @Request() req) {
        try {
            let response = await this.adminService.doAddTheatre(body, req.user)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    // get theatre
    @Get('/theatre/List')
    @UseGuards(JwtAuthGuard)
    async getTheatre(@Request() req, @Query() query) {
        try {
            let response = await this.adminService.doGetTheatre(req.user, query.limit, query.page)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    //add language
    @Post('/add-language')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async doAddLanguage(@Body() body: LanguageDto, @Request() req) {
        try {
            let response = await this.adminService.doAddLanguage(body, req.user)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    // get language
    @Get('/language/List')
    @UseGuards(JwtAuthGuard)
    async getLanguage(@Request() req, @Query() query) {
        try {
            let response = await this.adminService.doGetLanguage(req.user, query.limit, query.page)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    //add movie 
    @Post('/add-movie')
    @UseGuards(JwtAuthGuard, RoleGuard)
    // @UseInterceptors(FileInterceptor("file"))
    async doAddMovie(@Body() body: MovieDto, @Request() req, file) {
        try {
            let response = await this.adminService.doAddMovie(body, req.user, file)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    //get movie 
    @Get('/movie-List')
    @UseGuards(JwtAuthGuard)
    async doGetMovie(@Request() req) {
        try {
            let response = await this.adminService.doGetMovie(req.user)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    @Get('/movie-List/:id')
    @UseGuards(JwtAuthGuard)
    async doGetMovieById(@Param() mId, @Request() req) {
        try {
            let response = await this.adminService.doGetMovieById(mId, req.user)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }


    // update Movie
    @Put('/movie/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    // @UseInterceptors(FileInterceptor("file"))
    async doUpdateMovie(@Body() body: UpdateMovieDto, @Request() req, @Param() movie, file) {
        try {
            let response = await this.adminService.doUpdateMovie(body, req.user, movie, file)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }

    //delete movie
    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async doDeleteMovie(@Request() req, @Param() movie) {
        try {
            let response = await this.adminService.doDeleteMovie(req.user, movie)
            return response
        } catch (error) {
            console.error(error, 'error')
            throw new HttpException(error, 400)
        }
    }
}
