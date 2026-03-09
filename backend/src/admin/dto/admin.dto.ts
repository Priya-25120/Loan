import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateWebsiteDataDto {
  @IsString()
  key: string;

  @IsOptional()
  value: any;

  @IsOptional()
  @IsString()
  section?: string;
}

export class UpdateWebsiteDataDto {
  @IsOptional()
  value?: any;

  @IsOptional()
  @IsString()
  section?: string;
}
