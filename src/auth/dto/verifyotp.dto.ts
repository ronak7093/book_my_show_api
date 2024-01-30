import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
    @IsNotEmpty({ message: 'Please Enter Otp' })
    @IsString()
    otp: string;
}
