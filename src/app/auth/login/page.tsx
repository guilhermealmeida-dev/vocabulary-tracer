import { AuthLayout } from "@/components/layout/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue tracking your vocabulary."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLinkHref="/register"
    >
      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-medium transition hover:bg-indigo-500"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}