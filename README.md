# Paradise Retreat

A modern hospitality management application built for restaurant and venue operations. Paradise Retreat provides comprehensive tools for managing rooms, tables, menus, and staff with a beautiful, intuitive interface.

## Features

-   **Room Management**: Organize and track physical spaces within your venue
-   **Table Management**: Handle seating arrangements and table assignments
-   **Menu System**: Manage food and beverage offerings with ease
-   **User & Role Management**: Staff management with role-based access control
-   **Dashboard Analytics**: Real-time insights and data visualization
-   **Document Workflow**: Streamlined review and approval processes
-   **Real-time Updates**: Live notifications and updates across the system

## Technology Stack

### Backend

-   **Laravel 11.31** with PHP 8.2+
-   **SQLite** (development) with MySQL/PostgreSQL support
-   **Laravel Sanctum** for authentication
-   **Laravel Reverb** for WebSocket connections
-   **Pest PHP** for testing

### Frontend

-   **React 18** with TypeScript
-   **Vite 6** for fast development and building
-   **Tailwind CSS** with custom design system
-   **Radix UI** primitives with shadcn/ui components
-   **Inertia.js** for SPA-like experience
-   **Recharts** for data visualization

## Quick Start

### Prerequisites

-   PHP 8.2+
-   Node.js 18+
-   Composer
-   Bun (recommended) or npm

### Installation

1. Clone the repository and install dependencies:

```bash
composer install
bun install
```

2. Set up your environment:

```bash
cp .env.example .env
php artisan key:generate
```

3. Set up the database:

```bash
php artisan migrate --seed
```

4. Start the development environment:

```bash
composer run dev
```

This will start all necessary services:

-   Laravel development server
-   Vite dev server with HMR
-   Queue worker
-   Log viewer

## Development Commands

### Individual Services

```bash
php artisan serve          # Laravel server (port 8000)
bun run dev               # Vite dev server
php artisan queue:listen  # Queue worker
php artisan pail          # Log viewer
```

### Building for Production

```bash
bun run build            # Build frontend assets
php artisan optimize     # Optimize Laravel
```

### Testing

```bash
php artisan test         # Run Pest tests
./vendor/bin/pest        # Direct Pest execution
```

### Database Management

```bash
php artisan migrate              # Run migrations
php artisan db:seed             # Seed database
php artisan migrate:fresh --seed # Fresh database with seeds
```

## Project Structure

### Backend (`app/`)

-   `Http/Controllers/` - Request handling (Auth, Menu, Room, Table controllers)
-   `Models/` - Eloquent models for database entities
-   `Http/Requests/` - Form request validation
-   `Http/Middleware/` - Custom middleware

### Frontend (`resources/js/`)

-   `Components/` - Reusable React components
-   `Components/ui/` - shadcn/ui component library
-   `Pages/` - Page components (Auth, Dashboard, Profile)
-   `Layouts/` - Application layout components
-   `types/` - TypeScript type definitions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
