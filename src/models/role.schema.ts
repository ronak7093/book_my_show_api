import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from "mongoose";

@Schema()
export class Role {
    @Prop()
    roleName: string

    @Prop({ default: false })
    isAdmin: boolean

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);


