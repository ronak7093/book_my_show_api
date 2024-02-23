import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import mongoose from "mongoose";
import { MESSAGE_CONSTANT } from 'src/constant/message';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        @InjectModel("User") private userModel: mongoose.Model<User>,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();

        const userRoles = await this.userModel
            .findOne({
                isAdmin: true,
                _id: request.user,
            })

        if (!userRoles) {
            throw new UnauthorizedException({
                status: false,
                statusCode: 401,
                message: MESSAGE_CONSTANT.ONLY_ADMIN_CAN_ACCESS,
            });
        }
        return true;
    }
}
