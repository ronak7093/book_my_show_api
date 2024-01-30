import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from 'src/models/categories.schema';
import { RoleSchema } from 'src/models/role.schema';
import { UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Categories', schema: CategoriesSchema },
      { name: 'Role', schema: RoleSchema },
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
