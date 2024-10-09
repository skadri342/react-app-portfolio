# Shams Kadri's Portfolio Website

## Overview

This repository contains the source code for my personal portfolio website. It's a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, showcasing my projects, skills, and professional experience.

## Key Features

- **Dynamic Content Management**: The website is fully modular, allowing content updates directly through the user interface without frequent code changes.
- **Secure Authentication**: Implements a robust authentication system for accessing the personal backoffice.
- **Two-Factor Authentication (2FA)**: Enhanced security for the admin login process.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.
- **Project Showcase**: Highlights featured projects with detailed information and links.
- **Work Experience & Education**: Displays professional history and educational background.
- **Contact Form**: Allows visitors to send messages directly through the website.
- **Resume Download**: Provides easy access to the latest version of my resume.

## Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) with 2FA
- **Styling**: Custom CSS with responsive design principles
- **Deployment**: Render Free Tier

## Architecture

The application follows a client-server architecture:

- The frontend is a Single Page Application (SPA) built with React.
- The backend API is powered by Express.js, handling data management and authentication.
- MongoDB serves as the database, storing all dynamic content.

## Security Measures

- JWT-based authentication for secure admin access
- Two-Factor Authentication for an additional layer of security
- HTTPS encryption for all data transmission
- Secure storage of sensitive information using environment variables

## Modularity

The website's content is managed through a custom-built Content Management System (CMS), allowing for:

- Dynamic updates to project information
- Easy addition or modification of work experiences
- Real-time updates to skills and about me sections
- Seamless resume updates

## Future Development

For information on planned features and improvements, please refer to the [RELEASE_NOTES.md](./release-notes.md) file.

## Getting Started

These instructions will help you set up the project on your local machine for development purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your Linux machine:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB
- Git

### Installation Steps

1. **Clone the repository**

   Open your terminal and run:

   ```bash
   git clone https://github.com/skadri342/react-app-portfolio.git
   cd react-app-portfolio
   ```

2. **Set up the backend**

   Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory and add the following environment variables:

   ```
   MONGO_URI=your_mongodb_uri/your_database_name
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

   Replace `your_database_name` and `your_secret_key` with your preferred values.

3. **Set up the frontend**

   Navigate to the frontend (project root) directory and install dependencies:

   ```bash
   npm install
   ```

   Create a `.env` file in the frontend directory and add:

   ```
   VITE_API_URL=http://localhost:5173
   ```

4. **Start MongoDB**

   If MongoDB is not running as a service, start it in a new terminal:

   ```bash
   mongod
   ```

5. **Run the application**

   In the backend directory, start the server:

   ```bash
   npm start
   ```

   In a new terminal, navigate to the frontend (project root) directory and start the React application:

   ```bash
   npm run dev
   ```

6. **Access the application**

   Open your web browser and go to `http://localhost:5173` (or the port specified by Vite).

### Development

- The backend server will be running on `http://localhost:3000`.
- The frontend development server will be running on `http://localhost:5173`.
- Any changes you make to the frontend code will be automatically reflected in the browser.
- For backend changes, you may need to restart the server.

## Contributing

This is a personal project and is not open for external contributions. However, feedback and suggestions are always welcome!

## Contact

For any inquiries or feedback regarding this project, please contact me through the form on my website or via quadrishams342@gmail.com.
