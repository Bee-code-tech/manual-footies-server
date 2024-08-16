

# Manual Footies Backend Documentation

## Overview
> **Live server url** 
 *`https://manual-footies-server.vercel.app/`*

The Manual Footies Backend is a robust and scalable system developed using Node.js, Express, MongoDB, and Mongoose. It is designed to handle core functionalities such as user authentication, product management, order processing, and more. This documentation provides a comprehensive guide to understanding, installing, and using the backend services of this application.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [API Documentation](#api-documentation)
8. [Security](#security)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact Information](#contact-information)

## Introduction

This backend system powers an e-commerce platform, providing essential APIs for managing users, shops, products, orders, and more. It is designed with scalability and security in mind, ensuring that the platform can handle high traffic and sensitive data.

## Features

### User Authentication and Authorization
- Secure user registration and login.
- Role-Based Access Control (RBAC) with JWT for different user roles (e.g., admin, customer).

### OTP Verification
- Email-based OTP verification during user registration using Nodemailer.

### Shop Management
- CRUD operations for shop creation and management.
- Each shop can manage its own products and billboard images.

### Product Management
- Comprehensive product management including categorization, pricing, and reviews.
- CRUD operations for managing products within shops.

### Order Management
- Full order lifecycle management including creation, updates, and cancellations.
- Secure transaction handling with detailed order processing.

### Security
- Implementation of JWT for secure authentication.
- Passwords are securely hashed using bcrypt.

### Additional Features
- Logging and error handling for better maintainability and debugging.
- Modular and scalable codebase to facilitate further development.

## Technology Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Minimal and flexible Node.js web application framework.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Nodemailer**: Node.js module for sending emails.

## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager) installed.
- MongoDB instance or MongoDB Atlas account.
- Text editor or IDE of your choice.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bee-code-tech/manual-footies-server.git
   cd manual-footies-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory and add the required environment variables (refer to the [Environment Variables](#environment-variables) section).

4. **Run the application:**
   ```bash
   npm run dev
   ```

   The server will start on the port defined in your `.env` file, and you can begin making API requests.

## Environment Variables

To configure the application, you need to set the following environment variables in a `.env` file:

- `NODE_ENV`: The environment mode (e.g., development, production).
- `PORT`: The port on which the server will run.
- `MONGO_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for JWT token generation.
- `GMAIL_USER`: Email address used for sending OTPs.
- `GMAIL_PASS`: Application password for the email account.

Example `.env` file:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

## Project Structure

The project follows a modular structure to keep the code organized and maintainable:

- **config/**: Configuration files, including environment settings.
- **controllers/**: Functions that handle requests and responses for different routes.
- **models/**: Mongoose models for MongoDB collections.
- **routes/**: Express route definitions, mapping URLs to controllers.
- **middleware/**: Custom middleware functions for request processing.
- **utils/**: Utility functions and helper methods.
- **server.js**: Entry point of the application.




## API Documentation
The backend provides RESTful APIs for interacting with the system. Below is a summary of the available endpoints:


### Authentication

| **Endpoint**                | **Method** | **Description**                             | **Request**                                                                                                           | **Response (Success)**                                                                                                 | **Response (Error)**                                                                                                   |
|-----------------------------|------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `/api/v1/auth/register`      | `POST`     | Registers a new user and sends an OTP.      | `{ "email": "user@example.com", "username": "john_doe", "password": "password123" }`                                   | `{ "msg": "OTP sent to your email" }`                                                                                  | `{ "msg": "User already exists" }`                                                                                     |
| `/api/v1/auth/verify`        | `POST`     | Verifies the OTP sent to the user's email.  | `{ "email": "user@example.com", "otp": "123456" }`                                                                     | `{ "msg": "Account verified successfully" }`                                                                           | `{ "msg": "Invalid or expired OTP" }`                                                                                  |
| `/api/v1/auth/login`         | `POST`     | Authenticates a user and returns a JWT.     | `{ "email": "user@example.com", "password": "password123" }`                                                           | `{ "token": "jwt-token" }`                                                                                             | `{ "msg": "Invalid credentials" }`                                                                                     |
| `/api/v1/auth/check-email`   | `POST`     | Checks if an email is registered.           | `{ "email": "user@example.com" }`                                                                                      | `{ "exists": true, "msg": "Email already exists" }`                                                                    | `{ "exists": false, "msg": "Email is available" }`                                                                     |

### Shop Management

| **Endpoint**                | **Method** | **Description**                             | **Request**                                                                                                           | **Response (Success)**                                                                                                 | **Response (Error)**                                                                                                   |
|-----------------------------|------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `/api/v1/shops`             | `POST`     | Creates a new shop (Admin only).            | `{ "name": "Shop Name", "description": "A brief description", "ownerId": "owner-id", "billboardImage": "url-to-image"}`| `{ "msg": "Shop created successfully", "shop": { "_id": "shop-id", "name": "Shop Name", ... } }`                       |                                                                                                                        |
| `/api/v1/shops`             | `GET`      | Retrieves a list of all shops.              |                                                                                                                       | `[ { "_id": "shop-id", "name": "Shop Name", "description": "A brief description", "ownerId": "owner-id", ... } ]`     |                                                                                                                        |
| `/api/v1/shops/:id`         | `PUT`      | Updates a shop's details (Admin only).      | `{ "name": "Updated Shop Name", "description": "Updated description", ... }`                                          | `{ "msg": "Shop updated successfully", "shop": { "_id": "shop-id", "name": "Updated Shop Name", ... } }`               |                                                                                                                        |
| `/api/v1/shops/:id`         | `DELETE`   | Deletes a shop (Admin only).                |                                                                                                                       | `{ "msg": "Shop deleted successfully" }`                                                                               |                                                                                                                        |

### Product Management

| **Endpoint**                | **Method** | **Description**                             | **Request**                                                                                                           | **Response (Success)**                                                                                                 | **Response (Error)**                                                                                                   |
|-----------------------------|------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `/api/v1/products`          | `POST`     | Adds a new product to a shop.               | `{ "shopId": "shop-id", "name": "Product Name", "price": 100, "description": "Product description", ... }`            | `{ "msg": "Product added successfully", "product": { "_id": "product-id", "name": "Product Name", ... } }`             |                                                                                                                        |
| `/api/v1/products/:id`      | `GET`      | Retrieves details of a specific product.    |                                                                                                                       | `{ "_id": "product-id", "name": "Product Name", "price": 100, "description": "Product description", ... }`            |                                                                                                                        |
| `/api/v1/products/:id`      | `PUT`      | Updates a product's details.                | `{ "name": "Updated Product Name", "price": 120, "description": "Updated description", ... }`                         | `{ "msg": "Product updated successfully", "product": { "_id": "product-id", "name": "Updated Product Name", ... } }`  |                                                                                                                        |
| `/api/v1/products/:id`      | `DELETE`   | Deletes a product from the shop.            |                                                                                                                       | `{ "msg": "Product deleted successfully" }`                                                                            |                                                                                                                        |

### Order Management

| **Endpoint**                | **Method** | **Description**                             | **Request**                                                                                                           | **Response (Success)**                                                                                                 | **Response (Error)**                                                                                                   |
|-----------------------------|------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `/api/v1/orders`            | `POST`     | Creates a new order.                        | `{ "userId": "user-id", "products": [{ "productId": "product-id", "quantity": 2 }], "totalPrice": 200 }`              | `{ "msg": "Order created successfully", "order": { "_id": "order-id", "userId": "user-id", ... } }`                    |                                                                                                                        |
| `/api/v1/orders`            | `GET`      | Retrieves all orders for a user.            |                                                                                                                       | `[ { "_id": "order-id", "userId": "user-id", "products": [{ "productId": "product-id", "quantity": 2 }], ... } ]`     |                                                                                                                        |
| `/api/v1/orders/:id`        | `PUT`      | Updates an order's status.                  | `{ "status": "Shipped" }`                                                                                            | `{ "msg": "Order status updated successfully", "order": { "_id": "order-id", "status": "Shipped", ... } }`            |                                                                                                                        |
| `/api/v1/orders/:id`        | `DELETE`   | Cancels an order.                           |                                                                                                                       | `{ "msg": "Order canceled successfully" }`                                                                             |                                                                                                                        |






## Security

- **JWT Authentication**: Ensures that all user sessions are secure and authenticated.
- **Password Hashing**: Passwords are hashed using bcrypt to ensure they are stored securely.
- **Input Validation**: All inputs are validated to prevent SQL Injection and XSS attacks.

## Contributing

We welcome contributions to enhance the functionality and performance of this project. To contribute, please follow these steps:

1. **Fork the repository** on GitHub.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make your changes** and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature
   ```
5. **Submit a pull request** to the main repository.

Please ensure your code follows the coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact Information

For any inquiries, suggestions, or feedback, please contact:

**Babawale Al-Ameen Olatunji**

- **Email**: [babawaleolatunji64@gmail.com](mailto:your-email@example.com)
- **GitHub**: [Bee-code-tech](https://github.com/your-github-profile)
- **LinkedIn**: [Babawale Al-Ameen](https://www.linkedin.com/in/al-ameen-babawale-89ba85209)

