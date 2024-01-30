import { IsNotEmpty, IsString } from 'class-validator';

export class EmailUserDto {
    @IsNotEmpty({ message: 'Please Enter Email' })
    @IsString()
    email: string;
}
