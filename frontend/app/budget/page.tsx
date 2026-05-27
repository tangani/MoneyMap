export default function BudgetPage() {
    const budgetItems = [
        { name: "Rent", amount: "R7,500", category: "Bills" },
        { name: "Groceries", amount: "R3,000", category: "Essentials" },
        { name: "Transport", amount: "R1,500", category: "Essentials" },
        { name: "Savings", amount: "R2,000", category: "Goals" },
    ];

    return (
        <main className="min-h-screen bg-emerald-50 px-6 py-8 text-gray-950">
            <section className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <p className="text-sm font-medium text-emerald-700">
                        MoneyMap Dashboard
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Your Budget
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-600">
                        Plan your monthly income, expenses, savings, and goals in one place.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Monthly Income</p>
                        <h2 className="mt-2 text-3xl font-bold">R48,000</h2>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Planned Expenses</p>
                        <h2 className="mt-2 text-3xl font-bold">R12,000</h2>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Remaining</p>
                        <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                            R36,000
                        </h2>
                    </div>
                </div>

                <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Budget Goal</p>

                            <h2 className="mt-2 text-2xl font-bold">
                                Increase monthly savings to R5,000
                            </h2>

                            <p className="mt-2 text-gray-600">
                                You are currently saving R2,000. Adjust your planned budget to close the
                                R3,000 gap.
                            </p>
                        </div>

                        <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
                            Set Goal
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm text-gray-600">
                            <span>Current: R2,000</span>
                            <span>Target: R5,000</span>
                        </div>

                        <div className="h-3 rounded-full bg-emerald-100">
                            <div className="h-3 w-2/5 rounded-full bg-emerald-600" />
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Budget Items</h2>
                            <p className="mt-1 text-gray-600">
                                A simple overview of your planned spending.
                            </p>
                        </div>

                        <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                            Add Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {budgetItems.map((item) => (
                            <div
                                key={item.name}
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
            </section>
        </main>
    );
}