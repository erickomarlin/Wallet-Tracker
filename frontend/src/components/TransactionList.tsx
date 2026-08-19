import type { Transaction } from "../types/Transaction";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-gray-900">Recent transactions</h2>
        <button className="text-sm text-blue-600 font-medium">See all</button>
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No transactions yet
          </p>
        ) : (
          transactions.map((t) => (
            <TransactionItem key={t._id} transaction={t} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
