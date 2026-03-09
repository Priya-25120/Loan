import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateAdminDto, CreateWebsiteDataDto, UpdateWebsiteDataDto } from './dto/admin.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Dashboard
  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // User Management
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id/status')
  async updateUserStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateUserStatus(id, status);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  // Admin Management
  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get('admins')
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  // Contact Messages
  @Get('messages')
  async getAllContactMessages() {
    return this.adminService.getAllContactMessages();
  }

  @Put('messages/:id/status')
  async updateMessageStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateMessageStatus(id, status);
  }

  // Website Data
  @Post('website-data')
  async createWebsiteData(@Body() createWebsiteDataDto: CreateWebsiteDataDto) {
    return this.adminService.createWebsiteData(createWebsiteDataDto);
  }

  @Get('website-data')
  async getAllWebsiteData() {
    return this.adminService.getAllWebsiteData();
  }

  @Get('website-data/:key')
  async getWebsiteDataByKey(@Param('key') key: string) {
    return this.adminService.getWebsiteDataByKey(key);
  }

  @Put('website-data/:key')
  async updateWebsiteData(@Param('key') key: string, @Body() updateWebsiteDataDto: UpdateWebsiteDataDto) {
    return this.adminService.updateWebsiteData(key, updateWebsiteDataDto);
  }

  @Delete('website-data/:key')
  async deleteWebsiteData(@Param('key') key: string) {
    return this.adminService.deleteWebsiteData(key);
  }
}
