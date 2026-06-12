"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = "https://moneymap-backend-l90f.onrender.com";

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
    items?: BudgetItem[];
    goal?: BudgetGoal | null;
};

export default function BudgetPage() {
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

    const [monthlyIncomeInCents, setMonthlyIncomeInCents] = useState(0);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [goal, setGoal] = useState<BudgetGoal | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        loadBudget();
    }, []);

    async function loadBudget() {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/budget");

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Budget request failed:", response.status, errorText);
                setErrorMessage("Could not load budget.");
                return;
            }

            const budget: BudgetResponse = await response.json();
            updateBudgetState(budget);
        } catch (error) {
            console.error("Budget loading failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsLoading(false);
        }
    }

    function updateBudgetState(budget: BudgetResponse) {
        setMonthlyIncomeInCents(budget.monthlyIncomeInCents ?? 0);
        setBudgetItems(budget.items ?? []);
        setGoal(budget.goal ?? null);
    }

    const plannedExpensesInCents = useMemo(() => {
        return budgetItems
            .filter((item) => item.type === "EXPENSE" || item.type === "SAVING" || item.type === "DEBT")
            .reduce((total, item) => total + item.amountInCents, 0);
    }, [budgetItems]);

    const remainingInCents = monthlyIncomeInCents - plannedExpensesInCents;

    async function handleUpdateIncome(amountInCents: number) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/budget/income", {
                method: "PUT",
                body: JSON.stringify({
                    monthlyIncomeInCents: amountInCents,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Income update failed:", response.status, errorText);
                setErrorMessage("Could not update income.");
                return;
            }

            const updatedBudget: BudgetResponse = await response.json();
            updateBudgetState(updatedBudget);
            setIsIncomeModalOpen(false);
        } catch (error) {
            console.error("Income update failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleAddItem(item: Omit<BudgetItem, "id">) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/budget/items", {
                method: "POST",
                body: JSON.stringify({
                    name: item.name,
                    category: item.category,
                    type: item.type,
                    amountInCents: item.amountInCents,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();

                console.error(
                    "Add item failed:",
                    response.status,
                    errorText
                );

                setErrorMessage(
                    `Add item failed (${response.status}): ${errorText}`
                );

                return;
            }

            const updatedBudget: BudgetResponse = await response.json();
            updateBudgetState(updatedBudget);
            setIsItemModalOpen(false);
        } catch (error) {
            console.error("Add item failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleSetGoal(updatedGoal: BudgetGoal) {
        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/budget/goal", {
                method: "PUT",
                body: JSON.stringify({
                    name: updatedGoal.name,
                    targetAmountInCents: updatedGoal.targetAmountInCents,
                    currentAmountInCents: updatedGoal.currentAmountInCents,
                    monthlyContributionInCents: updatedGoal.monthlyContributionInCents,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Set goal failed:", response.status, errorText);
                setErrorMessage("Could not save budget goal.");
                return;
            }

            const updatedBudget: BudgetResponse = await response.json();
            updateBudgetState(updatedBudget);
            setIsGoalModalOpen(false);
        } catch (error) {
            console.error("Set goal failed:", error);
            setErrorMessage("Could not connect to the server.");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <AppShell>
                <p>Loading budget...</p>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <section>
                <PageHeader />

                {errorMessage && (
                    <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                <SummaryCards
                    monthlyIncomeInCents={monthlyIncomeInCents}
                    plannedExpensesInCents={plannedExpensesInCents}
                    remainingInCents={remainingInCents}
                    onEditIncome={() => setIsIncomeModalOpen(true)}
                />

                {goal ? (
                    <BudgetGoalCard
                        goal={goal}
                        onSetGoal={() => setIsGoalModalOpen(true)}
                    />
                ) : (
                    <EmptyGoalCard onSetGoal={() => setIsGoalModalOpen(true)} />
                )}

                <BudgetItems
                    budgetItems={budgetItems}
                    onAddItem={() => setIsItemModalOpen(true)}
                />

                {isIncomeModalOpen && (
                    <EditIncomeModal
                        initialAmountInCents={monthlyIncomeInCents}
                        isSaving={isSaving}
                        onClose={() => setIsIncomeModalOpen(false)}
                        onSave={handleUpdateIncome}
                    />
                )}

                {isItemModalOpen && (
                    <AddBudgetItemModal
                        isSaving={isSaving}
                        onClose={() => setIsItemModalOpen(false)}
                        onAddItem={handleAddItem}
                    />
                )}

                {isGoalModalOpen && (
                    <SetGoalModal
                        isSaving={isSaving}
                        initialGoal={
                            goal ?? {
                                id: crypto.randomUUID(),
                                name: "",
                                targetAmountInCents: 0,
                                currentAmountInCents: 0,
                                monthlyContributionInCents: 0,
                            }
                        }
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
                          onEditIncome,
                      }: {
    monthlyIncomeInCents: number;
    plannedExpensesInCents: number;
    remainingInCents: number;
    onEditIncome: () => void;
}) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Monthly Income</p>
                        <h2 className="mt-2 text-3xl font-bold">
                            {formatCurrency(monthlyIncomeInCents)}
                        </h2>
                    </div>

                    <button
                        onClick={onEditIncome}
                        className="rounded-lg border border-emerald-600 px-3 py-1 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                        Edit
                    </button>
                </div>
            </div>

            <SummaryCard
                label="Planned Expenses"
                value={formatCurrency(plannedExpensesInCents)}
            />

            <SummaryCard
                label="Remaining"
                value={formatCurrency(remainingInCents)}
                highlight
            />
        </div>
    );
}

function SummaryCard({
                         label,
                         value,
                         highlight = false,
                     }: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <h2 className={`mt-2 text-3xl font-bold ${highlight ? "text-emerald-600" : ""}`}>
                {value}
            </h2>
        </div>
    );
}

function EmptyGoalCard({ onSetGoal }: { onSetGoal: () => void }) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-emerald-700">Budget Goal</p>
            <h2 className="mt-2 text-2xl font-bold">No goal set yet</h2>
            <p className="mt-2 text-gray-600">
                Create your first budget goal to start tracking your progress.
            </p>
            <button
                onClick={onSetGoal}
                className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
                Set Goal
            </button>
        </section>
    );
}

function BudgetGoalCard({
                            goal,
                            onSetGoal,
                        }: {
    goal: BudgetGoal;
    onSetGoal: () => void;
}) {
    const progressPercentage =
        goal.targetAmountInCents > 0
            ? Math.min(
                100,
                Math.round((goal.currentAmountInCents / goal.targetAmountInCents) * 100)
            )
            : 0;

    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-emerald-700">Budget Goal</p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {goal.name} to {formatCurrency(goal.targetAmountInCents)}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        You are currently contributing{" "}
                        {formatCurrency(goal.monthlyContributionInCents)}.
                    </p>
                </div>

                <button
                    onClick={onSetGoal}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                    Edit Goal
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
                {budgetItems.length === 0 ? (
                    <p className="text-gray-600">No budget items yet.</p>
                ) : (
                    budgetItems.map((item) => (
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
                    ))
                )}
            </div>
        </section>
    );
}

function EditIncomeModal({
                             initialAmountInCents,
                             isSaving,
                             onClose,
                             onSave,
                         }: {
    initialAmountInCents: number;
    isSaving: boolean;
    onClose: () => void;
    onSave: (amountInCents: number) => void;
}) {
    const [amount, setAmount] = useState(centsToRandInput(initialAmountInCents));

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!amount) return;

        onSave(randToCents(amount));
    }

    return (
        <Modal
            title="Edit Monthly Income"
            subtitle="Set your expected monthly income."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Monthly income"
                    value={amount}
                    onChange={setAmount}
                    placeholder="e.g. 48000"
                />

                <SubmitButton label={isSaving ? "Saving..." : "Save Income"} disabled={isSaving} />
            </form>
        </Modal>
    );
}

function AddBudgetItemModal({
                                isSaving,
                                onClose,
                                onAddItem,
                            }: {
    isSaving: boolean;
    onClose: () => void;
    onAddItem: (item: Omit<BudgetItem, "id">) => void;
}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<BudgetItemType>("EXPENSE");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !amount || !category) return;

        onAddItem({
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
                <ModalInput label="Name" value={name} onChange={setName} placeholder="e.g. Internet" />
                <ModalInput label="Amount" value={amount} onChange={setAmount} placeholder="e.g. 899" />
                <ModalInput label="Category" value={category} onChange={setCategory} placeholder="e.g. Bills" />

                <div>
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <select
                        value={type}
                        onChange={(event) => setType(event.target.value as BudgetItemType)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="EXPENSE">Expense</option>
                        <option value="SAVING">Saving</option>
                        <option value="DEBT">Debt</option>
                        <option value="INCOME">Income</option>
                    </select>
                </div>

                <SubmitButton label={isSaving ? "Saving..." : "Save Item"} disabled={isSaving} />
            </form>
        </Modal>
    );
}

function SetGoalModal({
                          initialGoal,
                          isSaving,
                          onClose,
                          onSetGoal,
                      }: {
    initialGoal: BudgetGoal;
    isSaving: boolean;
    onClose: () => void;
    onSetGoal: (goal: BudgetGoal) => void;
}) {
    const [goalName, setGoalName] = useState(initialGoal.name);
    const [targetAmount, setTargetAmount] = useState(centsToRandInput(initialGoal.targetAmountInCents));
    const [currentAmount, setCurrentAmount] = useState(centsToRandInput(initialGoal.currentAmountInCents));
    const [monthlyContribution, setMonthlyContribution] = useState(centsToRandInput(initialGoal.monthlyContributionInCents));

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!goalName || !targetAmount || !monthlyContribution) return;

        onSetGoal({
            id: initialGoal.id,
            name: goalName,
            targetAmountInCents: randToCents(targetAmount),
            currentAmountInCents: randToCents(currentAmount || "0"),
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
                <ModalInput label="Goal name" value={goalName} onChange={setGoalName} placeholder="e.g. Emergency Fund" />
                <ModalInput label="Target amount" value={targetAmount} onChange={setTargetAmount} placeholder="e.g. 5000" />
                <ModalInput label="Current amount" value={currentAmount} onChange={setCurrentAmount} placeholder="e.g. 2000" />
                <ModalInput label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="e.g. 1000" />

                <SubmitButton label={isSaving ? "Saving..." : "Save Goal"} disabled={isSaving} />
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
    const token = localStorage.getItem("moneymapToken");

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