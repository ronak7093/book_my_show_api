import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from "mongoose";

@Schema()
export class EmailOtp {
    @Prop()
    email: string

    @Prop({ required: true })
    otp: string;

    @Prop({ required: true })
    expiredIn: string;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const EmailOtpSchema = SchemaFactory.createForClass(EmailOtp);


