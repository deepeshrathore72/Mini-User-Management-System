# User Management System

A full-stack web application for managing user accounts with role-based access control (RBAC), built with Node.js, Express, MongoDB, and React.

## Project Overview

This User Management System provides a complete solution for handling user authentication, authorization, and user lifecycle management. It features:

- **Authentication System**: JWT-based authentication with secure password hashing
- **Role-Based Access Control**: Separate interfaces for Admin and User roles
- **User Management**: Full CRUD operations for user profiles
- **Admin Dashboard**: Comprehensive user management interface with pagination
- **Responsive Design**: Mobile-friendly interface that works across all devices

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: CORS, environment variables

### Frontend
- **Library**: React 18 with Hooks
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Notifications**: react-toastify
- **Styling**: Custom CSS

### Testing
- **Framework**: Jest
- **API Testing**: Supertest

## Features

### Authentication
- ✅ User signup with email, password, and full name
- ✅ Email format validation
- ✅ Strong password requirements (min 8 chars, uppercase, lowercase, number, special char)
- ✅ User login with credentials verification
- ✅ JWT token generation and verification
- ✅ Protected routes with authentication middleware
- ✅ User logout functionality

### User Management (Admin)
- ✅ View all users with pagination (10 users per page)
- ✅ Activate user accounts
- ✅ Deactivate user accounts
- ✅ User status tracking (active/inactive)
- ✅ Confirmation dialogs for critical actions

### User Management (User)
- ✅ View own profile information
- ✅ Update full name and email
- ✅ Change password with current password verification
- ✅ Profile avatar with initials

### Security
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Protected API routes
- ✅ Role-based access control (RBAC)
- ✅ Input validation on all endpoints
- ✅ Consistent error response format
- ✅ Environment variables for sensitive data
- ✅ CORS configuration

### UI/UX
- ✅ Clean and modern interface
- ✅ Responsive design (desktop & mobile)
- ✅ Form validation with error messages
- ✅ Loading states and spinners
- ✅ Toast notifications (success/error)
- ✅ Modal dialogs for confirmations
- ✅ Intuitive navigation


## Setup Instructions

**Create Admin User**
   
   After starting the backend, you can create an admin user by signing up and manually updating the role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## 🌐 Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT signing | `your_random_secret_key_here` |
| `JWT_EXPIRE` | JWT token expiration time | `7d` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🧪 Testing

The project includes comprehensive unit tests for backend functionality.

### Running Tests
```bash
cd backend
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

### Test Cases
- JWT token generation and verification
- Password hashing and comparison
- Email validation
- Password strength validation
- User role validation
- User status validation

## 🔐 Security Features

1. **Password Security**
   - bcrypt hashing with 10 salt rounds
   - Strong password requirements enforced
   - Current password verification for password changes

2. **Authentication**
   - JWT-based stateless authentication
   - Token expiration (7 days default)
   - Secure token storage in localStorage

3. **Authorization**
   - Role-based access control (RBAC)
   - Protected routes
   - Admin-only endpoints

4. **Input Validation**
   - Server-side validation using express-validator
   - Client-side validation for better UX
   - XSS prevention through React

5. **API Security**
   - CORS configuration
   - Environment variables for sensitive data
   - Error handling middleware
   - Request logging

## User Guide

### For Regular Users

1. **Sign Up**
   - Navigate to signup page
   - Enter full name, email, and strong password
   - Confirm password
   - Click "Sign Up"

2. **Login**
   - Enter email and password
   - Click "Login"
   - Redirected to profile page

3. **View Profile**
   - See your profile information
   - View account details

4. **Update Profile**
   - Click "Profile Information" tab
   - Update full name or email
   - Click "Update Profile"

5. **Change Password**
   - Click "Change Password" tab
   - Enter current password
   - Enter new password and confirm
   - Click "Change Password"

### For Administrators

1. **Access Dashboard**
   - Login with admin credentials
   - Redirected to admin dashboard

2. **View Users**
   - See all users in the system
   - View user details (name, email, role, status)
   - Navigate through pages

3. **Manage Users**
   - Click "Activate" to activate inactive users
   - Click "Deactivate" to deactivate active users
   - Confirm action in modal dialog

## 🤝 Contributing

This is an assessment project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Author

Created as part of Purple Merit Technologies assessment.

---
