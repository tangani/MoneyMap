"use client";

import AppShell from "@/components/AppShell";
import {useEffect, useState} from "react";

type BudgetItem = {
    name: string;
    amount: string;
    category: string;
};

type BudgetGoal = {
    name: string;
    targetAmount: string;
    monthlyContribution: string;
};

const BUDGET_ITEMS_STORAGE_KEY = "moneymap:budget-items";

const initialBudgetItems: BudgetItem[] = [
    { name: "Rent", amount: "R7,500", category: "Bills" },
    { name: "Groceries", amount: "R3,000", category: "Essentials" },
    { name: "Transport", amount: "R1,500", category: "Essentials" },
    { name: "Savings", amount: "R2,000", category: "Goals" },
];

const summaryCards = [
    { label: "Monthly Income", value: "R48,000" },
    { label: "Planned Expenses", value: "R12,000" },
    { label: "Remaining", value: "R36,000", highlight: true },
];

const initialGoal: BudgetGoal = {
    name: "Increase monthly savings",
    targetAmount: "R5,000",
    monthlyContribution: "R2,000",
};

export default function BudgetPage() {
    const [goal, setGoal] = useState(initialGoal);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
        if (typeof window === "undefined") {
            return initialBudgetItems;
        }

        const savedItems = localStorage.getItem(BUDGET_ITEMS_STORAGE_KEY);

        return savedItems ? JSON.parse(savedItems) : initialBudgetItems;
    });

    function handleAddItem(item: BudgetItem) {
        setBudgetItems((currentItems) => [...currentItems, item]);
        setIsItemModalOpen(false);
    }

    function handleSetGoal(updatedGoal: BudgetGoal) {
        setGoal(updatedGoal);
        setIsGoalModalOpen(false);
    }

    useEffect(() => {
        localStorage.setItem(
            BUDGET_ITEMS_STORAGE_KEY,
            JSON.stringify(budgetItems)
        );
    }, [budgetItems]);

    return (
        <AppShell>
            <section>
                <PageHeader />
                <SummaryCards />

                <BudgetGoalCard
                    goal={goal}
                    onSetGoal={() => setIsGoalModalOpen(true)}
                />

                <BudgetItems
                    budgetItems={budgetItems}
                    onAddItem={() => setIsItemModalOpen(true)}
                />

                {isItemModalOpen && (
                    <AddBudgetItemModal
                        onClose={() => setIsItemModalOpen(false)}
                        onAddItem={handleAddItem}
                    />
                )}

                {isGoalModalOpen && (
                    <SetGoalModal
                        initialGoal={goal}
                        onClose={() => setIsGoalModalOpen(false)}
                        onSetGoal={handleSetGoal}
                    />
                )}
            </section>
        </AppShell>
    );
}

function PageHeader() {
    return (
        <div className="mb-8">
            <p className="text-sm font-medium text-emerald-700">
                MoneyMap Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold">Your Budget</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Plan your monthly income, expenses, savings, and goals in one place.
            </p>
        </div>
    );
}

function SummaryCards() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {summaryCards.map((card) => (
                <div key={card.label} className="rounded-3xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">{card.label}</p>

                    <h2
                        className={`mt-2 text-3xl font-bold ${
                            card.highlight ? "text-emerald-600" : ""
                        }`}
                    >
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}

function BudgetGoalCard({
                            goal,
                            onSetGoal,
                        }: {
    goal: BudgetGoal;
    onSetGoal: () => void;
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-emerald-700">Budget Goal</p>

                    <h2 className="mt-2 text-2xl font-bold">
                        {goal.name} to {goal.targetAmount}
                    </h2>

                    <p className="mt-2 text-gray-600">
                        You are currently contributing {goal.monthlyContribution}. Adjust
                        your planned budget to move closer to your target.
                    </p>
                </div>

                <button
                    onClick={onSetGoal}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                    Set Goal
                </button>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm text-gray-600">
                    <span>Current: {goal.monthlyContribution}</span>
                    <span>Target: {goal.targetAmount}</span>
                </div>

                <div className="h-3 rounded-full bg-emerald-100">
                    <div className="h-3 w-2/5 rounded-full bg-emerald-600" />
                </div>
            </div>
        </section>
    );
}

function BudgetItems({
                         budgetItems,
                         onAddItem,
                     }: {
    budgetItems: BudgetItem[];
    onAddItem: () => void;
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Budget Items</h2>

                    <p className="mt-1 text-gray-600">
                        A simple overview of your planned spending.
                    </p>
                </div>

                <button
                    onClick={onAddItem}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                    Add Item
                </button>
            </div>

            <div className="space-y-4">
                {budgetItems.map((item) => (
                    <div
                        key={`${item.name}-${item.amount}`}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
                    >
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                        </div>

                        <p className="font-bold">{item.amount}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function AddBudgetItemModal({
                                onClose,
                                onAddItem,
                            }: {
    onClose: () => void;
    onAddItem: (item: BudgetItem) => void;
}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !amount || !category) return;

        onAddItem({
            name,
            amount: formatRandAmount(amount),
            category,
        });
    }

    return (
        <Modal title="Add Budget Item" subtitle="Add a planned expense or saving category." onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput label="Name" value={name} onChange={setName} placeholder="e.g. Internet" />
                <ModalInput label="Amount" value={amount} onChange={setAmount} placeholder="e.g. 899" />
                <ModalInput label="Category" value={category} onChange={setCategory} placeholder="e.g. Bills" />

                <SubmitButton label="Save Item" />
            </form>
        </Modal>
    );
}

function SetGoalModal({
                          initialGoal,
                          onClose,
                          onSetGoal,
                      }: {
    initialGoal: BudgetGoal;
    onClose: () => void;
    onSetGoal: (goal: BudgetGoal) => void;
}) {
    const [goalName, setGoalName] = useState(initialGoal.name);
    const [targetAmount, setTargetAmount] = useState(initialGoal.targetAmount);
    const [monthlyContribution, setMonthlyContribution] = useState(
        initialGoal.monthlyContribution
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!goalName || !targetAmount || !monthlyContribution) return;

        onSetGoal({
            name: goalName,
            targetAmount: formatRandAmount(targetAmount),
            monthlyContribution: formatRandAmount(monthlyContribution),
        });
    }

    return (
        <Modal title="Set Budget Goal" subtitle="Define what you want your budget to work toward." onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput label="Goal name" value={goalName} onChange={setGoalName} placeholder="e.g. Emergency Fund" />
                <ModalInput label="Target amount" value={targetAmount} onChange={setTargetAmount} placeholder="e.g. 5000" />
                <ModalInput label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="e.g. 1000" />

                <SubmitButton label="Save Goal" />
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
