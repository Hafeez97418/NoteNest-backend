# NoteNest Backend

NoteNest Backend is the server-side application for the NoteNest project, providing APIs for user authentication, note management, theme customization, and admin functionalities. Designed with scalability and security in mind, this backend works seamlessly with the frontend.

---

## Features

- **User Authentication**: Secure login, registration, and role-based access.
- **Notes Management**: APIs for creating, reading, updating, and deleting notes.
- **Themes**: Manage and customize themes for the application.
- **Admin Operations**: Dedicated endpoints for admin-related tasks.
- **Error Handling**: Comprehensive error handling for better debugging.
- **Scalable and Secure**: Built with scalability and security at its core.

---

## Tech Stack

- **Node.js** and **Express.js** for server-side logic.
- **TypeScript** for type safety and improved maintainability.
- **MongoDB** as the primary database.
- **Redis** for caching and session management.
- **JWT** for secure authentication.
- **bcrypt** for password hashing.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **MongoDB**
- **Redis**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/NoteNest-backend.git
   cd NoteNest-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory with the following keys:
   ```env
   DB_URI_DEV=<mongo db uri>
   REDIS_PASSWORD=<redis password>
   SERVER_EMAIL=<email for server>
   SERVER_EMAIL_PASS=<email password>
   MODE= <"production" || "development">
   PORT= <port for serving the project>
   ```
4. create an rsa 256 key for JWT authentication. To create an RSA-256 key pair for your project, follow these steps:
   1. Open a terminal in your project's root directory.
   2. Run the following command to generate a private key:
     ```bash
      openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
     ```
   3. Generate the public key from the private key:
     ```bash
       openssl rsa -pubout -in private.key -out public.key
     ```
   4. Ensure both `private.key` and `public.key` are stored securely in the    root folder of your project.
5. Add these files to `.gitignore` to prevent them from being committed to your repository.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

---

## API Overview

### Users
- `GET /api/v1/user` - Fetch all users.
- `POST /api/v1/user/register` - Register a new user.
- `POST /api/v1/user/login` - User login.
- `POST /api/v1/user/logout` - User logout.
- `PUT /api/v1/user` - Update user details.

### Notes
- `GET /api/v1/notes` - Fetch all notes.
- `POST /api/v1/notes` - Create a new note.
- `PUT /api/v1/notes/:id` - Update a note.
- `DELETE /api/v1/notes/:id` - Delete a note.

### Admin
- `GET /api/v1/admin` - Get all admins.
- `POST /api/v1/admin/:id` - Create an admin.

### Themes
- `GET /api/v1/theme` - Fetch all themes.
- `POST /api/v1/theme` - Create a new theme.
- `DELETE /api/v1/theme/:id` - Delete a theme.

---

## Folder Structure

project-root/
├── src/                # Source code directory
│   ├── controllers/    # API controllers
|   |-- middleware/     # Middleware for the routes
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
|   |-- types.ts        # Common types used in project
│   └── index.ts        # Entry point of the application
|   
├── public.key          # Public RSA key for authentication
├── private.key         # Private RSA key for authentication
├── .env                # Environment variables (ignored by Git)
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any inquiries, please reach out at `hafeez97418@gmail.com`. 
