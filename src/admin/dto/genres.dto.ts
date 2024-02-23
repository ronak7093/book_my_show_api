import { IsNotEmpty, IsString } from 'class-validator';

export class GenresDto {
    @IsNotEmpty({ message: 'Please Enter genrestitle' })
    @IsString()
    genresTitle: string
}