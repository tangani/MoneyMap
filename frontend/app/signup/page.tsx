"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    const passwordsDoNotMatch =
        confirmPassword.length > 0 && password !== confirmPassword;

    const formIsValid =
        name.trim().length > 0 &&
        surname.trim().length > 0 &&
        email.trim().length > 0 &&
        passwordsMatch;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formIsValid) return;

        const newUser = {
            name,
            surname,
            email,
        };

        localStorage.setItem("moneymap_user", JSON.stringify(newUser));

        console.log("User saved:", newUser);
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
                        <label className="text-sm font-medium text-gray-700">
                            Full name
                        </label>

                        <input
                            type="text"
                            placeholder="John"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Surname
                        </label>

                        <input
                            type="text"
                            placeholder="Doe"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
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
                        disabled={!formIsValid}
                        className={`w-full rounded-xl px-6 py-3 font-semibold text-white transition ${
                            formIsValid
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "cursor-not-allowed bg-gray-400"
                        }`}
                    >
                        Create Account
                    </button>
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