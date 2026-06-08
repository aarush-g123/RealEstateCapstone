# Real Estate Platform

A full-stack real estate web application that allows users to browse property listings, submit inquiries, and manage listings through role-based access controls.

## Features

- Property listing management
- User authentication and authorization
- Image uploads
- Property inquiry system
- Search and filtering
- Responsive design

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL/MySQL with Sequelize
- Authentication: OAuth
- Media Handling: Multer, Sharp

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the server directory and add:

```env
PORT=5000
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
SESSION_SECRET=your_secret_key
```

### 4. Start the Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

## Usage

1. Open the frontend in your browser.
2. Create an account or sign in.
3. Browse listings or submit property inquiries.
4. Admin users can manage listings and view inquiries.

## Contributors

- Aarush Goyal
- Advik
- Devednya
