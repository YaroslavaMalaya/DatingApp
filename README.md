# Dating App YAMA

YAMA is a social platform where users can find matches, like/dislike profiles, and chat with potential partners.
This app is suitable for anyone who is looking for a partner, friends, friend with benefits, and just a good communication.

## Setup

To run the DatingApp on your local system, you will need to install several prerequisites and then set up the application. 
Follow the instructions below to get started:

### Prerequisites

Before installing the application, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) - The runtime environment for running JavaScript on the server.
- [MongoDB](https://www.mongodb.com/) - The NoSQL database used for storing application data.
- [Git](https://git-scm.com/) - Version control system for cloning the repository.

### Install Node.js Modules

After cloning the repository and navigating to the application directory, you will need to install the necessary Node.js modules. 
Run the following command to install all the dependencies listed in the `package.json` file:

1. Clone the YAMA repository:
   ```sh
   git clone https://github.com/YaroslavaMalaya/DatingApp.git
2. Navigate to the YAMA directory: `cd DatingApp`
3. Install the necessary Node.js packages: `npm instatll`
4. Run the app: `npm start`

## General description

The server should be running on [http://localhost:8888](http://localhost:8888)

### Structure

The application is organized as follows:

- `configs/`: Contains configuration files for database connections, server ports, and other settings.
- `controllers/`: Includes controller files that handle the logic for various routes.
- `models/`: Contains Mongoose schemas and models for the application's data structure (user and messages).
- `public/`: Contains static files like stylesheets, scripts, and images.
- `routes/`: Defines the HTTP endpoints for the application and associates them with controller logic.
- `views/`: Contains Pug templates for rendering the HTML served by the application.
- `index.js`: The entry point for the application.

### API Endpoints

The application provides several endpoints:

- `POST /register`: Registers a new user.
- `POST /login`: Authenticates a user.
- `POST /like`: Likes a user profile.
- `POST /dislike`: Dislikes a user profile.
- `GET /search`: Retrieves potential matches for the logged-in user.
- `GET /:username/chat/:targetUsername`: Opens a chat with a matched user.

### WebSocket

The application uses WebSocket for real-time bidirectional event-based communication. Here's how it's used:

- `connection`: Establishes a socket connection.
- `joinRoom`: Joins a specific chat room.
- `chatMessage`: Sends and receives chat messages.

### Database Schema

The database consists of the following main models:

- `User`: Stores user information, including preferences and authentication details.
- `Message`: Represents messages exchanged between users in the chat.

Refer to the `models/` directory for detailed schema definitions.

## Packages

The DatingApp YAMA utilizes various Node.js packages to function properly. 
Here is an overview of the major packages and their roles within the application:

- `bcryptjs`: Utilized for hashing and salting user passwords before storing them in the database, providing security against password theft.
- `busboy`: A streaming parser for HTML form data for Node.js, used for parsing form submissions with file uploads.
- `express`: The core web application framework that provides tools for routing, handling requests, and rendering views.
- `express-session`: A session management middleware that allows you to manage user sessions with various storage capabilities.
- `gridfs-stream`: A streaming file system for MongoDB using GridFS, allowing for storage and retrieval of large files such as images.
- `jsonwebtoken`: Implements JSON Web Tokens (JWT) for securely transmitting information between the server and clients as a JSON object.
- `mongoose`: An Object Data Modeling library for MongoDB and Node.js, providing a higher-level API for database interactions.
- `multer`: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `multer-gridfs-storage`: A GridFS storage engine for Multer to store uploaded files directly to MongoDB.
- `pug`: A template engine for Node.js, designed to facilitate the creation of HTML templates with a clean and readable syntax.
- `socket.io`: Enables real-time bidirectional event-based communication between web clients and servers, used for the chat feature in the application.


