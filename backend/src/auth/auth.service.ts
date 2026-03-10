import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../database/schemas/user.schema';
import { Admin, AdminDocument } from '../database/schemas/admin.schema';
import { ContactMessage, ContactMessageDocument } from '../database/schemas/contact-message.schema';
import { RegisterDto, LoginDto, ContactDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(ContactMessage.name) private contactMessageModel: Model<ContactMessageDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { 
      email, password, fullName, phone, address, city, state, zipCode,
      loanAmount, monthlyIncome, employmentStatus, bankName, accountType 
    } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all loan details
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      fullName,
      phone,
      address,
      city,
      state,
      zipCode,
      loanAmount,
      monthlyIncome,
      employmentStatus,
      bankName,
      accountType,
      role: 'user',
      status: 'new',
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = this.generateToken(savedUser);

    return {
      message: 'Loan application submitted successfully',
      user: this.sanitizeUser(savedUser),
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      message: 'Login successful',
      user: this.sanitizeUser(user),
      token,
    };
  }

  async adminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find admin
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: admin._id,
      email: admin.email,
      role: admin.role,
    });

    return {
      message: 'Admin login successful',
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      token,
    };
  }

  private generateToken(user: UserDocument) {
    return this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
  }

  private sanitizeUser(user: UserDocument) {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  async submitContact(contactDto: ContactDto) {
    const { name, email, phone, message } = contactDto;

    const newMessage = new this.contactMessageModel({
      name,
      email,
      phone,
      message,
      status: 'unread',
    });

    const savedMessage = await newMessage.save();

    return {
      message: 'Contact message submitted successfully',
      contactMessage: savedMessage,
    };
  }
}
