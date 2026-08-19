interface BalanceCardProps {
  totalBalance: number;
  income: number;
  expense: number;
}

function BalanceCard({ totalBalance, income, expense }: BalanceCardProps) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">Total balance</p>
      <p className="text-3xl font-bold text-gray-900 mb-4">
        ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>

      <div className="flex gap-3">
        <div className="flex-1 bg-green-100 rounded-xl p-3">
          <p className="text-sm text-green-700 mb-1">income</p>
          <p className="text-lg font-semibold text-green-800">
            ${income.toLocaleString("en-US")}
          </p>
        </div>
        <div className="flex-1 bg-red-100 rounded-xl p-3">
          <p className="text-sm text-red-700 mb-1">expense</p>
          <p className="text-lg font-semibold text-red-800">
            ${expense.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
