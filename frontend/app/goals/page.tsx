"use client";

import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";

type Goal = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    progressPercentage: number;
};

type GoalFormValues = {
    name: string;
    targetAmount: string;
    currentAmount: string;
};

type ComparisonItem = {
    label: string;
    value: string;
    highlight?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    const currentSavings = goals.reduce(
        (total, goal) => total + goal.currentAmount,
        0
    );

    const targetSavings = goals.reduce(
        (total, goal) => total + goal.targetAmount,
        0
    );

    const gapToClose = Math.max(targetSavings - currentSavings, 0);

    const comparisonItems: ComparisonItem[] = [
        {
            label: "Current savings",
            value: formatCurrency(currentSavings),
        },
        {
            label: "Target savings",
            value: formatCurrency(targetSavings),
        },
        {
            label: "Gap to close",
            value: formatCurrency(gapToClose),
            highlight: true,
        },
    ];

    async function fetchGoals() {
        const token = localStorage.getItem("token");

        if (!token) {
            setErrorMessage("You are not logged in.");
            setIsLoading(false);
            return;
        }

        try {
            setErrorMessage("");
            setIsLoading(true);

            const response = await fetch(`${API_URL}/api/v1/goals`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to load goals.");
            }

            const data: Goal[] = await response.json();
            setGoals(data);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchGoals();
    }, []);

    async function handleAddGoal(values: GoalFormValues) {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/v1/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: values.name,
                targetAmount: Number(values.targetAmount),
                currentAmount: Number(values.currentAmount),
            }),
        });

        if (!response.ok) {
            setErrorMessage("Failed to add goal.");
            return;
        }

        const createdGoal: Goal = await response.json();
        setGoals((currentGoals) => [...currentGoals, createdGoal]);
        setIsAddGoalModalOpen(false);
    }

    async function handleUpdateGoal(values: GoalFormValues) {
        if (!editingGoal) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/v1/goals/${editingGoal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: values.name,
                targetAmount: Number(values.targetAmount),
                currentAmount: Number(values.currentAmount),
            }),
        });

        if (!response.ok) {
            setErrorMessage("Failed to update goal.");
            return;
        }

        const updatedGoal: Goal = await response.json();

        setGoals((currentGoals) =>
            currentGoals.map((goal) =>
                goal.id === updatedGoal.id ? updatedGoal : goal
            )
        );

        setEditingGoal(null);
    }

    async function handleDeleteGoal(goalId: string) {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/v1/goals/${goalId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            setErrorMessage("Failed to delete goal.");
            return;
        }

        setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
    }

    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    {errorMessage && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    <GoalComparison comparisonItems={comparisonItems} />

                    <GoalsList
                        goals={goals}
                        isLoading={isLoading}
                        onAddGoal={() => setIsAddGoalModalOpen(true)}
                        onEditGoal={setEditingGoal}
                        onDeleteGoal={handleDeleteGoal}
                    />

                    {isAddGoalModalOpen && (
                        <GoalFormModal
                            title="Add Goal"
                            subtitle="Create a financial goal and track your progress."
                            submitLabel="Save Goal"
                            onClose={() => setIsAddGoalModalOpen(false)}
                            onSubmit={handleAddGoal}
                        />
                    )}

                    {editingGoal && (
                        <GoalFormModal
                            title="Edit Goal"
                            subtitle="Update your goal details."
                            submitLabel="Save Changes"
                            initialValues={{
                                name: editingGoal.name,
                                targetAmount: String(editingGoal.targetAmount),
                                currentAmount: String(editingGoal.currentAmount),
                            }}
                            onClose={() => setEditingGoal(null)}
                            onSubmit={handleUpdateGoal}
                        />
                    )}
                </section>
            </AppShell>
        </AuthGuard>
    );
}

function PageHeader() {
    return (
        <div className="mb-8">
            <p className="text-sm font-medium text-emerald-700">
                MoneyMap Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold">Goals</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Set financial goals and compare your current budget against your target.
            </p>
        </div>
    );
}

function GoalComparison({
                            comparisonItems,
                        }: {
    comparisonItems: ComparisonItem[];
}) {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Budget vs Goal</h2>
                    <p className="mt-1 text-gray-600">
                        See how close your current budget is to your ideal plan.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {comparisonItems.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-gray-200 p-4">
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p
                            className={`mt-2 text-2xl font-bold ${
                                item.highlight ? "text-emerald-600" : ""
                            }`}
                        >
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function GoalsList({
                       goals,
                       isLoading,
                       onAddGoal,
                       onEditGoal,
                       onDeleteGoal,
                   }: {
    goals: Goal[];
    isLoading: boolean;
    onAddGoal: () => void;
    onEditGoal: (goal: Goal) => void;
    onDeleteGoal: (goalId: string) => void;
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Your Goals</h2>
                    <p className="mt-1 text-gray-600">
                        Track progress toward the things you are building toward.
                    </p>
                </div>

                <button
                    onClick={onAddGoal}
                    className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
                >
                    Add Goal
                </button>
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading goals...</p>
            ) : goals.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
                    No goals yet. Add your first financial goal.
                </p>
            ) : (
                <div className="space-y-4">
                    {goals.map((goal) => (
                        <GoalItem
                            key={goal.id}
                            goal={goal}
                            onEdit={() => onEditGoal(goal)}
                            onDelete={() => onDeleteGoal(goal.id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function GoalItem({
                      goal,
                      onEdit,
                      onDelete,
                  }: {
    goal: Goal;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const progress = `${Math.min(goal.progressPercentage, 100)}%`;

    return (
        <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-semibold">{goal.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {formatCurrency(goal.currentAmount)} saved of{" "}
                        {formatCurrency(goal.targetAmount)}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <p className="font-bold text-emerald-600">{progress}</p>

                    <button
                        onClick={onEdit}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={onDelete}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="mt-4 h-3 rounded-full bg-emerald-100">
                <div
                    className="h-3 rounded-full bg-emerald-600"
                    style={{ width: progress }}
                />
            </div>
        </div>
    );
}

function GoalFormModal({
                           title,
                           subtitle,
                           submitLabel,
                           initialValues,
                           onClose,
                           onSubmit,
                       }: {
    title: string;
    subtitle: string;
    submitLabel: string;
    initialValues?: GoalFormValues;
    onClose: () => void;
    onSubmit: (values: GoalFormValues) => void;
}) {
    const [name, setName] = useState(initialValues?.name ?? "");
    const [targetAmount, setTargetAmount] = useState(initialValues?.targetAmount ?? "");
    const [currentAmount, setCurrentAmount] = useState(initialValues?.currentAmount ?? "");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !targetAmount || !currentAmount) return;

        onSubmit({
            name,
            targetAmount,
            currentAmount,
        });
    }

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Goal name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Emergency Fund"
                />

                <ModalInput
                    label="Target amount"
                    value={targetAmount}
                    onChange={setTargetAmount}
                    placeholder="e.g. 30000"
                />

                <ModalInput
                    label="Current amount"
                    value={currentAmount}
                    onChange={setCurrentAmount}
                    placeholder="e.g. 12000"
                />

                <SubmitButton label={submitLabel} />
            </form>
        </Modal>
    );
}

function SetComparisonGoalModal({
                                    currentSavings,
                                    targetSavings,
                                    onClose,
                                    onSave,
                                }: {
    currentSavings: string;
    targetSavings: string;
    onClose: () => void;
    onSave: (values: { currentSavings: string; targetSavings: string }) => void;
}) {
    const [currentSavingsValue, setCurrentSavingsValue] = useState(currentSavings);
    const [targetSavingsValue, setTargetSavingsValue] = useState(targetSavings);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!currentSavingsValue || !targetSavingsValue) return;

        onSave({
            currentSavings: currentSavingsValue,
            targetSavings: targetSavingsValue,
        });
    }

    return (
        <Modal
            title="Set Budget Comparison"
            subtitle="Compare your current monthly savings against your target."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Current monthly savings"
                    value={currentSavingsValue}
                    onChange={setCurrentSavingsValue}
                    placeholder="e.g. 2000"
                />

                <ModalInput
                    label="Target monthly savings"
                    value={targetSavingsValue}
                    onChange={setTargetSavingsValue}
                    placeholder="e.g. 5000"
                />

                <SubmitButton label="Save Comparison" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-start justify-between gap-4">
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
                        type = "text",
                    }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                type={type}
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

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
        maximumFractionDigits: 0,
    }).format(value);
}