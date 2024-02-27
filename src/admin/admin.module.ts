import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from 'src/models/categories.schema';
import { UserSchema } from 'src/models/user.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { EmailOtpSchema } from 'src/models/emailOtp.schema';
import { MovieSchema } from 'src/models/movie.schema';
import { GenresSchema } from 'src/models/genres.schema';
import { TheatreSchema } from 'src/models/theatre.schema';
import { GenresMovieSchema } from 'src/models/genresMovie.schema';
import { TheatreMovieSchema } from 'src/models/theatreMovie.schema';
import { LanguageSchema } from 'src/models/language.schema';
import { LanguageMovieSchema } from 'src/models/languageMovie.schema';
import { ShowSchema } from 'src/models/show.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Categories', schema: CategoriesSchema },
      { name: 'EmailOtp', schema: EmailOtpSchema },
      { name: 'Movie', schema: MovieSchema },
      { name: 'Genres', schema: GenresSchema },
      { name: 'Theatre', schema: TheatreSchema },
      { name: 'GenresMovie', schema: GenresMovieSchema },
      { name: 'TheatreMovie', schema: TheatreMovieSchema },
      { name: 'Language', schema: LanguageSchema },
      { name: 'LanguageMovie', schema: LanguageMovieSchema },
      { name: 'Show', schema: ShowSchema },
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService, JwtService, JwtStrategy, EmailService],
  exports: [AuthService, JwtService, JwtStrategy, EmailService]
})
export class AdminModule { }
