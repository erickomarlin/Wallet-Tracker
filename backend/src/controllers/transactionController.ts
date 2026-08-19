import { Request, Response } from "express";
import Transaction from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error,
    });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const transaction = new Transaction({
      title,
      amount,
      type,
      category,
      date,
    });
    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create transaction" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({ message: "Failed to update transaction" });
    }

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: "Delete Transaction not found" });
    }
    res.status(200).json({ message: "Delete Transaction successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
};
