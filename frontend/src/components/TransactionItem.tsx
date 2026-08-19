import type { Transaction } from "../types/Transaction";

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isSameDay(date, today)) return `Today, ${time}`;
  if (isSameDay(date, yesterday)) return `Yesterday, ${time}`;

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${weekday}, ${time}`;
}

function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const isExpense = transaction.type === "expense";

  const handleDeleteClick = () => {
    const confirmed = window.confirm(`Delete "${transaction.title}"?`);
    if (confirmed) {
      onDelete(transaction._id);
    }
  };
  return (
    <div className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-2xl">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isExpense ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <span className={isExpense ? "text-red-500" : "text-green-500"}>
            {isExpense ? "−" : "+"}
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{transaction.title}</p>
          <p className="text-sm text-gray-400">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p
          className={`font-semibold ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          {isExpense ? "-" : "+"}$
          {transaction.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
        <button
          onClick={handleDeleteClick}
          className="text-gray-300 hover:text-red-500 text-lg leading-none px-1"
          aria-label="Delete transaction"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;
