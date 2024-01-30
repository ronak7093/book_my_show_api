import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from 'src/enum/gender.enum';
import mongoose from "mongoose";
import { EmailOtp } from './emailOtp.schema';
import { Role } from './role.schema';

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: number;

    @Prop()
    birthDate: Date;

    @Prop({
        type: String,
        enum: Gender,
        default: Gender.UNMARRIED
    })
    gender: Gender;

    @Prop()
    addressLine1: string;

    @Prop()
    addressLine2: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    area: string

    @Prop()
    google_id: String;

    @Prop({ default: false })
    isGoogleVerified: boolean;

    @Prop({ default: false })
    isPhoneNumberVerified: boolean;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "EmailOtp" })
    emailOtp: EmailOtp;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
    role: Role;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);



