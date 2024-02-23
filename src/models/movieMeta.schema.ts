import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Movie } from "./movie.schema";

@Schema()
export class MovieMeta {
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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Movie" })
    movie: Movie;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}
export const MovieMetaSchema = SchemaFactory.createForClass(MovieMeta);