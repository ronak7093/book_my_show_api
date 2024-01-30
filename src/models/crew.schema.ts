import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';

@Schema()
export class Crew {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const CrewSchema = SchemaFactory.createForClass(Crew);


