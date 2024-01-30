import { IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
    @IsNotEmpty({ message: 'Please Enter Email' })
    @IsString()
    email: string;

    @IsString()
    roleName: string
}
