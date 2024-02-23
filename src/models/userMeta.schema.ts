import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";


@Schema()
export class UserMeta {
    @Prop()
    originalname: string;

    @Prop()
    mineType: string;

    @Prop()
    size: number;

    @Prop()
    bucket: string;

    @Prop()
    key: string;

    @Prop()
    location: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

}
export const UserMetaSchema = SchemaFactory.createForClass(UserMeta);


