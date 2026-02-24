# Todo Application
<img width="1120" height="634" alt="544782143-9a249c04-06dd-4bb1-9dfa-711395532ebb" src="https://github.com/user-attachments/assets/ca97e78f-87c8-450a-9a59-64d95f408895" />

A full-stack todo application demonstrating modern web development practices with user authentication, task management, and responsive UI.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Security Considerations](#security-considerations)

## Overview

This is a full-stack web application that provides users with a platform to create, manage, and organize their tasks. The application implements user authentication, role-based access control, and a clean separation of concerns between client and server layers.

The project consists of two main components:

- **Client**: React-based frontend with Vite bundler and modern UI patterns
- **Server**: ASP.NET Core Web API with Entity Framework Core database integration

## Technology Stack

### Frontend

- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Next-generation frontend build tool for fast development and optimized production builds
- **Context API**: State management for authentication and theme configuration
- **React Router**: Client-side routing and navigation
- **ESLint**: Code quality and consistency enforcement

### Backend

- **ASP.NET Core**: Modern .NET framework for building scalable APIs
- **Entity Framework Core**: Object-relational mapping for database operations
- **PostgreSQL**: Open-source relational database for persistent data storage
- **JWT Authentication**: Secure token-based authentication mechanism
- **AutoMapper**: Object-to-object mapping for DTOs

### Development Tools

- **Git**: Version control and collaboration
- **npm**: Package manager for frontend dependencies
- **dotnet CLI**: Command-line interface for .NET development

## Project Structure

```
todo-app/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── FooterComponent.jsx  # Footer layout component
│   │   │   ├── NavbarComponent.jsx  # Navigation bar component
│   │   │   ├── TodoForm.jsx         # Todo creation form
│   │   │   └── TodoItem.jsx         # Individual todo item display
│   │   ├── context/                 # React Context implementations
│   │   │   ├── AuthContext.jsx      # Authentication state management
│   │   │   └── ThemeContext.jsx     # Theme state management
│   │   ├── pages/                   # Page components for routing
│   │   │   ├── LoginPage.jsx        # User login page
│   │   │   ├── RegisterPage.jsx     # User registration page
│   │   │   └── TodoPage.jsx         # Main todo management page
│   │   ├── services/                # API communication layer
│   │   │   └── api.js               # Centralized API client
│   │   ├── App.jsx                  # Root application component
│   │   ├── main.jsx                 # React application entry point
│   │   └── styles/                  # Global and component styles
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite build configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── package.json                 # Frontend dependencies and scripts
│
├── server/                          # ASP.NET Core Web API
│   ├── Todo.Api/
│   │   ├── Controllers/             # API endpoint handlers
│   │   │   ├── AuthController.cs    # Authentication endpoints
│   │   │   └── TodoController.cs    # Todo CRUD endpoints
│   │   ├── Models/                  # Database entity models
│   │   │   ├── TodoTask.cs          # Todo item data model
│   │   │   └── User.cs              # User data model
│   │   ├── Dtos/                    # Data transfer objects
│   │   │   ├── LoginRequestDto.cs   # Login request structure
│   │   │   ├── LoginResultDto.cs    # Login response structure
│   │   │   ├── RegisterRequestDto.cs# Registration request structure
│   │   │   ├── TodoItemResponseDto.cs# Todo response structure
│   │   │   └── ...                  # Additional DTOs
│   │   ├── Services/                # Business logic layer
│   │   │   ├── ITokenService.cs     # JWT token service interface
│   │   │   ├── TokenService.cs      # JWT token implementation
│   │   │   ├── IPasswordHasher.cs   # Password hashing interface
│   │   │   └── PasswordHasher.cs    # Password hashing implementation
│   │   ├── Data/                    # Data access layer
│   │   │   └── ApplicationDbContext.cs# EF Core database context
│   │   ├── Migrations/              # Database migration files
│   │   ├── Program.cs               # Application startup configuration
│   │   ├── appsettings.json         # Production configuration
│   │   └── appsettings.Development.json# Development configuration
│   └── Todo.slnx                    # Solution file
│
└── README.md                        # This file
```

## Prerequisites

Before setting up the application, ensure you have the following installed:

### For Frontend Development

- **Node.js** (v18.0.0 or higher) - JavaScript runtime
- **npm** (v9.0.0 or higher) - Package manager

### For Backend Development

- **.NET SDK** (v10.0 or higher) - .NET development tools
- **PostgreSQL** (12 or higher) - Database engine

### Verification

```bash
# Check Node.js and npm
node --version
npm --version

# Check .NET SDK
dotnet --version
```

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### Frontend Setup

```bash
cd client
npm install
```

### Backend Setup

```bash
cd ../server
dotnet restore
```

## Configuration

### Database Configuration

The application uses PostgreSQL for data persistence. Configure the connection string in the server configuration files:

**File**: `server/Todo.Api/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TodoDb;Username=postgres;Password=YOUR_PASSWORD;"
  }
}
```

**File**: `server/Todo.Api/appsettings.Development.json`

For development, use a local PostgreSQL instance.

### JWT Configuration

Configure JWT settings in `appsettings.json`:

```json
{
  "Jwt": {
    "Secret": "your-secret-key-min-32-characters",
    "Issuer": "YourApp",
    "Audience": "YourAppUsers",
    "ExpiryMinutes": 60
  }
}
```

### Frontend API Configuration

Update the API base URL in `client/src/services/api.js`:

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://localhost:5001/api";
```

### CORS Configuration

Since the frontend and backend run on different ports during development, Cross-Origin Resource Sharing (CORS) must be configured.

**Backend CORS Setup** in `server/Todo.Api/Program.cs`:

```csharp
// Development environment
if (app.Environment.IsDevelopment())
{
    app.UseCors(builder =>
        builder.WithOrigins("http://localhost:5173", "http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());
}

// Production environment
else
{
    app.UseCors(builder =>
        builder.WithOrigins("https://yourdomain.com")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());
}
```

**Configuration Details**:

- **Development**: Allow requests from React dev server (port 5173)
- **Production**: Restrict to your production domain only
- **AllowCredentials**: Required for sending cookies/auth headers
- **AllowAnyMethod**: Accept GET, POST, PUT, DELETE, etc.
- **AllowAnyHeader**: Accept custom headers (including Authorization)

**Frontend Side**: Ensure credentials are included in API requests:

```javascript
const response = await fetch(API_BASE_URL + "/endpoint", {
  method: "GET",
  credentials: "include",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Running the Application

### Start the Backend Server

```bash
cd server/Todo.Api
dotnet run
```

The API will be available at `https://localhost:5001`

### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

**Frontend**:

```bash
cd client
npm run build
```

**Backend**:

```bash
cd server/Todo.Api
dotnet publish -c Release -o ./publish
```

## Architecture

### Frontend Architecture

The frontend follows a component-based architecture with clear separation of concerns:

- **Pages**: Container components that represent distinct routes
- **Components**: Reusable presentational components with focused responsibilities
- **Context**: Global state management for authentication and theming
- **Services**: Abstraction layer for API communication
- **Assets**: Static resources and utilities

### Backend Architecture

The backend follows a layered architecture pattern:

- **Controllers**: HTTP request handlers that expose API endpoints
- **Services**: Business logic implementation and data processing
- **Models**: Entity definitions representing database schema
- **DTOs**: Data transfer objects for request/response serialization
- **Data Access**: Entity Framework Core abstractions for database operations
- **Migrations**: Version control for database schema changes

### Authentication Flow

1. User submits credentials (email/password) via login form
2. Backend validates credentials and generates JWT token
3. Frontend stores token in local storage or session
4. Subsequent requests include token in Authorization header
5. Backend validates token for protected endpoints
6. Protected route components check authentication context before rendering

## Key Features

### User Authentication

- User registration with email and password
- Secure password hashing using industry-standard algorithms
- JWT-based session management
- Protected routes requiring authentication
- Logout functionality with token invalidation

### Todo Management

- Create new todo items with title and description
- Read/retrieve all user's todos
- Update todo status and details
- Delete completed or unwanted todos
- Real-time UI updates

### Responsive UI

- Mobile-first responsive design
- Consistent styling with CSS modules
- Theme switching capability
- Accessible navigation and forms
- Error handling and user feedback

### Data Persistence

- Relational database design for efficient queries
- Database migrations for schema versioning
- Referential integrity between users and todos
- Indexed queries for optimal performance

## API Documentation

### Authentication Endpoints

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user-id",
      "email": "user@example.com"
    }
  }
}
```

### Todo Endpoints

#### Get All Todos

```
GET /api/todo
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "todo-id",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "isCompleted": false,
      "createdAt": "2026-02-03T00:00:00Z"
    }
  ]
}
```

#### Create Todo

```
POST /api/todo
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "todo-id",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "isCompleted": false
  }
}
```

#### Update Todo

```
PUT /api/todo/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "isCompleted": true
}

Response: 200 OK
```

#### Delete Todo

```
DELETE /api/todo/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## Development Guide

### Code Style and Linting

**Frontend**:

```bash
cd client
npm run lint
```

**Backend**: Follow C# coding conventions and use StyleCop analyzers configured in the project.

### Adding New Features

1. **Database Changes**: Create a new migration

   ```bash
   cd server/Todo.Api
   dotnet ef migrations add MigrationName
   dotnet ef database update
   ```

2. **New Endpoint**:
   - Define DTO in `Dtos/` folder
   - Create controller method in `Controllers/`
   - Document in API section

3. **New React Component**:
   - Create component file in appropriate `components/` subdirectory
   - Use functional components with hooks
   - Export component from barrel file if applicable
   - Add TypeScript types/PropTypes as needed

### Testing

Implement unit tests for critical business logic:

**Backend**:

```bash
dotnet test
```

**Frontend**:

```bash
npm run test
```

## Security Considerations

### Password Security

- Passwords are hashed using PBKDF2 algorithm with salt
- Never store plaintext passwords
- Enforce minimum password complexity requirements
- Implement rate limiting on login attempts

### Authentication

- JWT tokens include expiration time
- Tokens are validated on each protected endpoint
- Use HTTPS for all communications in production
- Implement CORS policies to restrict cross-origin requests

### Data Protection

- Use parameterized queries to prevent SQL injection
- Validate all user inputs on both client and server
- Implement HTTPS/TLS for data in transit
- Sanitize error messages to prevent information disclosure

### Deployment Security

- Use environment variables for sensitive configuration
- Never commit secrets to version control
- Implement request rate limiting
- Enable logging for audit trails
- Use a Web Application Firewall (WAF) in production

## Troubleshooting

### Connection Issues

- Verify database server is running
- Check connection string in `appsettings.json`
- Ensure firewall allows database connections

### Migration Errors

```bash
# Revert to previous migration
dotnet ef migrations remove

# Recreate database
dotnet ef database drop -f
dotnet ef database update
```

### Frontend Build Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## License

This project is provided as-is for assessment purposes.

## Contact

For questions or issues regarding this project, please contact the project maintainer.
