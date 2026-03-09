import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../src/database/schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const adminModel = app.get<Model<AdminDocument>>(getModelToken(Admin.name));
  
  // Check if admin already exists
  const existingAdmin = await adminModel.findOne({ email: 'admin@example.com' });
  
  if (existingAdmin) {
    console.log('Admin already exists:', existingAdmin.email);
    await app.close();
    return;
  }
  
  // Create admin with hashed password
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = new adminModel({
    username: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true,
  });
  
  await admin.save();
  console.log('Admin created successfully:');
  console.log('  Email: admin@example.com');
  console.log('  Password: admin123');
  
  await app.close();
}

bootstrap();
