import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { ContactMessage, ContactMessageSchema } from './schemas/contact-message.schema';
import { WebsiteData, WebsiteDataSchema } from './schemas/website-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: ContactMessage.name, schema: ContactMessageSchema },
      { name: WebsiteData.name, schema: WebsiteDataSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
