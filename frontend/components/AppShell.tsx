import Link from "next/link";

const navItems = [
    { label: "Budget", href: "/budget" },
    { label: "Recurring", href: "/recurring-expenses" },
    { label: "Goals", href: "/goals" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-emerald-50 pb-24 text-gray-950 md:pb-0">
            {/* Desktop / Tablet top nav */}
            <header className="hidden border-b border-emerald-100 bg-white md:block">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/budget" className="text-xl font-bold text-emerald-700">
                        MoneyMap
                    </Link>

                    <nav className="flex gap-6 text-sm font-medium text-gray-600">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition hover:text-emerald-700"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Mobile page title */}
            <header className="border-b border-emerald-100 bg-white px-6 py-4 md:hidden">
                <Link href="/budget" className="text-xl font-bold text-emerald-700">
                    MoneyMap
                </Link>
            </header>

            <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-100 bg-white md:hidden">
                <div className="grid grid-cols-5 text-xs font-medium text-gray-600">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center px-2 py-3 transition hover:text-emerald-700"
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </main>
    );
}