import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';
import { User } from './user.schema';

@Schema()
export class Genres {
    @Prop()
    genresTitle: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const GenresSchema = SchemaFactory.createForClass(Genres);