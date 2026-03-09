import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../database/schemas/user.schema';
import { Admin, AdminDocument } from '../database/schemas/admin.schema';
import { ContactMessage, ContactMessageDocument } from '../database/schemas/contact-message.schema';
import { WebsiteData, WebsiteDataDocument } from '../database/schemas/website-data.schema';
import { CreateAdminDto, CreateWebsiteDataDto, UpdateWebsiteDataDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(ContactMessage.name) private contactMessageModel: Model<ContactMessageDocument>,
    @InjectModel(WebsiteData.name) private websiteDataModel: Model<WebsiteDataDocument>,
  ) {}

  // User Management
  async getAllUsers() {
    return this.userModel.find().select('-password').sort({ createdAt: -1 }).exec();
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserStatus(userId: string, status: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true, select: '-password' },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User status updated successfully', user };
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  // Admin Management
  async createAdmin(createAdminDto: CreateAdminDto) {
    const { username, email, password } = createAdminDto;

    const existingAdmin = await this.adminModel.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new this.adminModel({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const savedAdmin = await newAdmin.save();
    return {
      message: 'Admin created successfully',
      admin: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        role: savedAdmin.role,
      },
    };
  }

  async getAllAdmins() {
    return this.adminModel.find().select('-password').exec();
  }

  // Contact Messages
  async getAllContactMessages() {
    return this.contactMessageModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateMessageStatus(messageId: string, status: string) {
    const message = await this.contactMessageModel.findByIdAndUpdate(
      messageId,
      { status },
      { new: true },
    );
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return { message: 'Message status updated', contactMessage: message };
  }

  // Website Data Management
  async createWebsiteData(createWebsiteDataDto: CreateWebsiteDataDto) {
    const { key, value, section } = createWebsiteDataDto;

    const existingData = await this.websiteDataModel.findOne({ key });
    if (existingData) {
      throw new ConflictException('Data with this key already exists');
    }

    const newData = new this.websiteDataModel({ key, value, section });
    const savedData = await newData.save();
    return { message: 'Website data created successfully', data: savedData };
  }

  async getAllWebsiteData() {
    return this.websiteDataModel.find().exec();
  }

  async getWebsiteDataByKey(key: string) {
    const data = await this.websiteDataModel.findOne({ key });
    if (!data) {
      throw new NotFoundException('Website data not found');
    }
    return data;
  }

  async updateWebsiteData(key: string, updateWebsiteDataDto: UpdateWebsiteDataDto) {
    const data = await this.websiteDataModel.findOneAndUpdate(
      { key },
      { $set: updateWebsiteDataDto },
      { new: true },
    );
    if (!data) {
      throw new NotFoundException('Website data not found');
    }
    return { message: 'Website data updated successfully', data };
  }

  async deleteWebsiteData(key: string) {
    const data = await this.websiteDataModel.findOneAndDelete({ key });
    if (!data) {
      throw new NotFoundException('Website data not found');
    }
    return { message: 'Website data deleted successfully' };
  }

  // Dashboard Stats
  async getDashboardStats() {
    const totalUsers = await this.userModel.countDocuments();
    const totalMessages = await this.contactMessageModel.countDocuments();
    const unreadMessages = await this.contactMessageModel.countDocuments({ status: 'unread' });
    const newUsers = await this.userModel.countDocuments({ status: 'new' });

    return {
      totalUsers,
      totalMessages,
      unreadMessages,
      newUsers,
    };
  }
}
