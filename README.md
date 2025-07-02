# Smart Task Manager with AI Agent

An intelligent task management application that combines traditional task management with AI-powered assistance.

## 🚀 Features

- **AI-Powered Task Management**: Create tasks using natural language
- **Smart Prioritization**: AI suggests task importance based on deadlines and context
- **Intelligent Scheduling**: Conflict detection and optimal task scheduling
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Chat**: Conversational AI interface for task management

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + TypeScript + Prisma ORM
- **Database**: PostgreSQL
- **AI Integration**: OpenAI API
- **Deployment**: Docker + Docker Compose

## 📁 Project Structure

```
smart-task-manager/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema and migrations
│   ├── tests/               # Backend tests
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── docker-compose.yml       # Development environment
├── docker-compose.prod.yml  # Production environment
└── .github/workflows/       # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-task-manager
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Environment**
   ```bash
   docker-compose up -d
   ```

4. **Install Dependencies & Run**
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm install
   npm run dev
   ```

5. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:5432

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d
```

## 📖 API Documentation

API documentation is available at `/api/docs` when running the development server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 