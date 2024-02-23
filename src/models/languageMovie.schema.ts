import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';
import { Language } from './language.schema';

@Schema()
export class LanguageMovie {
    @Prop({ default: false })
    isDeleted: Boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Language" })
    language: Language;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const LanguageMovieSchema = SchemaFactory.createForClass(LanguageMovie);