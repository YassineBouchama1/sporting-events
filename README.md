# Sports Event Registration System

A full-stack application built with Next.js, NestJS, and TypeScript for managing sports event registrations. The system allows organizers to create and manage sporting events, handle participant registrations, and generate participant lists.

## 🚀 Features

### Organizer Features
- Event Management (CRUD operations)
- Participant Registration Management
- Participant List Generation and Printing
- Authentication and Authorization

## 🛠 Tech Stack

### Backend (NestJS)
- Node.js with NestJS framework
- MongoDB with Mongoose ODM
- JWT Authentication
- Unit Testing with Jest

### Frontend (Next.js)
- React 19 with Next.js 15
- TypeScript
- Redux Toolkit for state management
- TailwindCSS for styling
- React Query for data fetching
- React Hook Form for form management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker and Docker Compose
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Backend Setup:
```bash
cd backend
npm install
cp .env.example .env # Configure your environment variables
npm run start:dev
```

3. Frontend Setup:
```bash
cd frontend
npm install
cp .env.example .env.local 
npm run dev
```

## 🐳 Docker Deployment

1. Build and run containers:
```bash
docker-compose up --build
```

## 🔒 Environment Variables

### Backend (.env)
```
DATABASE_URL=mongodb://localhost:27017/yourdbhere
PORT=4000
JWT_SECRET=
JWT_EXPIRES_IN=24h

```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testing

### Backend Tests
```bash
npm test        # Run unit tests

```

## 📁 Project Structure

```
├── Server/
│   ├── src/*
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── tests/
│   │   └── common/
│   └── package.json
├── Client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/ #comtains common components
│   │   ├── hooks/
│   │   ├── Features/ #contains all Features
│   │   └── store/
│   └── package.json
└── docker-compose.yml
```

## 🔐 Security Features

- JWT Authentication
- Protected Routes
- Input Validation
- Error Handling Middleware
- CORS Configuration

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Yassine - [Contact Me](https://www.linkedin.com/in/yassinebouchama/)

## 🙏 Acknowledgments

- NestJS Documentation
- Next.js Documentation
- MongoDB Documentation