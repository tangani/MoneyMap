import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6 py-12">
            <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-950">Welcome back</h1>
                <p className="mt-2 text-gray-600">
                    Log in to continue managing your MoneyMap.
                </p>

                <form className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-emerald-600"
                            placeholder="Enter your password"
                        />
                    </div>

                    <Link
                        href="/budget"
                        className="block w-full rounded-xl bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Log In
                    </Link>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    New to MoneyMap?{" "}
                    <Link href="/signup" className="font-semibold text-emerald-700">
                        Create account
                    </Link>
                </p>
            </section>
        </main>
    );
}