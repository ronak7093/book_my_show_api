import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { UserMetaSchema } from 'src/models/userMeta.schema';
import { EmailOtpSchema } from 'src/models/emailOtp.schema';
import { EmailService } from 'src/email/email.service';
import { MovieSchema } from 'src/models/movie.schema';
import { LanguageSchema } from 'src/models/language.schema';
import { CountrySchema } from 'src/models/country.schema';
import { CategoriesSchema } from 'src/models/categories.schema';
import { CastSchema } from 'src/models/cast.schema';
import { CrewSchema } from 'src/models/crew.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserMeta', schema: UserMetaSchema },
      { name: 'EmailOtp', schema: EmailOtpSchema },
      { name: 'Movie', schema: MovieSchema },
      { name: 'Language', schema: LanguageSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'Categories', schema: CategoriesSchema },
      { name: 'Cast', schema: CastSchema },
      { name: 'Crew', schema: CrewSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtService]
})
export class AuthModule { }
