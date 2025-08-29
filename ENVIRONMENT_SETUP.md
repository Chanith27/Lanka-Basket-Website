# Environment Configuration Guide

This project uses separate environment files to avoid duplicate keys and organize configuration properly.

## Environment Files Structure

```
Lanka-Basket-Website/
├── .env                    # Documentation and setup guide
├── .env.common            # Shared configuration
├── client/
│   ├── .env               # Client-specific variables (VITE_ prefixed)
│   └── .env.example       # Template for client environment
└── server/
    ├── .env               # Server-specific variables (secrets, database)
    └── .env.example       # Template for server environment
```

## Setup Instructions

### 1. Client Environment (`client/.env`)
Contains frontend-specific variables:
- `VITE_API_URL` - Backend API URL
- `VITE_STRIPE_PUBLIC_KEY` - Stripe public key for payments

### 2. Server Environment (`server/.env`)
Contains backend-specific variables:
- Database configuration (MongoDB)
- Authentication secrets
- Email service configuration (Brevo)
- Cloud storage configuration (Cloudinary)
- Payment processing secrets (Stripe)

### 3. Common Environment (`.env.common`)
Contains shared configuration:
- Application URLs
- Environment type
- App metadata

## Quick Setup

1. Copy the example files:
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

2. Update the values in each `.env` file with your actual configuration.

3. The `.env.common` file is optional and can be loaded by both applications for shared configuration.

## Security Notes

- Never commit actual API keys or secrets to version control
- Use different values for development, staging, and production environments
- The `.env` files are already added to `.gitignore`
- Example files (`.env.example`) should contain placeholder values only

## Development Workflow

- **Client developers**: Focus on `client/.env`
- **Server developers**: Focus on `server/.env`
- **DevOps/Full-stack**: Manage all environment files

This separation ensures:
- No duplicate environment variables
- Clear separation of concerns
- Better security (client never sees server secrets)
- Easier deployment and environment management
