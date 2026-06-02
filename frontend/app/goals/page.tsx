import AppShell from "@/components/AppShell";

export default function GoalsPage() {
    return (
        <AppShell>
            <section>
                <p className="text-sm font-medium text-emerald-700">
                    MoneyMap Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold">Goals</h1>

                <p className="mt-3 max-w-2xl text-gray-600">
                    Set financial goals and compare your current budget against your target.
                </p>
            </section>
        </AppShell>
    );
}