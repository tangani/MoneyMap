"use client";

import AppShell from "@/components/AppShell";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type AccountType = "PERSONAL" | "PREMIUM" | "BUSINESS";
type AccountStatus = "ACTIVE" | "DELETION_REQUESTED" | "DISABLED";
type CurrencyCode = "ZAR" | "USD" | "EUR" | "GBP";

type SettingsResponse = {
    profile: {
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        accountType: AccountType;
    };
    preferences: {
        currency: CurrencyCode;
        monthlyBudgetCycleDay: number;
        notificationsEnabled: boolean;
    };
    account: {
        accountStatus: AccountStatus;
        deletionRequested: boolean;
    };
};

export default function SettingsPage() {
    const router = useRouter();

    const [settings, setSettings] = useState<SettingsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [currency, setCurrency] = useState<CurrencyCode>("ZAR");
    const [monthlyBudgetCycleDay, setMonthlyBudgetCycleDay] = useState(1);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetchSettings();
    }, []);

    async function authenticatedFetch(path: string, options: RequestInit = {}) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers || {}),
            },
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            router.push("/login");
        }

        return response;
    }

    async function fetchSettings() {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await authenticatedFetch("/api/v1/settings");

            if (!response.ok) {
                setErrorMessage("Could not load settings.");
                return;
            }

            const data: SettingsResponse = await response.json();

            setSettings(data);
            setFirstName(data.profile.firstName);
            setLastName(data.profile.lastName);
            setEmail(data.profile.email);
            setCurrency(data.preferences.currency);
            setMonthlyBudgetCycleDay(data.preferences.monthlyBudgetCycleDay);
            setNotificationsEnabled(data.preferences.notificationsEnabled);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveProfile() {
        try {
            setIsSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await authenticatedFetch("/api/v1/settings/profile", {
                method: "PUT",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                }),
            });

            if (!response.ok) {
                setErrorMessage("Could not update profile.");
                return;
            }

            const updatedSettings: SettingsResponse = await response.json();
            setSettings(updatedSettings);
            setIsEditingProfile(false);
            setSuccessMessage("Profile updated successfully.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleSavePreferences() {
        try {
            setIsSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await authenticatedFetch("/api/v1/settings/preferences", {
                method: "PUT",
                body: JSON.stringify({
                    currency,
                    monthlyBudgetCycleDay,
                    notificationsEnabled,
                }),
            });

            if (!response.ok) {
                setErrorMessage("Could not update preferences.");
                return;
            }

            const updatedSettings: SettingsResponse = await response.json();
            setSettings(updatedSettings);
            setIsEditingPreferences(false);
            setSuccessMessage("Preferences updated successfully.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleChangePassword() {
        try {
            setIsSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await authenticatedFetch("/api/v1/settings/password", {
                method: "PUT",
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                setErrorMessage(
                    errorData?._embedded?.errors?.[0]?.message ||
                    errorData?.message ||
                    "Could not change password."
                );
                return;
            }

            setCurrentPassword("");
            setNewPassword("");
            setIsChangingPassword(false);
            setSuccessMessage("Password changed successfully.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDeleteRequest() {
        const confirmed = window.confirm(
            "This will mark your account for deletion. Your data will be kept for now. Continue?"
        );

        if (!confirmed) return;

        try {
            setIsSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await authenticatedFetch("/api/v1/settings/delete-request", {
                method: "POST",
            });

            if (!response.ok) {
                setErrorMessage("Could not request account deletion.");
                return;
            }

            const updatedSettings: SettingsResponse = await response.json();
            setSettings(updatedSettings);
            setSuccessMessage("Account deletion request recorded.");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <AuthGuard>
                <AppShell>
                    <p className="text-gray-600">Loading settings...</p>
                </AppShell>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <AppShell>
                <section>
                    <PageHeader />

                    {errorMessage && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                            {successMessage}
                        </div>
                    )}

                    {settings && (
                        <>
                            <ProfileSettings
                                settings={settings}
                                isEditing={isEditingProfile}
                                isSaving={isSaving}
                                firstName={firstName}
                                lastName={lastName}
                                email={email}
                                setFirstName={setFirstName}
                                setLastName={setLastName}
                                setEmail={setEmail}
                                onEdit={() => setIsEditingProfile(true)}
                                onCancel={() => setIsEditingProfile(false)}
                                onSave={handleSaveProfile}
                            />

                            <Preferences
                                settings={settings}
                                isEditing={isEditingPreferences}
                                isSaving={isSaving}
                                currency={currency}
                                monthlyBudgetCycleDay={monthlyBudgetCycleDay}
                                notificationsEnabled={notificationsEnabled}
                                setCurrency={setCurrency}
                                setMonthlyBudgetCycleDay={setMonthlyBudgetCycleDay}
                                setNotificationsEnabled={setNotificationsEnabled}
                                onEdit={() => setIsEditingPreferences(true)}
                                onCancel={() => setIsEditingPreferences(false)}
                                onSave={handleSavePreferences}
                            />

                            <AccountActions
                                settings={settings}
                                isSaving={isSaving}
                                isChangingPassword={isChangingPassword}
                                currentPassword={currentPassword}
                                newPassword={newPassword}
                                setCurrentPassword={setCurrentPassword}
                                setNewPassword={setNewPassword}
                                onShowPasswordForm={() => setIsChangingPassword(true)}
                                onCancelPasswordForm={() => setIsChangingPassword(false)}
                                onChangePassword={handleChangePassword}
                                onDeleteRequest={handleDeleteRequest}
                            />
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

            <h1 className="mt-2 text-4xl font-bold">Settings</h1>

            <p className="mt-3 max-w-2xl text-gray-600">
                Manage your profile, currency, preferences, and account settings.
            </p>
        </div>
    );
}

function ProfileSettings({
                             settings,
                             isEditing,
                             isSaving,
                             firstName,
                             lastName,
                             email,
                             setFirstName,
                             setLastName,
                             setEmail,
                             onEdit,
                             onCancel,
                             onSave,
                         }: any) {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <p className="mt-1 text-gray-600">
                        Basic information linked to your MoneyMap account.
                    </p>
                </div>

                {!isEditing && (
                    <button onClick={onEdit} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <Input label="First name" value={firstName} onChange={setFirstName} />
                    <Input label="Last name" value={lastName} onChange={setLastName} />
                    <Input label="Email" value={email} onChange={setEmail} />

                    <div className="flex gap-3">
                        <button onClick={onSave} disabled={isSaving} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
                            Save
                        </button>
                        <button onClick={onCancel} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <SettingsRow label="Full name" value={settings.profile.fullName} />
                    <SettingsRow label="Email" value={settings.profile.email} />
                    <SettingsRow label="Account type" value={formatEnum(settings.profile.accountType)} />
                </div>
            )}
        </section>
    );
}

function Preferences({
                         settings,
                         isEditing,
                         isSaving,
                         currency,
                         monthlyBudgetCycleDay,
                         notificationsEnabled,
                         setCurrency,
                         setMonthlyBudgetCycleDay,
                         setNotificationsEnabled,
                         onEdit,
                         onCancel,
                         onSave,
                     }: any) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Preferences</h2>
                    <p className="mt-1 text-gray-600">
                        Control how MoneyMap tracks and presents your money.
                    </p>
                </div>

                {!isEditing && (
                    <button onClick={onEdit} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Currency</span>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 p-3">
                            <option value="ZAR">South African Rand (ZAR)</option>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">British Pound (GBP)</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Monthly budget cycle day</span>
                        <input
                            type="number"
                            min={1}
                            max={28}
                            value={monthlyBudgetCycleDay}
                            onChange={(e) => setMonthlyBudgetCycleDay(Number(e.target.value))}
                            className="mt-2 w-full rounded-xl border border-gray-300 p-3"
                        />
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                        />
                        <span className="font-medium">Enable notifications</span>
                    </label>

                    <div className="flex gap-3">
                        <button onClick={onSave} disabled={isSaving} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
                            Save
                        </button>
                        <button onClick={onCancel} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <SettingsRow label="Currency" value={formatCurrency(settings.preferences.currency)} />
                    <SettingsRow label="Monthly budget cycle" value={`${settings.preferences.monthlyBudgetCycleDay}${ordinalSuffix(settings.preferences.monthlyBudgetCycleDay)} day of every month`} />
                    <SettingsRow label="Notifications" value={settings.preferences.notificationsEnabled ? "Enabled" : "Disabled"} />
                </div>
            )}
        </section>
    );
}

function AccountActions({
                            settings,
                            isSaving,
                            isChangingPassword,
                            currentPassword,
                            newPassword,
                            setCurrentPassword,
                            setNewPassword,
                            onShowPasswordForm,
                            onCancelPasswordForm,
                            onChangePassword,
                            onDeleteRequest,
                        }: any) {
    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Account</h2>

            <p className="mt-1 text-gray-600">
                Manage account access and security options.
            </p>

            <div className="mt-6 space-y-4">
                <SettingsRow label="Account status" value={formatEnum(settings.account.accountStatus)} />

                {isChangingPassword ? (
                    <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
                        <Input label="Current password" value={currentPassword} onChange={setCurrentPassword} type="password" />
                        <Input label="New password" value={newPassword} onChange={setNewPassword} type="password" />

                        <div className="flex gap-3">
                            <button onClick={onChangePassword} disabled={isSaving} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
                                Save Password
                            </button>

                            <button onClick={onCancelPasswordForm} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button onClick={onShowPasswordForm} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
                            Change Password
                        </button>

                        <button onClick={onDeleteRequest} disabled={isSaving || settings.account.deletionRequested} className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50">
                            {settings.account.deletionRequested ? "Deletion Requested" : "Delete Account"}
                        </button>
                    </div>
                )}
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

function Input({
                   label,
                   value,
                   onChange,
                   type = "text",
               }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
        </label>
    );
}

function formatEnum(value: string) {
    return value
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatCurrency(currency: CurrencyCode) {
    const currencies: Record<CurrencyCode, string> = {
        ZAR: "South African Rand (ZAR)",
        USD: "US Dollar (USD)",
        EUR: "Euro (EUR)",
        GBP: "British Pound (GBP)",
    };

    return currencies[currency];
}

function ordinalSuffix(day: number) {
    if (day === 1 || day === 21) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
}