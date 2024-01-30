import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from "mongoose";
import { Categories } from './categories.schema';

@Schema()
export class Movie {
    @Prop()
    title: string

    @Prop({ default: false })
    releasingDate: boolean

    @Prop()
    voteAvg: string

    @Prop()
    voteCount: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Categories" })
    categories: Categories;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);


