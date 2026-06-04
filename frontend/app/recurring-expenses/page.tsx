"use client";

import AppShell from "@/components/AppShell";
import { useState } from "react";

type RecurringExpense = {
    name: string;
    amount: string;
    frequency: string;
    nextDate: string;
};

const initialRecurringExpenses: RecurringExpense[] = [
    { name: "Rent", amount: "R7,500", frequency: "Monthly", nextDate: "1 June" },
    { name: "Netflix", amount: "R199", frequency: "Monthly", nextDate: "15 June" },
    { name: "Car Insurance", amount: "R850", frequency: "Monthly", nextDate: "25 June" },
    { name: "Gym", amount: "R350", frequency: "Monthly", nextDate: "28 June" },
];

export default function RecurringExpensesPage() {
    const [expenses, setExpenses] = useState(initialRecurringExpenses);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleAddPayment(expense: RecurringExpense) {
        setExpenses((currentExpenses) => [...currentExpenses, expense]);
        setIsModalOpen(false);
    }

    return (
        <AppShell>
            <section>
                <PageHeader />

                <UpcomingPayments
                    expenses={expenses}
                    onAddPayment={() => setIsModalOpen(true)}
                />

                {isModalOpen && (
                    <AddPaymentModal
                        onClose={() => setIsModalOpen(false)}
                        onAddPayment={handleAddPayment}
                    />
                )}
            </section>
        </AppShell>
    );
}

function PageHeader() {
    return (
        <div>
            <p className="text-sm font-medium text-emerald-700">
                MoneyMap Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold">Recurring Expenses</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Track subscriptions, debit orders, rent, insurance, and other repeated
                payments.
            </p>
        </div>
    );
}

function UpcomingPayments({
                              expenses,
                              onAddPayment,
                          }: {
    expenses: RecurringExpense[];
    onAddPayment: () => void;
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Upcoming Payments</h2>

                    <p className="mt-1 text-gray-600">
                        Know what is coming before it surprises you.
                    </p>
                </div>

                <button
                    onClick={onAddPayment}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                    Add Payment
                </button>
            </div>

            <div className="space-y-4">
                {expenses.map((expense) => (
                    <RecurringExpenseItem
                        key={`${expense.name}-${expense.nextDate}`}
                        expense={expense}
                    />
                ))}
            </div>
        </section>
    );
}

function RecurringExpenseItem({ expense }: { expense: RecurringExpense }) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{expense.name}</h3>
                <p className="font-bold">{expense.amount}</p>
            </div>

            <p className="mt-1 text-sm text-gray-500">
                {expense.frequency} • Next payment: {expense.nextDate}
            </p>
        </div>
    );
}

function AddPaymentModal({
                             onClose,
                             onAddPayment,
                         }: {
    onClose: () => void;
    onAddPayment: (expense: RecurringExpense) => void;
}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState("Monthly");
    const [nextDate, setNextDate] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !amount || !frequency || !nextDate) return;

        onAddPayment({
            name,
            amount: formatRandAmount(amount),
            frequency,
            nextDate,
        });
    }

    return (
        <Modal
            title="Add Recurring Payment"
            subtitle="Add subscriptions, rent, debit orders, or other repeated payments."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Payment name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Internet"
                />

                <ModalInput
                    label="Amount"
                    value={amount}
                    onChange={setAmount}
                    placeholder="e.g. 899"
                />

                <div>
                    <label className="text-sm font-medium text-gray-700">Frequency</label>

                    <select
                        value={frequency}
                        onChange={(event) => setFrequency(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    >
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                    </select>
                </div>

                <ModalInput
                    label="Next payment date"
                    value={nextDate}
                    onChange={setNextDate}
                    placeholder="e.g. 1 July"
                />

                <SubmitButton label="Save Payment" />
            </form>
        </Modal>
    );
}

function Modal({
                   title,
                   subtitle,
                   onClose,
                   children,
               }: {
    title: string;
    subtitle: string;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl font-semibold text-gray-500 hover:text-gray-800"
                    >
                        ×
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

function ModalInput({
                        label,
                        value,
                        onChange,
                        placeholder,
                    }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">{label}</label>

            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            />
        </div>
    );
}

function SubmitButton({ label }: { label: string }) {
    return (
        <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
            {label}
        </button>
    );
}

function formatRandAmount(value: string) {
    return value.trim().startsWith("R") ? value.trim() : `R${value.trim()}`;
}