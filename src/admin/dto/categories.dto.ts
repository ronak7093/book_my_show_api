import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesDto {
    @IsNotEmpty({ message: 'Please Enter categories' })
    @IsString()
    categoriesName: string;
}
