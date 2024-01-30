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
import { Role } from 'src/models/role.schema';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        @InjectModel("User") private userModel: mongoose.Model<User>,
        @InjectModel("Role") private roleModel: mongoose.Model<Role>,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        console.log(request, 'request??????????????????');


        // let userRoles = await this.roleModel.aggregate([

        // ])

        const userRoles = await this.roleModel
            .findOne({
                isAdmin: true,
                user: request.user.userRecord.id,
            })
            .populate('User');
        console.log(userRoles, 'userRoles');

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
