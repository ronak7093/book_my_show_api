import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { Movie } from './movie.schema';
import { Theatre } from './theatre.schema';

@Schema()
export class Show {
    @Prop()
    startTime: Date;

    @Prop()
    endTime: Date;

    @Prop()
    date: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Theatre" })
    theatre: Theatre;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}
export const ShowSchema = SchemaFactory.createForClass(Show);