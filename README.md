# Finance Management API

## Overview
The Finance Management API is a backend system for managing budgets, transactions, financial reports, and savings goals. It includes authentication, authorization, and admin operations.

## Features
- User authentication (Register & Login)
- Budget management
- Transaction tracking
- Financial reports
- Savings goals tracking
- Admin operations
- JWT-based authentication

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB** (Local or Cloud instance)
- **Postman** (Optional for testing)

### Clone Repository
```sh
git clone https://github.com/ayyashzamny/finance-management-system-rest-api.git
cd finance-management-api
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure the following:
```
PORT=5050
MONGO_URI=mongodb+srv://ayyashzamny2002:f84OIKTdN3AgMSUI@cluster0.awhys.mongodb.net/
MONGO_URI_TEST=mongodb+srv://ayyashzamny2002:f84OIKTdN3AgMSUI@cluster0.mongodb.net/test_db?retryWrites=true&w=majority
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### Start the Server
```sh
npm start
```
The server will run on `http://localhost:5050`.

### Running in Development Mode
```sh
npm run dev
```

---

## API Documentation

### **Authentication**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get a token |

Example Request:
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "user123",
    "role": "regular"
}
```

### **Transactions**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create a new transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/transactions/filter?tag=#work` | Filter transactions by tag |

### **Budget Management**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/budgets` | Get all budgets |
| POST | `/api/budgets` | Set a new budget |
| GET | `/api/budgets/:category` | Get budget by category |
| PUT | `/api/budgets/:category` | Update budget amount |
| DELETE | `/api/budgets/:category` | Delete a budget |
| GET | `/api/budgets/track/:month` | Track spending & alerts |

### **Financial Reports**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/reports/financial` | Get financial report |

Example Query Parameters:
```
?startDate=2025-01-01&endDate=2025-12-31&category=Food&tags=grocery,dinner
```

### **Savings Goals**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create a new goal |
| GET | `/api/goals/:goalId` | Get goal by ID |
| PUT | `/api/goals/:goalId` | Update goal |
| DELETE | `/api/goals/:goalId` | Delete goal |

### **Admin Operations**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/api/users/all-users` | Get all user accounts |
| GET | `/api/transactions/summary` | Get transaction summary |

---

## Running Tests

### **Unit & Integration Tests**
Run the following command to execute all tests:
```sh
npm test
```
To run tests for a specific module (e.g., authentication):
```sh
npm test -- auth
```

### **Testing with Postman**
- Import the provided **Postman Collection** (`Finance App.postman_collection.json`).
- Update the Authorization **Bearer Token** from the login response.
- Test all endpoints interactively.

---

## Troubleshooting
- **MongoDB connection errors:** Ensure MongoDB is running and the `MONGO_URI` is correct.
- **Authentication failures:** Ensure you include a `Bearer Token` in the request headers.
- **Test failures:** Use `npm run dev` to check real-time logs and debug issues.

---

## Contributors
- **Ayyash Zamny** - Developer


