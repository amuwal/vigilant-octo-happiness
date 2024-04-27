# Node.js Express Application with MongoDB

This is a Node.js Express application with MongoDB. It includes user authentication and CRUD operations for user data.

## Setup

1. Install dependencies: `npm install`
2. Start the server: `npm run dev`

## API Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and return a JWT token.
- `GET /api/user`: Get the authenticated user's details.
- `PUT /api/user`: Update the authenticated user's details.

## Environment Variables

- `PORT`: The port you want to start the server on.
- `DB_URI`: The MongoDB URI.
- `JWT_SECRET_KEY`: The secret key for JWT token generation.
- `BCRYPT_SALT_ROUNDS`: The number of salt rounds for bcrypt password hashing.

## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: ODM for MongoDB.
- `jsonwebtoken`: Library to generate and verify JWT tokens.
- `bcrypt`: Library to hash and compare passwords.
- `express-validator`: Middleware for validating request data.

## Postman Collection

You can test the API endpoints with the provided Postman collection. Click [here](https://www.postman.com/docking-module-meteorologist-38104373/workspace/shared/collection/31892004-ab4daec6-eb78-4d1d-9884-c9975b889ec2?action=share&creator=31892004) to access the collection.
