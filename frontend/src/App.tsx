import "./App.css";
import BalanceCard from "./components/BalanceCard";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";
import type { Transaction } from "./types/Transaction";
import BottomNav from "./components/BottomNav";
import { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "./services/api";
import AddTransactionModal from "./components/AddTransactionModal";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadTransactions = () => {
    setLoading(true);
    getTransactions()
      .then((data) => setTransactions(data))
      .catch(() => setError("Could not load transactions"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAddTransaction = async (
    newTransaction: Omit<Transaction, "_id" | "createdAt" | "updatedAt">,
  ) => {
    await createTransaction(newTransaction);
    loadTransactions();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch {
      setError("Could not delete transaction");
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = income - expense;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm">
        <header className="px-5 pt-6 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              My Wallet Tracker
            </h1>
            <p className="text-sm text-gray-500">Welcome back, Alex</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            A
          </div>
        </header>

        <main className="px-5 pb-24 space-y-5">
          {loading ? (
            <p className="text-center text-gray-400 py-10">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : (
            <>
              <BalanceCard
                totalBalance={totalBalance}
                income={income}
                expense={expense}
              />
              <CategoryChart transactions={transactions} />
              <TransactionList
                transactions={transactions}
                onDelete={handleDelete}
              />
            </>
          )}
        </main>

        <BottomNav onAddClick={() => setShowModal(true)} />

        {showModal && (
          <AddTransactionModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddTransaction}
          />
        )}
      </div>
    </div>
  );
}

export default App;
