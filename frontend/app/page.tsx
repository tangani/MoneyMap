import Link from "next/link";

const features = [
  {
    title: "Budget",
    description:
        "Create monthly budgets for bills, groceries, transport, savings, and personal spending.",
  },
  {
    title: "Recurring Payments",
    description:
        "Track subscriptions, debit orders, rent, policies, and other repeating expenses.",
  },
  {
    title: "Goals",
    description:
        "Set savings goals and monitor your progress toward things that matter.",
  },
  {
    title: "Spending Insights",
    description:
        "Understand where your money goes and spot patterns before they become problems.",
  },
  {
    title: "Debt Tracking",
    description:
        "Keep an eye on repayments and plan how to reduce debt over time.",
  },
  {
    title: "Reports",
    description:
        "View simple summaries of your monthly income, expenses, and progress.",
  },
];

export default function Home() {
  return (
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
            <p className="mb-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              Personal budgeting made simple
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              Map your money before it disappears.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              MoneyMap helps you understand your income, expenses, savings, and
              spending habits in one simple place.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                  href="/signup"
                  className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Get Started
              </Link>

              <Link
                  href="/about"
                  className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why MoneyMap?</h2>
            <p className="mt-4 text-gray-600">
              A practical tool for everyday money decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {feature.description}
                  </p>
                </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">
              Take control of your money journey.
            </h2>

            <p className="mt-4 text-gray-300">
              Start with a simple budget. Grow into smarter financial planning.
            </p>

            <Link
                href="/signup"
                className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Start Mapping
            </Link>
          </div>
        </section>
      </main>
  );
}