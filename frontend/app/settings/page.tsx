import AppShell from "@/components/AppShell";

export default function SettingsPage() {
    return (
        <AppShell>
            <section>
                <p className="text-sm font-medium text-emerald-700">
                    MoneyMap Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold">Settings</h1>

                <p className="mt-3 max-w-2xl text-gray-600">
                    Manage your profile, currency, preferences, and account settings.
                </p>
            </section>
        </AppShell>
    );
}