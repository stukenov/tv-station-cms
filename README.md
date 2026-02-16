# TV Station CMS

A modern Content Management System built for TV stations and media companies. Features a React-powered frontend with Inertia.js, comprehensive admin panel with Filament, and full support for managing news, projects, videos, and broadcasting schedules.

## Features

- **Content Management**
  - News articles with rich media support
  - Project/show management
  - Video library and archive
  - Broadcasting schedule management

- **Modern Tech Stack**
  - React with TypeScript for frontend
  - Inertia.js for seamless SPA experience
  - Tailwind CSS with Shadcn UI components
  - Laravel 12 backend with Filament admin panel

- **Admin Panel**
  - Powerful Filament-based admin interface
  - CRUD operations for all content types
  - User management
  - Role-based permissions

- **Performance**
  - Laravel Octane support for high performance
  - Server-side rendering (SSR) capabilities
  - Optimized asset bundling with Vite

## Tech Stack

- **Backend**: Laravel 12.x
- **Frontend**: React 18+ with TypeScript
- **Admin**: Filament 3.x
- **Bridge**: Inertia.js 2.0
- **Styling**: Tailwind CSS + Shadcn UI
- **Build**: Vite
- **Database**: SQLite (default), MySQL/PostgreSQL compatible
- **Runtime**: PHP 8.2+, Laravel Octane (optional)

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM or Yarn
- SQLite/MySQL/PostgreSQL

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stukenov/tv-station-cms.git
   cd tv-station-cms
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # For SQLite (default)
   touch database/database.sqlite

   # Or configure MySQL/PostgreSQL in .env
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Create admin user**
   ```bash
   php artisan make:filament-user
   ```

8. **Build assets**
   ```bash
   npm run build
   # Or for development with hot reload
   npm run dev
   ```

9. **Start the development server**
   ```bash
   # Standard server
   php artisan serve

   # Or with Octane for better performance
   php artisan octane:start
   ```

Visit:
- **Frontend**: `http://localhost:8000`
- **Admin Panel**: `http://localhost:8000/dash`

## Development

### Running in development mode

```bash
# Terminal 1: Start Laravel
php artisan serve

# Terminal 2: Start Vite dev server
npm run dev
```

### With Octane (recommended)

```bash
# Install Octane with RoadRunner
composer require laravel/octane
php artisan octane:install

# Start Octane server
php artisan octane:start
```

### Code quality

```bash
# PHP code formatting
./vendor/bin/pint

# TypeScript/React linting
npm run lint

# Run tests
php artisan test
```

## Project Structure

```
├── app/
│   ├── Filament/         # Admin panel resources
│   ├── Http/             # Controllers and middleware
│   └── Models/           # Eloquent models
├── resources/
│   ├── css/              # Stylesheets
│   └── js/
│       ├── components/   # React components
│       ├── pages/        # Inertia page components
│       ├── lib/          # Utilities
│       └── types/        # TypeScript definitions
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/         # Database seeders
└── routes/
    └── web.php          # Web routes
```

## Key Features

### Content Types

- **News**: Manage news articles with images, videos, and rich text
- **Projects**: TV shows and program series management
- **Videos**: Video library with metadata and organization
- **Schedule**: Broadcasting schedule with time slots

### Frontend Features

- Server-side rendering (SSR) support
- Progressive Web App (PWA) capabilities
- Responsive design for all devices
- SEO-friendly URLs and meta tags
- Social media integration

### Admin Features

- Intuitive Filament admin interface
- Bulk operations support
- Media library management
- User and role management
- Real-time preview

## Configuration

Key environment variables in `.env`:

```env
APP_NAME="TV Station CMS"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite

# Octane (optional)
OCTANE_SERVER=roadrunner
```

## Production Deployment

1. **Optimize application**
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

2. **Build frontend assets**
   ```bash
   npm run build
   # For SSR
   npm run build:ssr
   ```

3. **Set up Octane (recommended)**
   ```bash
   php artisan octane:start --server=roadrunner --host=0.0.0.0 --port=8000
   ```

4. **Configure web server** (Nginx/Apache) as reverse proxy to Octane

## Security

- Keep `.env` file secure and never commit it
- Regularly update dependencies
- Use strong passwords for admin accounts
- Enable HTTPS in production
- Configure CORS properly for API access
- Set proper file permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Author

Copyright (c) 2025 Saken Tukenov

## Support

For support, please open an issue on the GitHub repository.
