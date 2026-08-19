import { useState } from "react";
import type { Transaction } from "../types/Transaction";

interface AddTransactionModalProps {
  onClose: () => void;
  onSubmit: (
    transaction: Omit<Transaction, "_id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

function AddTransactionModal({ onClose, onSubmit }: AddTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !amount || !category.trim()) {
      setFormError("Please fill in all fields");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Amount must be a positive number");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        amount: parsedAmount,
        type,
        category: category.trim(),
        date: new Date().toISOString(),
      });
      onClose();
    } catch {
      setFormError("Failed to save transaction. Try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Add transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-2 rounded-xl font-medium ${
                type === "expense"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-2 rounded-xl font-medium ${
                type === "income"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              Income
            </button>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grocery store"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Food, Rent, Fun"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-gray-400"
            />
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
