# Backend API

Node.js backend with Express following MVC architecture, featuring separate public and private API routes.

## Project Structure

```
Backend/
├── src/
│   ├── controllers/
│   │   ├── public/
│   │   │   ├── authController.js
│   │   │   └── contentController.js
│   │   └── private/
│   │       ├── dashboardController.js
│   │       └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Content.js
│   ├── routes/
│   │   ├── public/
│   │   │   ├── index.js
│   │   │   ├── auth.js
│   │   │   └── content.js
│   │   └── private/
│   │       ├── index.js
│   │       ├── dashboard.js
│   │       └── admin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
copy .env.example .env
```

3. Update the JWT_SECRET in `.env` with a secure random string

4. Start the server:
```bash
npm run dev
```

## API Structure

### Public Routes (`/api/public`)
- `POST /api/public/auth/register` - User registration
- `POST /api/public/auth/login` - User login
- `GET /api/public/content` - Get published content
- `GET /api/public/content/:id` - Get specific content

### Private Routes (`/api/private`)
Requires authentication token in header: `Authorization: Bearer <token>`

#### Dashboard Routes (`/api/private/dashboard`)
- `GET /api/private/dashboard/profile` - Get user profile
- `PUT /api/private/dashboard/profile` - Update user profile
- `GET /api/private/dashboard/stats` - Get user statistics

#### Admin Routes (`/api/private/admin`)
Requires admin role

**Content Management:**
- `GET /api/private/admin/content` - Get all content
- `POST /api/private/admin/content` - Create content
- `PUT /api/private/admin/content/:id` - Update content
- `DELETE /api/private/admin/content/:id` - Delete content

**User Management:**
- `GET /api/private/admin/users` - Get all users
- `PUT /api/private/admin/users/:id/role` - Update user role
- `DELETE /api/private/admin/users/:id` - Delete user

## Testing

Use the health check endpoint:
```
GET http://localhost:5000/health
```
