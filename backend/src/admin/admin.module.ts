import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User, UserSchema } from '../database/schemas/user.schema';
import { Admin, AdminSchema } from '../database/schemas/admin.schema';
import { ContactMessage, ContactMessageSchema } from '../database/schemas/contact-message.schema';
import { WebsiteData, WebsiteDataSchema } from '../database/schemas/website-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: ContactMessage.name, schema: ContactMessageSchema },
      { name: WebsiteData.name, schema: WebsiteDataSchema },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
