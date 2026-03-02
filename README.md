# SME Operations Backend

A robust Node.js + Express.js backend API for SME operations management with Prisma ORM, PostgreSQL, Redis caching, BullMQ job queues, JWT authentication, and RBAC middleware.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Job Queue**: BullMQ
- **Authentication**: JWT
- **Authorization**: RBAC (Role-Based Access Control)
- **Logging**: Winston

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+
- Redis 6+

## Installation

1. **Clone and navigate to project**
   ```bash
   cd sme-operations-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sme_operations_dev?schema=public"
   REDIS_URL="redis://localhost:6379"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   JWT_EXPIRES_IN="24h"
   NODE_ENV="development"
   PORT=3000
   ```

## Database Setup

1. **Create database migration**
   ```bash
   npm run prisma:migrate
   ```
   
   This will:
   - Create the database schema
   - Run migrations
   - Generate Prisma Client

2. **View database visually (optional)**
   ```bash
   npm run prisma:studio
   ```

## Development

1. **Start development server**
   ```bash
   npm run dev
   ```
   
   The server will run at `http://localhost:3000`

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.ts  # Prisma client
│   ├── redis.ts     # Redis client
│   └── queue.ts     # BullMQ queue setup
├── middleware/      # Express middleware
│   ├── auth.ts      # JWT authentication
│   ├── rbac.ts      # Role-based access control
│   └── errorHandler.ts # Error handling
├── routes/          # API routes
│   ├── auth.ts      # Authentication routes
│   └── health.ts    # Health check routes
├── services/        # Business logic
├── jobs/            # Background job processors
├── utils/           # Helper utilities
│   ├── jwt.ts       # JWT token utilities
│   └── logger.ts    # Winston logger
└── index.ts         # Application entry point

prisma/
└── schema.prisma    # Database schema
```

## API Endpoints

### Health & Status
- `GET /api/health` - Health check
- `GET /api/status` - Service status with database & Redis info

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (requires auth token)

### Protected Route Example
- `GET /api/protected` - Example protected route (requires auth token)

## Authentication

All protected routes require an `Authorization` header with a JWT token:

```
Authorization: Bearer <your_jwt_token>
```

Example:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." http://localhost:3000/api/auth/me
```

## Queue & Jobs

Background jobs are processed using BullMQ:

- **Notifications Queue**: For sending notifications
- **Audit Logs Queue**: For audit log operations

Jobs are automatically processed by registered workers.

## Middleware

### Authentication Middleware
Protects routes by verifying JWT tokens:
```typescript
router.get('/protected', authMiddleware, handler);
```

### RBAC Middleware
Enforces role-based access control:
```typescript
router.delete('/admin/users/:id', authMiddleware, requireRole('admin'), handler);
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | required |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 |
| `JWT_SECRET` | Secret key for JWT signing | required |
| `JWT_EXPIRES_IN` | JWT token expiration time | 24h |
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 3000 |

## Error Handling

The API returns standardized error responses:

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## Logging

Logs are managed by Winston:

- **Console**: Logs in development mode
- **Files**: 
  - `logs/error.log` - Error logs only
  - `logs/combined.log` - All logs

## Security Considerations

1. **JWT Secret**: Change `JWT_SECRET` in production
2. **Database**: Use strong credentials
3. **CORS**: Configure allowed origins
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Input Validation**: Always validate user input

## Database Migrations

Create a new migration after schema changes:
```bash
npm run prisma:migrate
```

View migration status:
```bash
npx prisma migrate status
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check `DATABASE_URL` is correct
- Verify database exists

### Redis Connection Error
- Ensure Redis is running
- Check `REDIS_URL` is correct
- Verify Redis port (default: 6379)

### Build/Compilation Error
```bash
rm -rf dist
npm run build
```

## Contributing

Follow these guidelines:
1. Use TypeScript for type safety
2. Follow existing code style
3. Add error handling for all async operations
4. Log important operations
5. Test database migrations

## License

ISC
