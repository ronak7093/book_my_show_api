import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MovieDto {
    @IsNotEmpty({ message: 'Please Enter title' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Please Enter description' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Please Enter genres title' })
    @IsArray()
    genres: [];

    @IsNotEmpty({ message: 'Please Enter theatre' })
    @IsArray()
    theatre: [];

    @IsNotEmpty({ message: 'Please Enter Language' })
    @IsArray()
    language: any[];

    categories: string;
}