import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Categories } from './categories.schema';
import { User } from './user.schema';

@Schema()
export class Movie {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    review: string;

    @Prop({ default: false })
    isDeleted: Boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Categories" })
    categories: Categories;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);


