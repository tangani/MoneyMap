import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";

const preferenceItems = [
    { label: "Currency", value: "South African Rand (ZAR)" },
    { label: "Monthly budget cycle", value: "1st day of every month" },
    { label: "Notifications", value: "Upcoming payments and goal reminders" },
];

const accountItems = [
    { label: "Full name", value: "Molisa Moyo" },
    { label: "Email", value: "molisa@example.com" },
    { label: "Account type", value: "Personal" },
];

export default function SettingsPage() {
    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    <ProfileSettings />

                    <Preferences />

                    <AccountActions />
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

            <h1 className="mt-2 text-4xl font-bold">Settings</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Manage your profile, currency, preferences, and account settings.
            </p>
        </div>
    );
}

function ProfileSettings() {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <p className="mt-1 text-gray-600">
                        Basic information linked to your MoneyMap account.
                    </p>
                </div>

                <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                    Edit
                </button>
            </div>

            <div className="space-y-4">
                {accountItems.map((item) => (
                    <SettingsRow key={item.label} label={item.label} value={item.value} />
                ))}
            </div>
        </section>
    );
}

function Preferences() {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Preferences</h2>
                <p className="mt-1 text-gray-600">
                    Control how MoneyMap tracks and presents your money.
                </p>
            </div>

            <div className="space-y-4">
                {preferenceItems.map((item) => (
                    <SettingsRow key={item.label} label={item.label} value={item.value} />
                ))}
            </div>
        </section>
    );
}

function AccountActions() {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Account</h2>

            <p className="mt-1 text-gray-600">
                Manage account access and security options.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
                    Change Password
                </button>

                <button className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50">
                    Delete Account
                </button>
            </div>
        </section>
    );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4">
            <p className="font-medium">{label}</p>
            <p className="text-right text-sm text-gray-500">{value}</p>
        </div>
    );
}