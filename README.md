# 💰 Easy Expense Tracker

A full-stack expense tracking application built with the MERN stack. It helps users record income and expenses, monitor their balance, and organize financial transactions through a clean, responsive dashboard.

## ✨ Features

- Add income and expense transactions
- View all saved transactions
- Edit existing transactions
- Delete transactions
- Calculate total income and total expenses
- Calculate the current balance
- Search transactions by description
- Filter transactions by type
- Filter transactions by date range
- Validate transaction inputs
- Store transaction data in MongoDB
- Responsive interface for desktop and mobile

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- Mongoose
- CORS

### Database

- MongoDB

## 📁 Project Structure

```text
easy-expense-tracker/
├── backend/
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## ⚙️ Prerequisites

Before running this project, install:

- Node.js and npm
- MongoDB running locally or an accessible MongoDB database
- Visual Studio Code (recommended)

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd easy-expense-tracker
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Set up the backend

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

Make sure your MongoDB connection string is configured in your backend.

Example local connection string:

```text
mongodb://127.0.0.1:27017/easy_expense_tracker
```

Start the backend:

```bash
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 3. Set up the frontend

Open a second terminal in the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/transactions`

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| POST   | `/`      | Create a transaction |
| GET    | `/`      | Get all transactions |
| GET    | `/:id`   | Get one transaction  |
| PUT    | `/:id`   | Update a transaction |
| DELETE | `/:id`   | Delete a transaction |

## 📊 How It Works

1. The user enters a transaction description, amount, and type.
2. React sends the transaction to the Express backend.
3. Mongoose saves the transaction in MongoDB.
4. The frontend retrieves and displays saved transactions.
5. React calculates income, expenses, and balance from the transaction data.
6. Search and filters help users find particular transactions.

## 🎯 Project Objective

The objective of this project is to practice full-stack web development by connecting a React frontend, an Express and Node.js backend, and a MongoDB database.

## 📚 Learning Outcomes

Through this project, I practiced:

- Building a user interface with React
- Managing state and handling form submissions
- Creating REST API endpoints with Express
- Performing CRUD operations
- Connecting a Node.js application to MongoDB
- Handling frontend and backend communication
- Applying form validation and error handling
- Improving responsive UI/UX design

## 🔮 Future Improvements

- User registration and login
- Interactive financial charts
- Monthly budgets and spending reports
- Export transactions to CSV
- Online deployment

## 👨‍💻 Author

**Junaid Mukhtar**

BS Software Engineering Student

GitHub: [junaidmukhtar152](https://github.com/junaidmukhtar152)

## 📄 License

This project is available for learning and educational purposes.
