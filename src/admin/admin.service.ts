import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { Categories } from 'src/models/categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { MESSAGE_CONSTANT } from 'src/constant/message';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel("Categories") private categoriesModel: mongoose.Model<Categories>,
    ) { }

    async doAddCategories(payload: CategoriesDto, loginPayload) {
        console.log(loginPayload, 'loginpayload');

        return

        let existsCategoriesData = await this.categoriesModel.findOne({
            categoriesName: payload.categoriesName
        }).populate('User')
        console.log(existsCategoriesData, 'categoriesData');

        if (existsCategoriesData) {
            return {
                code: 200,
                data: existsCategoriesData,
                message: MESSAGE_CONSTANT.CATEGORY_ALREADY_EXISTS,
                status: 'success'
            }
        }

        // let saveToCategoriesData = new this.categoriesModel({
        //     categoriesName: payload.categoriesName,
        //     user:
        // })

    }
}
