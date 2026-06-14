"use client";

import Link from "next/link";
import { useState } from "react";

const API_BASE_URL = "https://moneymap-backend-l90f.onrender.com";

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    const passwordsDoNotMatch =
        confirmPassword.length > 0 && password !== confirmPassword;

    const formIsValid =
        firstName.trim().length > 0 &&
        surname.trim().length > 0 &&
        email.trim().length > 0 &&
        passwordsMatch;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formIsValid) return;

        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            const signupRequest = {
                firstName: firstName.trim(),
                lastName: surname.trim(),
                email: email.trim(),
                password,
            };

            const response = await fetch(
                `${API_BASE_URL}/api/v1/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupRequest),
                }
            );

            if (!response.ok) {
                let backendMessage = "Signup failed. Please try again.";

                try {
                    const errorData = await response.json();

                    backendMessage =
                        errorData?._embedded?.errors?.[0]?.message ||
                        errorData?.message ||
                        backendMessage;
                } catch {
                    const errorText = await response.text();
                    backendMessage = errorText || backendMessage;
                }

                setErrorMessage(backendMessage);
                return;
            }

            setSuccessMessage("Account created successfully. You can now log in.");

            setFirstName("");
            setSurname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("Could not connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6 py-12">
            <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-950">
                    Create account
                </h1>

                <p className="mt-2 text-gray-600">
                    Start mapping your money with MoneyMap.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First name
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            autoComplete="given-name"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="surname" className="text-sm font-medium text-gray-700">
                            Surname
                        </label>

                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            required
                            autoComplete="family-name"
                            placeholder="Doe"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                            Confirm password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mt-2 w-full rounded-xl border px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:ring-2 ${
                                passwordsDoNotMatch
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-200"
                            }`}
                        />

                        {passwordsDoNotMatch && (
                            <p className="mt-2 text-sm text-red-500">
                                Passwords do not match.
                            </p>
                        )}

                        {passwordsMatch && (
                            <p className="mt-2 text-sm text-emerald-600">
                                Passwords match ✓
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!formIsValid || isLoading}
                        className={`w-full rounded-xl px-6 py-3 font-semibold text-white transition ${
                            formIsValid && !isLoading
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "cursor-not-allowed bg-gray-400"
                        }`}
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </button>

                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    {successMessage && (
                        <p className="text-sm text-emerald-600">{successMessage}</p>
                    )}
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-emerald-700">
                        Log in
                    </Link>
                </p>
            </section>
        </main>
    );
}