import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';
import { Theatre } from './theatre.schema';

@Schema()
export class TheatreMovie {

    @Prop({ default: false })
    isDeleted: Boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Theatre" })
    theatre: Theatre;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const TheatreMovieSchema = SchemaFactory.createForClass(TheatreMovie);