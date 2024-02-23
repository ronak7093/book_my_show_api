import { IsNotEmpty, IsString } from 'class-validator';

export class LanguageDto {
    @IsNotEmpty({ message: 'Please Enter language' })
    @IsString()
    languageName: string
}