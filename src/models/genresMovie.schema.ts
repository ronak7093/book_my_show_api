import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';
import { Genres } from './genres.schema';

@Schema()
export class GenresMovie {

    @Prop({ default: false })
    isDeleted: Boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Genres" })
    genres: Genres;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const GenresMovieSchema = SchemaFactory.createForClass(GenresMovie);