import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  loanAmount: string;

  @Prop()
  monthlyIncome: string;

  @Prop()
  employmentStatus: string;

  @Prop()
  bankName: string;

  @Prop()
  accountType: string;

  @Prop({ default: 'new' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
