const recurringExpenses = [
    { name: "Rent", amount: "R7,500", frequency: "Monthly", nextDate: "1 June" },
    { name: "Netflix", amount: "R199", frequency: "Monthly", nextDate: "15 June" },
    { name: "Car Insurance", amount: "R850", frequency: "Monthly", nextDate: "25 June" },
    { name: "Gym", amount: "R350", frequency: "Monthly", nextDate: "28 June" },
];

export default function RecurringExpensesPage() {
    return (
        <main className="min-h-screen bg-emerald-50 px-6 py-8 text-gray-950">
            <section className="mx-auto max-w-6xl">
                <p className="text-sm font-medium text-emerald-700">
                    MoneyMap Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold">Recurring Expenses</h1>

                <p className="mt-3 max-w-2xl text-gray-600">
                    Track subscriptions, debit orders, rent, insurance, and other repeated payments.
                </p>

                <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Upcoming Payments</h2>
                            <p className="mt-1 text-gray-600">
                                Know what is coming before it surprises you.
                            </p>
                        </div>

                        <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
                            Add Payment
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recurringExpenses.map((expense) => (
                            <div
                                key={expense.name}
                                className="rounded-2xl border border-gray-200 p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{expense.name}</h3>
                                    <p className="font-bold">{expense.amount}</p>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    {expense.frequency} • Next payment: {expense.nextDate}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </main>
    );
}