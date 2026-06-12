"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const formIsValid = email.trim().length > 0 && password.trim().length > 0;
    const router = useRouter();

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!formIsValid) return;

        setErrorMessage("");
        setIsLoading(true);

        try {
            const loginRequest = {
                email: email.trim(),
                password,
            };

            const response = await fetch(
                "https://moneymap-backend-l90f.onrender.com/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginRequest),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Login failed:", response.status, errorText);
                setErrorMessage("Invalid email or password.");
                return;
            }

            const loginResponse = await response.json();

            localStorage.setItem("moneymapToken", loginResponse.token);

            console.log("Login successful:", loginResponse);

            router.push("/budget");

        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage(
                "Could not connect to the server. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6 py-12">
            <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-950">
                    Welcome back
                </h1>

                <p className="mt-2 text-gray-600">
                    Log in to continue managing your MoneyMap.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-emerald-600"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-emerald-600"
                            placeholder="Enter your password"
                        />
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
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    New to MoneyMap?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-emerald-700"
                    >
                        Create account
                    </Link>
                </p>
            </section>
        </main>
    );
}