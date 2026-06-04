"use client";

import AppShell from "@/components/AppShell";
import { useState } from "react";

type Goal = {
    name: string;
    target: string;
    current: string;
    progress: string;
};

type ComparisonItem = {
    label: string;
    value: string;
    highlight?: boolean;
};

const initialGoals: Goal[] = [
    { name: "Emergency Fund", target: "R30,000", current: "R12,000", progress: "40%" },
    { name: "Laptop Fund", target: "R70,000", current: "R18,000", progress: "26%" },
    { name: "December Holiday", target: "R10,000", current: "R4,500", progress: "45%" },
];

const comparisonItems: ComparisonItem[] = [
    { label: "Current monthly savings", value: "R2,000" },
    { label: "Target monthly savings", value: "R5,000" },
    { label: "Gap to close", value: "R3,000", highlight: true },
];

export default function GoalsPage() {
    const [goals, setGoals] = useState(initialGoals);
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [isSetGoalModalOpen, setIsSetGoalModalOpen] = useState(false);

    function handleAddGoal(goal: Goal) {
        setGoals((currentGoals) => [...currentGoals, goal]);
        setIsAddGoalModalOpen(false);
    }

    function handleSetComparisonGoal() {
        setIsSetGoalModalOpen(false);
    }

    return (
        <AppShell>
            <section>
                <PageHeader />

                <GoalComparison onSetGoal={() => setIsSetGoalModalOpen(true)} />

                <GoalsList
                    goals={goals}
                    onAddGoal={() => setIsAddGoalModalOpen(true)}
                />

                {isSetGoalModalOpen && (
                    <SetComparisonGoalModal
                        onClose={() => setIsSetGoalModalOpen(false)}
                        onSave={handleSetComparisonGoal}
                    />
                )}

                {isAddGoalModalOpen && (
                    <AddGoalModal
                        onClose={() => setIsAddGoalModalOpen(false)}
                        onAddGoal={handleAddGoal}
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

            <h1 className="mt-2 text-4xl font-bold">Goals</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Set financial goals and compare your current budget against your target.
            </p>
        </div>
    );
}

function GoalComparison({ onSetGoal }: { onSetGoal: () => void }) {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Budget vs Goal</h2>
                    <p className="mt-1 text-gray-600">
                        See how close your current budget is to your ideal plan.
                    </p>
                </div>

                <button
                    onClick={onSetGoal}
                    className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
                >
                    Set Goal
                </button>
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
                       onAddGoal,
                   }: {
    goals: Goal[];
    onAddGoal: () => void;
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

            <div className="space-y-4">
                {goals.map((goal) => (
                    <GoalItem key={`${goal.name}-${goal.target}`} goal={goal} />
                ))}
            </div>
        </section>
    );
}

function GoalItem({ goal }: { goal: Goal }) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold">{goal.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {goal.current} saved of {goal.target}
                    </p>
                </div>

                <p className="font-bold text-emerald-600">{goal.progress}</p>
            </div>

            <div className="mt-4 h-3 rounded-full bg-emerald-100">
                <div
                    className="h-3 rounded-full bg-emerald-600"
                    style={{ width: goal.progress }}
                />
            </div>
        </div>
    );
}

function AddGoalModal({
                          onClose,
                          onAddGoal,
                      }: {
    onClose: () => void;
    onAddGoal: (goal: Goal) => void;
}) {
    const [name, setName] = useState("");
    const [target, setTarget] = useState("");
    const [current, setCurrent] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !target || !current) return;

        const progress = calculateProgress(current, target);

        onAddGoal({
            name,
            target: formatRandAmount(target),
            current: formatRandAmount(current),
            progress,
        });
    }

    return (
        <Modal
            title="Add Goal"
            subtitle="Create a financial goal and track your progress."
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalInput
                    label="Goal name"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Emergency Fund"
                />

                <ModalInput
                    label="Target amount"
                    value={target}
                    onChange={setTarget}
                    placeholder="e.g. 30000"
                />

                <ModalInput
                    label="Current amount"
                    value={current}
                    onChange={setCurrent}
                    placeholder="e.g. 12000"
                />

                <SubmitButton label="Save Goal" />
            </form>
        </Modal>
    );
}

function SetComparisonGoalModal({
                                    onClose,
                                    onSave,
                                }: {
    onClose: () => void;
    onSave: () => void;
}) {
    const [currentSavings, setCurrentSavings] = useState("2000");
    const [targetSavings, setTargetSavings] = useState("5000");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!currentSavings || !targetSavings) return;

        onSave();
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
                    value={currentSavings}
                    onChange={setCurrentSavings}
                    placeholder="e.g. 2000"
                />

                <ModalInput
                    label="Target monthly savings"
                    value={targetSavings}
                    onChange={setTargetSavings}
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

function parseAmount(value: string) {
    return Number(value.replace("R", "").replace(",", "").trim());
}

function calculateProgress(current: string, target: string) {
    const currentAmount = parseAmount(current);
    const targetAmount = parseAmount(target);

    if (!currentAmount || !targetAmount) return "0%";

    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

    return `${Math.round(percentage)}%`;
}