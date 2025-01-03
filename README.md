# NoteNest-Backend

**NoteNest-Backend** is the server-side application for a notebook app, providing APIs for user authentication, note management, and other essential backend functionalities. It is designed to work seamlessly with the frontend to deliver a smooth and secure user experience.

---

## Features

- **User Authentication**: Secure user login, registration, and session management.
- **CRUD Operations for Notes**: Create, Read, Update, and Delete notes.
- **Secure Cookies**: Authentication handled via secure HTTP-only cookies.
- **Scalable Architecture**: Designed for scalability and maintainability.
- **Error Handling**: Comprehensive error handling for better debugging.

---

## Tech Stack

- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** as the database for storing user and note data.
- **Redis** for caching and handling OTPs or sessions.
- **JWT** for secure token-based authentication.
- **TypeScript** for type safety and better code maintainability.

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/NoteNest-backend.git
   cd NoteNest-backend
