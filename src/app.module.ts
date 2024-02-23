import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { AdminModule } from './admin/admin.module';
import { S3Module } from './s3/s3.module';
import { SlotModule } from './slot/slot.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, EmailModule, AdminModule, S3Module, SlotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
