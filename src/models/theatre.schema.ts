import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { User } from './user.schema';

@Schema()
export class Theatre {
    @Prop()
    theatreName: string

    @Prop()
    area: string

    @Prop()
    city: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const TheatreSchema = SchemaFactory.createForClass(Theatre);