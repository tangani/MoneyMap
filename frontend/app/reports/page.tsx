import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";

const reportSummary = [
    { label: "Income", value: "R48,000" },
    { label: "Expenses", value: "R12,000" },
    { label: "Savings", value: "R2,000", highlight: true },
];

const spendingCategories = [
    { name: "Rent", amount: "R7,500", percentage: "63%" },
    { name: "Groceries", amount: "R3,000", percentage: "25%" },
    { name: "Transport", amount: "R1,500", percentage: "12%" },
];

const insights = [
    "Rent is your largest monthly expense.",
    "You are currently saving 4% of your income.",
    "Increasing savings to R5,000 would improve your savings rate to 10%.",
];

export default function ReportsPage() {
    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    <ReportSummary />

                    <SpendingBreakdown />

                    <Insights />
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
                View summaries of your income, expenses, savings, and spending patterns.
            </p>
        </div>
    );
}

function ReportSummary() {
    return (
        <section className="grid gap-6 md:grid-cols-3">
            {reportSummary.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">{item.label}</p>

                    <h2
                        className={`mt-2 text-3xl font-bold ${
                            item.highlight ? "text-emerald-600" : ""
                        }`}
                    >
                        {item.value}
                    </h2>
                </div>
            ))}
        </section>
    );
}

function SpendingBreakdown() {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Spending Breakdown</h2>

                <p className="mt-1 text-gray-600">
                    See which categories take up the largest part of your budget.
                </p>
            </div>

            <div className="space-y-4">
                {spendingCategories.map((category) => (
                    <div key={category.name}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-gray-500">
                {category.amount} • {category.percentage}
              </span>
                        </div>

                        <div className="h-3 rounded-full bg-emerald-100">
                            <div
                                className="h-3 rounded-full bg-emerald-600"
                                style={{ width: category.percentage }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Insights() {
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