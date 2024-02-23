import { Injectable } from '@nestjs/common';
import mongoose from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/user.schema';
import { MESSAGE_CONSTANT } from 'src/constant/message';
import { EmailOtp } from 'src/models/emailOtp.schema';
import { EmailService } from 'src/email/email.service';
import { EmailUserDto } from './dto/emailUser.dto';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from './dto/verifyotp.dto';
import { AdminDto } from './dto/admin.dto';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly emailService: EmailService,
        @InjectModel("User") private userModel: mongoose.Model<User>,
        @InjectModel("EmailOtp") private emailOtpModel: mongoose.Model<EmailOtp>,
    ) { }


    async findById(id): Promise<User> {
        let record = await this.userModel.findOne({ _id: id });
        return record;
    }

    // create user with email signup
    async createUserWithEmail(payload: EmailUserDto) {
        let otpCode = Math.floor(100000 + Math.random() * 900000);
        let expired = moment().add(10, 'minutes').format('YYYY-MM-DDThh:mm:ssZ')
        let exist = await this.userModel.findOne({
            email: payload.email
        })

        if (exist) {
            exist.email = payload.email,
                await this.userModel.findByIdAndUpdate(
                    {
                        _id: exist?._id
                    },
                    { $set: exist }
                )

            await this.emailService.sendMail(
                exist.email,
                otpCode + 'is your BOOKMYSHOW OTP',
                {
                    otpCode: otpCode,
                },
            )

            const newOtp = new this.emailOtpModel({
                email: exist.email,
                otp: otpCode,
                expiredIn: expired,
                user: exist.id
            })
            await newOtp.save()

            return {
                code: 200,
                message: MESSAGE_CONSTANT.USER_REGISTER_SUCCESSFULLY,
                status: 'success'
            }
        }

        if (!exist) {
            const newUser = new this.userModel({
                email: payload.email,
            });
            let data = await newUser.save();
            console.log(data, 'data');

            await this.emailService.sendMail(
                data.email,
                otpCode + 'is your BOOKMYSHOW OTP',
                {
                    otpCode: otpCode,
                },
            )

            const newOtp = new this.emailOtpModel({
                email: data.email,
                otp: otpCode,
                expiredIn: expired,
                user: data.id
            })
            await newOtp.save()

            return {
                code: 200,
                message: MESSAGE_CONSTANT.USER_REGISTER_SUCCESSFULLY,
                status: 'success'
            }
        }
    }

    // verify otp and login user token 
    async verifyOtpWithEmail(payload: VerifyOtpDto) {
        let expired = moment().format('YYYY-MM-DDThh:mm:ssZ')

        let otpRecord = await this.emailOtpModel.findOne({
            otp: payload.otp
        })
            .populate({ path: 'user' })

        if (otpRecord.expiredIn < expired) {
            return {
                code: 410,
                message: MESSAGE_CONSTANT.OTP_EXPIRED,
                status: 'success'
            }
        }

        otpRecord.user.isActive = true,
            //  @ts-ignore
            await this.userModel.updateOne({ _id: otpRecord.user._id }, otpRecord.user);
        //  @ts-ignore
        const token = { id: otpRecord.user._id, email: otpRecord.user.email, number: otpRecord.user.phoneNumber };
        // return {
        let access_token = await this.jwtService.sign(token, {
            secret: "qwertyUiopAskdvGfcxSHJ",
            expiresIn: "1w",
        })
        // };

        return {
            code: 200,
            data: access_token,
            message: MESSAGE_CONSTANT.USER_LOGIN_SUCCESSFULLY,
            status: 'success'
        }
    }

    async newAdmin(req: AdminDto) {
        const existingUser = await this.userModel.findOne({
            email: req.email,
            isAdmin: true
        });
        console.log(existingUser, 'existing');

        if (existingUser) {
            const token = { id: existingUser._id, email: existingUser.email, isAdmin: existingUser.isAdmin };
            // return {
            let access_token = await this.jwtService.sign(token, {
                secret: "qwertyUiopAskdvGfcxSHJ",
                expiresIn: "1w",
            })
            return {
                code: 200,
                data: access_token,
                message: MESSAGE_CONSTANT.ADMIN_LOGIN_SUCCESSFULLY,
                status: 'success'
            }
        }

        if (!existingUser) {
            const adminUser = await this.userModel.create({
                email: req.email,
                isAdmin: true
            })
            await adminUser.save()
            const token = { id: adminUser._id, email: adminUser.email, isAdmin: adminUser.isAdmin };
            // return {
            let access_token = await this.jwtService.sign(token, {
                secret: "qwertyUiopAskdvGfcxSHJ",
                expiresIn: "1w",
            })
            return {
                code: 200,
                data: access_token,
                message: MESSAGE_CONSTANT.ADMIN_CREATE_SUCCESSFULLY,
                status: 'success'
            }
        }
    }
}
