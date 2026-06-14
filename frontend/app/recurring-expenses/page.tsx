"use client";

import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RecurringExpense = {
    id: string;
    name: string;
    category: string;
    amountInCents: number;
    frequency: string;
    nextPaymentDate: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RecurringExpensesPage() {
    const router = useRouter();

    const [expenses, setExpenses] = useState<RecurringExpense[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<RecurringExpense | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function loadRecurringExpenses() {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/recurring-expenses");

            if (!response.ok) {
                setErrorMessage("Could not load recurring expenses.");
                return;
            }

            const data: RecurringExpense[] = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error("Recurring expenses loading failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function initialisePage() {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/login");
                return;
            }

            await loadRecurringExpenses();
        }

        void initialisePage();
    }, [router]);

    async function handleAddPayment(expense: Omit<RecurringExpense, "id">) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/recurring-expenses", {
                method: "POST",
                body: JSON.stringify(expense),
            });

            if (!response.ok) {
                setErrorMessage("Could not save recurring payment.");
                return;
            }

            await loadRecurringExpenses();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Add recurring payment failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleUpdatePayment(expense: RecurringExpense) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch(
                `/api/v1/recurring-expenses/${expense.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        name: expense.name,
                        category: expense.category,
                        amountInCents: expense.amountInCents,
                        frequency: expense.frequency,
                        nextPaymentDate: expense.nextPaymentDate,
                    }),
                }
            );

            if (!response.ok) {
                setErrorMessage("Could not update recurring payment.");
                return;
            }

            const updatedExpenses: RecurringExpense[] = await response.json();
            setExpenses(updatedExpenses);
            setEditingExpense(null);
        } catch (error) {
            console.error("Update recurring payment failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDeletePayment(expenseId: string) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch(`/api/v1/recurring-expenses/${expenseId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                setErrorMessage("Could not delete recurring payment.");
                return;
            }

            const updatedExpenses: RecurringExpense[] = await response.json();
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Delete recurring payment failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <AuthGuard>
                <AppShell>
                    <p>Loading recurring expenses...</p>
                </AppShell>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    {errorMessage && (
                        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}

                    <UpcomingPayments
                        expenses={expenses}
                        onAddPayment={() => setIsModalOpen(true)}
                        onDeletePayment={handleDeletePayment}
                        onEditPayment={(expense) => setEditingExpense(expense)}
                    />

                    {isModalOpen && (
                        <AddPaymentModal
                            isSaving={isSaving}
                            onClose={() => setIsModalOpen(false)}
                            onAddPayment={handleAddPayment}
                        />
                    )}

                    {editingExpense && (
                        <EditPaymentModal
                            expense={editingExpense}
                            isSaving={isSaving}
                            onClose={() => setEditingExpense(null)}
                            onSave={handleUpdatePayment}
                        />
                    )}
                </section>
            </AppShell>
        </AuthGuard>
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
                              onDeletePayment,
                              onEditPayment,
                          }: {
    expenses: RecurringExpense[];
    onAddPayment: () => void;
    onDeletePayment: (expenseId: string) => void;
    onEditPayment: (expense: RecurringExpense) => void;
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
                {expenses.length === 0 ? (
                    <p className="text-gray-600">No recurring payments yet.</p>
                ) : (
                    expenses.map((expense) => (
                        <RecurringExpenseItem
                            key={expense.id}
                            expense={expense}
                            onDeletePayment={onDeletePayment}
                            onEditPayment={onEditPayment}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

function RecurringExpenseItem({
                                  expense,
                                  onDeletePayment,
                                  onEditPayment,
                              }: {
    expense: RecurringExpense;
    onDeletePayment: (expenseId: string) => void;
    onEditPayment: (expense: RecurringExpense) => void;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="font-semibold">{expense.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {formatFrequency(expense.frequency)} • Next payment:{" "}
                        {formatDate(expense.nextPaymentDate)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {expense.category}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <p className="font-bold">
                        {formatCurrency(expense.amountInCents)}
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEditPayment(expense)}
                            className="rounded-lg border border-emerald-200 px-3 py-1 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDeletePayment(expense.id)}
                            className="rounded-lg border border-red-200 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddPaymentModal({
                             isSaving,
                             onClose,
                             onAddPayment,
                         }: {
    isSaving: boolean;
    onClose: () => void;
    onAddPayment: (expense: Omit<RecurringExpense, "id">) => void;
}) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [frequency, setFrequency] = useState("MONTHLY");
    const [nextPaymentDate, setNextPaymentDate] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !category || !amount || !frequency || !nextPaymentDate) return;

        onAddPayment({
            name,
            category,
            amountInCents: randToCents(amount),
            frequency,
            nextPaymentDate,
        });
    }

    return (
        <PaymentModalForm
            title="Add Recurring Payment"
            subtitle="Add subscriptions, rent, debit orders, or other repeated payments."
            name={name}
            category={category}
            amount={amount}
            frequency={frequency}
            nextPaymentDate={nextPaymentDate}
            isSaving={isSaving}
            submitLabel="Save Payment"
            onClose={onClose}
            onSubmit={handleSubmit}
            setName={setName}
            setCategory={setCategory}
            setAmount={setAmount}
            setFrequency={setFrequency}
            setNextPaymentDate={setNextPaymentDate}
        />
    );
}

function EditPaymentModal({
                              expense,
                              isSaving,
                              onClose,
                              onSave,
                          }: {
    expense: RecurringExpense;
    isSaving: boolean;
    onClose: () => void;
    onSave: (expense: RecurringExpense) => void;
}) {
    const [name, setName] = useState(expense.name);
    const [category, setCategory] = useState(expense.category);
    const [amount, setAmount] = useState(centsToRandInput(expense.amountInCents));
    const [frequency, setFrequency] = useState(expense.frequency);
    const [nextPaymentDate, setNextPaymentDate] = useState(expense.nextPaymentDate);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !category || !amount || !frequency || !nextPaymentDate) return;

        onSave({
            id: expense.id,
            name,
            category,
            amountInCents: randToCents(amount),
            frequency,
            nextPaymentDate,
        });
    }

    return (
        <PaymentModalForm
            title="Edit Recurring Payment"
            subtitle="Update this recurring payment."
            name={name}
            category={category}
            amount={amount}
            frequency={frequency}
            nextPaymentDate={nextPaymentDate}
            isSaving={isSaving}
            submitLabel="Save Changes"
            onClose={onClose}
            onSubmit={handleSubmit}
            setName={setName}
            setCategory={setCategory}
            setAmount={setAmount}
            setFrequency={setFrequency}
            setNextPaymentDate={setNextPaymentDate}
        />
    );
}

function PaymentModalForm({
                              title,
                              subtitle,
                              name,
                              category,
                              amount,
                              frequency,
                              nextPaymentDate,
                              isSaving,
                              submitLabel,
                              onClose,
                              onSubmit,
                              setName,
                              setCategory,
                              setAmount,
                              setFrequency,
                              setNextPaymentDate,
                          }: {
    title: string;
    subtitle: string;
    name: string;
    category: string;
    amount: string;
    frequency: string;
    nextPaymentDate: string;
    isSaving: boolean;
    submitLabel: string;
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setName: (value: string) => void;
    setCategory: (value: string) => void;
    setAmount: (value: string) => void;
    setFrequency: (value: string) => void;
    setNextPaymentDate: (value: string) => void;
}) {
    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose}>
            <form onSubmit={onSubmit} className="space-y-4">
                <ModalInput
                    label="Payment name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Netflix"
                />

                <ModalInput
                    label="Category"
                    value={category}
                    onChange={setCategory}
                    placeholder="e.g. Entertainment"
                />

                <ModalInput
                    label="Amount"
                    value={amount}
                    onChange={setAmount}
                    placeholder="e.g. 199"
                />

                <div>
                    <label className="text-sm font-medium text-gray-700">Frequency</label>

                    <select
                        value={frequency}
                        onChange={(event) => setFrequency(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="YEARLY">Yearly</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Next payment date
                    </label>

                    <input
                        type="date"
                        value={nextPaymentDate}
                        onChange={(event) => setNextPaymentDate(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <SubmitButton
                    label={isSaving ? "Saving..." : submitLabel}
                    disabled={isSaving}
                />
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

function SubmitButton({
                          label,
                          disabled = false,
                      }: {
    label: string;
    disabled?: boolean;
}) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-xl px-5 py-3 font-semibold text-white transition ${
                disabled
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
            {label}
        </button>
    );
}

function authenticatedFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Missing auth token");
    }

    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });
}

function randToCents(value: string) {
    const cleanValue = value.replace("R", "").replaceAll(",", "").trim();
    return Math.round(Number(cleanValue) * 100);
}

function centsToRandInput(amountInCents: number) {
    return String(amountInCents / 100);
}

function formatCurrency(amountInCents: number) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
    }).format(amountInCents / 100);
}

function formatFrequency(frequency: string) {
    return frequency.charAt(0) + frequency.slice(1).toLowerCase();
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}