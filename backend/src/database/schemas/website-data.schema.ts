import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteDataDocument = WebsiteData & Document;

@Schema({ timestamps: true })
export class WebsiteData {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ type: Object })
  value: any;

  @Prop()
  section: string;
}

export const WebsiteDataSchema = SchemaFactory.createForClass(WebsiteData);
