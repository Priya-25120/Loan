# Loan Application Backend

Complete NestJS backend with MongoDB, JWT authentication, and role-based access control.

## Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Password Hashing**: bcrypt
- **Validation**: class-validator

## Features

- User registration and login
- JWT authentication with protected routes
- Role-based access control (Admin & User)
- Admin panel APIs for user/content management
- User profile management
- Contact message handling
- Website content management

## Folder Structure

```
src/
├── auth/              # Authentication module
│   ├── dto/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/             # User module
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── admin/             # Admin module
│   ├── dto/
│   ├── admin.controller.ts
│   ├── admin.module.ts
│   └── admin.service.ts
├── database/          # Database schemas
│   ├── schemas/
│   │   ├── user.schema.ts
│   │   ├── admin.schema.ts
│   │   ├── contact-message.schema.ts
│   │   └── website-data.schema.ts
│   └── database.module.ts
├── common/            # Shared utilities
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── enums/
│   │   └── role.enum.ts
│   └── guards/
│       ├── jwt.strategy.ts
│       └── roles.guard.ts
├── app.module.ts
└── main.ts
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/loan-app
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system, or use MongoDB Atlas for cloud hosting.

### 4. Run the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin/login` | Admin login |

### User Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

### Admin Routes (Protected + Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard stats |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:id` | Get user by ID |
| PUT | `/api/admin/users/:id/status` | Update user status |
| DELETE | `/api/admin/users/:id` | Delete user |
| POST | `/api/admin/create` | Create new admin |
| GET | `/api/admin/admins` | Get all admins |
| GET | `/api/admin/messages` | Get all contact messages |
| PUT | `/api/admin/messages/:id/status` | Update message status |
| POST | `/api/admin/website-data` | Create website data |
| GET | `/api/admin/website-data` | Get all website data |
| GET | `/api/admin/website-data/:key` | Get website data by key |
| PUT | `/api/admin/website-data/:key` | Update website data |
| DELETE | `/api/admin/website-data/:key` | Delete website data |

## Request/Response Examples

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schemas

### User Schema
- fullName (String, required)
- email (String, required, unique)
- password (String, required)
- phone (String)
- address, city, state, zipCode (String)
- role (String, default: 'user')
- isActive (Boolean, default: true)
- loanAmount, monthlyIncome (String)
- employmentStatus, bankName, accountType (String)
- status (String, default: 'new')
- timestamps

### Admin Schema
- username (String, required, unique)
- password (String, required)
- email (String, required)
- role (String, default: 'admin')
- isActive (Boolean, default: true)
- timestamps

### Contact Message Schema
- name (String, required)
- email (String, required)
- phone (String)
- message (String, required)
- status (String, default: 'unread')
- timestamps

### Website Data Schema
- key (String, required, unique)
- value (Object)
- section (String)
- timestamps

## Security Features

- JWT token authentication
- Password hashing with bcrypt (10 rounds)
- Role-based access control with guards
- Input validation with class-validator
- CORS configuration
- Protected routes using Passport JWT strategy
