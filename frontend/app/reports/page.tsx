import AppShell from "@/components/AppShell";

export default function ReportsPage() {
    return (
        <AppShell>
            <section>
                <p className="text-sm font-medium text-emerald-700">
                    MoneyMap Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold">Reports</h1>

                <p className="mt-3 max-w-2xl text-gray-600">
                    View summaries of your income, expenses, savings, and spending patterns.
                </p>
            </section>
        </AppShell>
    );
}