"use client";

import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useMemo, useState } from "react";
import { authenticatedFetch } from "@/lib/authenticatedFetch";

type BudgetItem = {
    id: string;
    name: string;
    category: string;
    amountInCents: number;
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
    goal: BudgetGoal | null;
};

type RecurringExpense = {
    id: string;
    name: string;
    category: string;
    amountInCents: number;
    frequency: string;
    nextPaymentDate: string;
};

type Goal = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    progressPercentage: number;
};

type CategoryBreakdown = {
    name: string;
    amountInCents: number;
    percentage: number;
};

export default function ReportsPage() {
    const [budget, setBudget] = useState<BudgetResponse | null>(null);
    const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadReportsData() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const [budgetResponse, recurringResponse, goalsResponse] =
                    await Promise.all([
                        authenticatedFetch("/api/v1/budget"),
                        authenticatedFetch("/api/v1/recurring-expenses"),
                        authenticatedFetch("/api/v1/goals"),
                    ]);

                if (!budgetResponse.ok || !recurringResponse.ok || !goalsResponse.ok) {
                    setErrorMessage("Could not load reports data.");
                    return;
                }

                const budgetData: BudgetResponse = await budgetResponse.json();
                const recurringData: RecurringExpense[] = await recurringResponse.json();
                const goalsData: Goal[] = await goalsResponse.json();

                setBudget(budgetData);
                setRecurringExpenses(recurringData);
                setGoals(goalsData);
            } finally {
                setIsLoading(false);
            }
        }

        loadReportsData();
    }, []);

    const report = useMemo(() => {
        const monthlyIncomeInCents = budget?.monthlyIncomeInCents ?? 0;

        const budgetItemsTotalInCents =
            budget?.items.reduce((total, item) => total + item.amountInCents, 0) ?? 0;

        const recurringTotalInCents = recurringExpenses.reduce(
            (total, expense) => total + expense.amountInCents,
            0
        );

        const expensesInCents = budgetItemsTotalInCents + recurringTotalInCents;

        const savingsAllocationInCents =
            budget?.goal?.monthlyContributionInCents ?? 0;

        const remainingCashInCents =
            monthlyIncomeInCents - expensesInCents - savingsAllocationInCents;

        const savingsRate =
            monthlyIncomeInCents > 0
                ? Math.round((savingsAllocationInCents / monthlyIncomeInCents) * 100)
                : 0;

        const goalTargetTotal = goals.reduce(
            (total, goal) => total + goal.targetAmount,
            0
        );

        const goalCurrentTotal = goals.reduce(
            (total, goal) => total + goal.currentAmount,
            0
        );

        const goalGap = goalTargetTotal - goalCurrentTotal;

        const categoryTotals = new Map<string, number>();

        budget?.items.forEach((item) => {
            categoryTotals.set(
                item.category,
                (categoryTotals.get(item.category) ?? 0) + item.amountInCents
            );
        });

        recurringExpenses.forEach((expense) => {
            categoryTotals.set(
                expense.category,
                (categoryTotals.get(expense.category) ?? 0) + expense.amountInCents
            );
        });

        const spendingBreakdown: CategoryBreakdown[] = Array.from(
            categoryTotals.entries()
        )
            .map(([name, amountInCents]) => ({
                name,
                amountInCents,
                percentage:
                    expensesInCents > 0
                        ? Math.round((amountInCents / expensesInCents) * 100)
                        : 0,
            }))
            .sort((a, b) => b.amountInCents - a.amountInCents);

        const largestCategory = spendingBreakdown[0];

        const insights = buildInsights({
            monthlyIncomeInCents,
            expensesInCents,
            savingsAllocationInCents,
            remainingCashInCents,
            savingsRate,
            largestCategory,
        });

        return {
            monthlyIncomeInCents,
            expensesInCents,
            savingsAllocationInCents,
            remainingCashInCents,
            savingsRate,
            spendingBreakdown,
            goalTargetTotal,
            goalCurrentTotal,
            goalGap,
            insights,
        };
    }, [budget, recurringExpenses, goals]);

    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    {isLoading && (
                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <p className="text-gray-600">Loading reports...</p>
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    {!isLoading && !errorMessage && (
                        <>
                            <ReportSummary report={report} />

                            <SpendingBreakdown
                                spendingBreakdown={report.spendingBreakdown}
                            />

                            <GoalsOverview report={report} />

                            <Insights insights={report.insights} />
                        </>
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

            <h1 className="mt-2 text-4xl font-bold">Reports</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                View summaries of your income, expenses, savings, and spending
                patterns.
            </p>
        </div>
    );
}

function ReportSummary({
                           report,
                       }: {
    report: {
        monthlyIncomeInCents: number;
        expensesInCents: number;
        savingsAllocationInCents: number;
        remainingCashInCents: number;
        savingsRate: number;
    };
}) {
    const summary = [
        {
            label: "Income",
            value: formatCents(report.monthlyIncomeInCents),
        },
        {
            label: "Expenses",
            value: formatCents(report.expensesInCents),
        },
        {
            label: "Savings",
            value: formatCents(report.savingsAllocationInCents),
            highlight: true,
        },
        {
            label: "Remaining Cash",
            value: formatCents(report.remainingCashInCents),
            danger: report.remainingCashInCents < 0,
        },
    ];

    return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">{item.label}</p>

                    <h2
                        className={`mt-2 text-3xl font-bold ${
                            item.highlight ? "text-emerald-600" : ""
                        } ${item.danger ? "text-red-600" : ""}`}
                    >
                        {item.value}
                    </h2>

                    {item.label === "Savings" && (
                        <p className="mt-2 text-sm text-gray-500">
                            {report.savingsRate}% of income
                        </p>
                    )}
                </div>
            ))}
        </section>
    );
}

function SpendingBreakdown({
                               spendingBreakdown,
                           }: {
    spendingBreakdown: CategoryBreakdown[];
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Spending Breakdown</h2>

                <p className="mt-1 text-gray-600">
                    See which categories take up the largest part of your monthly
                    spending.
                </p>
            </div>

            {spendingBreakdown.length === 0 ? (
                <p className="text-gray-500">
                    Add budget items or recurring expenses to see your spending
                    breakdown.
                </p>
            ) : (
                <div className="space-y-4">
                    {spendingBreakdown.map((category) => (
                        <div key={category.name}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="font-medium">{category.name}</span>
                                <span className="text-gray-500">
                                    {formatCents(category.amountInCents)} •{" "}
                                    {category.percentage}%
                                </span>
                            </div>

                            <div className="h-3 rounded-full bg-emerald-100">
                                <div
                                    className="h-3 rounded-full bg-emerald-600"
                                    style={{
                                        width: `${category.percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

function GoalsOverview({
                           report,
                       }: {
    report: {
        goalTargetTotal: number;
        goalCurrentTotal: number;
        goalGap: number;
    };
}) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Goals Overview</h2>

            <p className="mt-1 text-gray-600">
                Track how far you are from your savings goals.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <MiniCard label="Total Goal Target" value={formatRand(report.goalTargetTotal)} />
                <MiniCard label="Saved So Far" value={formatRand(report.goalCurrentTotal)} />
                <MiniCard label="Remaining Gap" value={formatRand(report.goalGap)} />
            </div>
        </section>
    );
}

function MiniCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
    );
}

function Insights({ insights }: { insights: string[] }) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Insights</h2>

            <p className="mt-1 text-gray-600">
                Simple observations based on your current financial picture.
            </p>

            <div className="mt-6 space-y-3">
                {insights.map((insight) => (
                    <div
                        key={insight}
                        className="rounded-2xl border border-gray-200 p-4 text-gray-700"
                    >
                        {insight}
                    </div>
                ))}
            </div>
        </section>
    );
}

function buildInsights({
                           monthlyIncomeInCents,
                           expensesInCents,
                           savingsAllocationInCents,
                           remainingCashInCents,
                           savingsRate,
                           largestCategory,
                       }: {
    monthlyIncomeInCents: number;
    expensesInCents: number;
    savingsAllocationInCents: number;
    remainingCashInCents: number;
    savingsRate: number;
    largestCategory?: CategoryBreakdown;
}) {
    const insights: string[] = [];

    if (monthlyIncomeInCents <= 0) {
        return [
            "Add your monthly income to unlock more useful reports.",
            "Add budget items and recurring expenses to see where your money goes.",
        ];
    }

    if (largestCategory) {
        insights.push(
            `${largestCategory.name} is your largest spending category at ${formatCents(
                largestCategory.amountInCents
            )}.`
        );
    }

    insights.push(
        `You are currently saving ${savingsRate}% of your monthly income.`
    );

    if (remainingCashInCents >= 0) {
        insights.push(
            `You have ${formatCents(
                remainingCashInCents
            )} remaining after expenses and savings.`
        );
    } else {
        insights.push(
            `Your plan is short by ${formatCents(
                Math.abs(remainingCashInCents)
            )}. Consider reducing expenses or savings allocation.`
        );
    }

    if (expensesInCents > monthlyIncomeInCents * 0.7) {
        insights.push(
            "Your expenses are taking up more than 70% of your income."
        );
    }

    if (savingsAllocationInCents === 0) {
        insights.push(
            "You have not allocated money toward savings yet."
        );
    }

    return insights;
}

function formatCents(amountInCents: number) {
    return formatRand(amountInCents / 100);
}

function formatRand(amount: number) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
        maximumFractionDigits: 0,
    }).format(amount);
}