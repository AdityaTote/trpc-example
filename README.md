# tRPC Turbo Package

## Overview
A monorepo containing a full-stack TypeScript application with tRPC for type-safe API communication, Prisma for database management, and separate server/client applications.

## Project Structure

```
turbo-package/
├── packages/
│   ├── trpc/          # tRPC server and client implementation
│   └── db/            # Prisma database configuration
└── apps/
    ├── server/        # tRPC server (Bun) - Port 3030
    └── webclient/     # Next.js client application
```

## Packages

### `packages/trpc`
Contains the tRPC router definitions, procedures, and client configuration for type-safe API communication between server and client.

### `packages/db`
Database layer using Prisma ORM with schema definitions, migrations, and database utilities.

## Applications

### `apps/server`
- **Runtime**: Bun
- **Port**: 3030
- **Purpose**: Serves the tRPC API endpoints

### `apps/webclient`
- **Framework**: Next.js
- **Purpose**: Frontend client consuming the tRPC API

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Set up database:
```bash
cd packages/db
bunx prisma generate
bunx prisma db push
```

3. Start development servers:
```bash
# Start tRPC server
cd apps/server
bun dev

# Start Next.js client (in another terminal)
cd apps/webclient
bun run dev
```

## Tech Stack

- **tRPC**: Type-safe API layer
- **Prisma**: Database ORM
- **Bun**: JavaScript runtime for server
- **Next.js**: React framework for client
- **TypeScript**: Type safety across the stack
- **Turborepo**: Monorepo management