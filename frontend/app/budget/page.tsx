"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useMemo, useState } from "react";

type BudgetItemType = "EXPENSE" | "SAVING" | "DEBT" | "INCOME";

type BudgetItem = {
    id: string;
    name: string;
    amountInCents: number;
    category: string;
    type: BudgetItemType;
};

type BudgetGoal = {
    id: string;
    name: string;
    targetAmountInCents: number;
    currentAmountInCents: number;
    monthlyContributionInCents: number;
};

type BudgetResponse = {
    monthlyIncomeInCents: number;
    items: BudgetItem[];
    goal: BudgetGoal;
};

export default function BudgetPage() {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

    const [monthlyIncomeInCents, setMonthlyIncomeInCents] = useState(0);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [goal, setGoal] = useState<BudgetGoal | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadBudget() {
            try {
                const response = await fetch(
                    `https://moneymap-backend-l90f.onrender.com/api/v1/budget`
                );

                if (!response.ok) {
                    setErrorMessage("Could not load budget.");
                    return;
                }

                const budget: BudgetResponse = await response.json();

                setMonthlyIncomeInCents(budget.monthlyIncomeInCents);
                setBudgetItems(budget.items);
                setGoal(budget.goal);
            } catch (error) {
                console.error("Budget loading failed:", error);
                setErrorMessage("Could not connect to the server.");
            } finally {
                setIsLoading(false);
            }
        }

        loadBudget();
    }, []);

    const plannedExpensesInCents = useMemo(() => {
        return budgetItems
            .filter((item) => item.type === "EXPENSE" || item.type === "SAVING")
            .reduce((total, item) => total + item.amountInCents, 0);
    }, [budgetItems]);

    const remainingInCents = monthlyIncomeInCents - plannedExpensesInCents;

    function handleAddItem(item: BudgetItem) {
        setBudgetItems((currentItems) => [...currentItems, item]);
        setIsItemModalOpen(false);
    }

    function handleSetGoal(updatedGoal: BudgetGoal) {
        setGoal(updatedGoal);
        setIsGoalModalOpen(false);
    }

    if (isLoading) {
        return (
            <AppShell>
                <p>Loading budget...</p>
            </AppShell>
        );
    }

    if (errorMessage || !goal) {
        return (
            <AppShell>
                <p className="text-red-500">
                    {errorMessage || "Budget unavailable."}
                </p>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <section>
                <PageHeader />

                <SummaryCards
                    monthlyIncomeInCents={monthlyIncomeInCents}
                    plannedExpensesInCents={plannedExpensesInCents}
                    remainingInCents={remainingInCents}
                />

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

function SummaryCards({
                          monthlyIncomeInCents,
                          plannedExpensesInCents,
                          remainingInCents,
                      }: {
    monthlyIncomeInCents: number;
    plannedExpensesInCents: number;
    remainingInCents: number;
}) {
    const cards = [
        {
            label: "Monthly Income",
            value: formatCurrency(monthlyIncomeInCents),
        },
        {
            label: "Planned Expenses",
            value: formatCurrency(plannedExpensesInCents),
        },
        {
            label: "Remaining",
            value: formatCurrency(remainingInCents),
            highlight: true,
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
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
    const progressPercentage = Math.min(
        100,
        Math.round((goal.currentAmountInCents / goal.targetAmountInCents) * 100)
    );

    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-emerald-700">
                        Budget Goal
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                        {goal.name} to {formatCurrency(goal.targetAmountInCents)}
                    </h2>

                    <p className="mt-2 text-gray-600">
                        You are currently contributing{" "}
                        {formatCurrency(goal.monthlyContributionInCents)}. Adjust
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
                    <span>Current: {formatCurrency(goal.currentAmountInCents)}</span>
                    <span>Target: {formatCurrency(goal.targetAmountInCents)}</span>
                </div>

                <div className="h-3 rounded-full bg-emerald-100">
                    <div
                        className="h-3 rounded-full bg-emerald-600"
                        style={{ width: `${progressPercentage}%` }}
                    />
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
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
                    >
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                                {item.category} · {item.type}
                            </p>
                        </div>

                        <p className="font-bold">
                            {formatCurrency(item.amountInCents)}
                        </p>
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
    const [type, setType] = useState<BudgetItemType>("EXPENSE");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !amount || !category) return;

        onAddItem({
            id: crypto.randomUUID(),
            name,
            amountInCents: randToCents(amount),
            category,
            type,
        });
    }

    return (
        <Modal
            title="Add Budget Item"
            subtitle="Add a planned expense, saving, debt, or income item."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Name"
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

                <ModalInput
                    label="Category"
                    value={category}
                    onChange={setCategory}
                    placeholder="e.g. Bills"
                />

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(event) =>
                            setType(event.target.value as BudgetItemType)
                        }
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="EXPENSE">Expense</option>
                        <option value="SAVING">Saving</option>
                        <option value="DEBT">Debt</option>
                        <option value="INCOME">Income</option>
                    </select>
                </div>

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
    const [targetAmount, setTargetAmount] = useState(
        centsToRandInput(initialGoal.targetAmountInCents)
    );
    const [currentAmount, setCurrentAmount] = useState(
        centsToRandInput(initialGoal.currentAmountInCents)
    );
    const [monthlyContribution, setMonthlyContribution] = useState(
        centsToRandInput(initialGoal.monthlyContributionInCents)
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!goalName || !targetAmount || !currentAmount || !monthlyContribution) {
            return;
        }

        onSetGoal({
            id: initialGoal.id,
            name: goalName,
            targetAmountInCents: randToCents(targetAmount),
            currentAmountInCents: randToCents(currentAmount),
            monthlyContributionInCents: randToCents(monthlyContribution),
        });
    }

    return (
        <Modal
            title="Set Budget Goal"
            subtitle="Define what you want your budget to work toward."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Goal name"
                    value={goalName}
                    onChange={setGoalName}
                    placeholder="e.g. Emergency Fund"
                />

                <ModalInput
                    label="Target amount"
                    value={targetAmount}
                    onChange={setTargetAmount}
                    placeholder="e.g. 5000"
                />

                <ModalInput
                    label="Current amount"
                    value={currentAmount}
                    onChange={setCurrentAmount}
                    placeholder="e.g. 2000"
                />

                <ModalInput
                    label="Monthly contribution"
                    value={monthlyContribution}
                    onChange={setMonthlyContribution}
                    placeholder="e.g. 1000"
                />

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