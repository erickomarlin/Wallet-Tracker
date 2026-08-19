import type { Transaction } from "../types/Transaction";

const API_URL = "http://localhost:5000/api/transactions";

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return res.json();
}

export async function createTransaction(
  transaction: Omit<Transaction, "_id" | "createdAt" | "updatedAt">,
): Promise<Transaction> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) {
    throw new Error("Failed to create transaction");
  }
  return res.json();
}

export async function deleteTransaction(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete transaction");
  }
}
