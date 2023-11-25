# News-Feed-App
News Feed App is a web application for consuming and exploring news posts. It's built using Node.js, Express, and MongoDB.
## Getting Started

To get started with the E-Commerce backend, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Irenaeus-XVI/News-Feed-App.git
   ```
2. Install dependencies:
    ```sh
   cd News-Feed-App
   npm install
   ```
3. Set up environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables. You can use the provided .env.example as a template.   

4. Start the server:

```sh 
    npm start
```

The server will start and listen on a specified port (default: 3000). You can access the API using tools like Postman or integrate it with your frontend application.


### MongoDB connection URL
- `CONNECTIONURL`: MongoDB connection URL for local development.
- `CONNECTIONURLONLINE`: MongoDB connection URL for online deployment.

### Application Mode
- `MODE`: Application mode (dev, prod, etc.).

### Security
- `SALT_ROUNDS`: Number of salt rounds for bcrypt hashing.
- `SECRET_KEY_TOKEN`: Secret key for generating JWT tokens.

### Server Configuration
- `PORT`: Port on which the server will run.


### User Authentication

- **Register a new user:**
  - `POST /api/v1/user/signup`

- **Log in a user:**
  - `POST /api/v1/user/signin`

- **Verify user email:**
  - `GET /api/v1/user/verify/:token`

### News Feed

- **Get all posts:**
  - `GET /api/v1/posts`

- **Get a specific post:**
  - `GET /api/v1/posts/:postId`

- **Add a new post:**
  - `POST /api/v1/posts/add`

- **Update a post:**
  - `PUT /api/v1/posts/:postId`

- **Delete a post:**
  - `DELETE /api/v1/posts/:postId`

### User Profile

- **View user profile:**
  - `GET /api/v1/user/profile`

- **Update user profile:**
  - `PUT /api/v1/user/profile`


## Global Error Handling and Status Codes

The application employs global error handling to ensure consistent error responses. HTTP status codes are utilized to indicate the nature of errors:

- `404`: Resource not found.
- `400`: Bad request - when the request is malformed or invalid.
- `409`: Conflict - when there is a conflict with the current state of the server (e.g., attempting to create a resource that already exists).
- `500`: Server error.

This approach helps maintain a standardized response format and enhances the user experience by providing meaningful error messages and appropriate HTTP status codes.


- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)

- **Database:**
  - [Mongoose](https://mongoosejs.com/)

- **Authentication and Authorization:**
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- **Middleware:**
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [morgan](https://www.npmjs.com/package/morgan)

- **Validation:**
  - [Joi](https://www.npmjs.com/package/joi)

- **File Upload:**
  - [Multer](https://www.npmjs.com/package/multer)

- **Utility Libraries:**
  - [uuid](https://www.npmjs.com/package/uuid)
  - [slugify](https://www.npmjs.com/package/slugify)


## Contributing

Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License.


    
