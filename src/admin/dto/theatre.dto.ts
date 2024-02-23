import { IsNotEmpty, IsString } from 'class-validator';

export class TheatreDto {
    @IsNotEmpty({ message: 'Please Enter theatreName' })
    @IsString()
    theatreName: string
}