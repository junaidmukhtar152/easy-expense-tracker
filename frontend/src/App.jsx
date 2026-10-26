import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://easy-expense-tracker-aguc.vercel.app/api/transactions";

function App() {
  // 1. State variables
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 2. Format transaction date
  function formatDate(dateValue) {
    if (!dateValue) {
      return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // 3. Load transactions from the deployed backend
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load transactions.");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setMessage("Could not connect to the backend.");
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  // 4. Add a new transaction or update an existing one
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (description.trim().length < 2) {
      setMessage("Description must contain at least 2 characters.");
      return;
    }

    if (
      amount === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      setMessage("Please enter an amount greater than zero.");
      return;
    }

    const transactionData = {
      description: description.trim(),
      amount: Number(amount),
      type: type,
    };

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save transaction.");
      }

      if (isEditing) {
        setTransactions((previousTransactions) =>
          previousTransactions.map((transaction) =>
            transaction._id === editingId ? data.transaction : transaction,
          ),
        );

        setMessage("Transaction updated successfully!");
      } else {
        setTransactions((previousTransactions) => [
          ...previousTransactions,
          data,
        ]);

        setMessage("Transaction saved successfully!");
      }

      clearForm();
    } catch (error) {
      setMessage(error.message || "Could not connect to the backend.");
      console.error(error);
    }
  }

  // 5. Clear the form
  function clearForm() {
    setDescription("");
    setAmount("");
    setType("expense");
    setEditingId(null);
  }

  // 6. Delete a transaction
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete transaction.");
      }

      setTransactions((previousTransactions) =>
        previousTransactions.filter((transaction) => transaction._id !== id),
      );

      if (editingId === id) {
        clearForm();
      }

      setMessage("Transaction deleted successfully!");
    } catch (error) {
      setMessage(error.message || "Could not connect to the backend.");
      console.error(error);
    }
  }

  // 7. Load a transaction into the form for editing
  function handleEdit(transaction) {
    setDescription(transaction.description);
    setAmount(String(transaction.amount));
    setType(transaction.type);
    setEditingId(transaction._id);
    setMessage("");
  }

  // 8. Calculate income, expenses, and balance
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  // 9. Count transactions
  const totalTransactions = transactions.length;

  const incomeCount = transactions.filter(
    (transaction) => transaction.type === "income",
  ).length;

  const expenseCount = transactions.filter(
    (transaction) => transaction.type === "expense",
  ).length;

  // 10. Search and filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || transaction.type === filter;

    const transactionDate = new Date(transaction.date);

    const localYear = transactionDate.getFullYear();
    const localMonth = String(transactionDate.getMonth() + 1).padStart(2, "0");
    const localDay = String(transactionDate.getDate()).padStart(2, "0");

    const dateString = `${localYear}-${localMonth}-${localDay}`;

    const matchesStartDate = !startDate || dateString >= startDate;
    const matchesEndDate = !endDate || dateString <= endDate;

    return matchesSearch && matchesFilter && matchesStartDate && matchesEndDate;
  });

  // 11. Dashboard interface
  return (
    <div className="app">
      <header className="header">
        <h1>Easy Expense Tracker</h1>
        <p>Manage your money with ease.</p>
      </header>

      <main className="container">
        {/* Transaction overview */}
        <section className="transactions">
          <h2>Transaction Overview</h2>
          <p>Total Transactions: {totalTransactions}</p>
          <p>Income Transactions: {incomeCount}</p>
          <p>Expense Transactions: {expenseCount}</p>
        </section>

        {/* Summary cards */}
        <section className="summary">
          <div className="card">
            <h3>Total Income</h3>
            <p>Rs. {totalIncome.toLocaleString("en-PK")}</p>
          </div>

          <div className="card">
            <h3>Total Expenses</h3>
            <p>Rs. {totalExpenses.toLocaleString("en-PK")}</p>
          </div>

          <div className="card">
            <h3>Balance</h3>
            <p>Rs. {balance.toLocaleString("en-PK")}</p>
          </div>
        </section>

        {/* Add or edit transaction */}
        <section className="form-section">
          <h2>{editingId ? "Edit Transaction" : "Add Transaction"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <input
              type="number"
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button type="submit">
              {editingId ? "Update Transaction" : "Add Transaction"}
            </button>

            <button type="button" onClick={clearForm}>
              Clear Form
            </button>
          </form>

          {message && (
            <p className="status-message" role="status">
              {message}
            </p>
          )}
        </section>

        {/* Recent transactions */}
        <section className="transactions">
          <h2>Recent Transactions</h2>

          <div className="date-filters">
            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear Dates
            </button>
          </div>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {/* Filter buttons */}
          <div className="filter-buttons">
            <button
              type="button"
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              type="button"
              className={filter === "income" ? "active-filter" : ""}
              onClick={() => setFilter("income")}
            >
              Income
            </button>

            <button
              type="button"
              className={filter === "expense" ? "active-filter" : ""}
              onClick={() => setFilter("expense")}
            >
              Expenses
            </button>
          </div>

          {/* Empty state or transaction list */}
          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <h3>
                {searchTerm.trim()
                  ? "No matching transactions"
                  : filter !== "all"
                    ? "No transactions in this category"
                    : "No transactions yet"}
              </h3>

              <p>
                {searchTerm.trim()
                  ? "Try another search term."
                  : filter !== "all"
                    ? "Choose another filter or add a transaction."
                    : "Add your first income or expense using the form above."}
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div className="transaction-item" key={transaction._id}>
                <div className="transaction-details">
                  <strong>{transaction.description}</strong>
                  <span className="transaction-type">{transaction.type}</span>
                  <span className="transaction-date">
                    {formatDate(transaction.date)}
                  </span>
                </div>

                <strong
                  className={
                    transaction.type === "income"
                      ? "income-amount"
                      : "expense-amount"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"} Rs.{" "}
                  {transaction.amount.toLocaleString("en-PK")}
                </strong>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
