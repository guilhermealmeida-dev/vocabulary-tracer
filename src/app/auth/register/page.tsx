import { AuthLayout } from "@/components/layout/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Start organizing and tracking your English vocabulary."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>

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
            placeholder="Create a password"
            required
            minLength={8}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-medium transition hover:bg-indigo-500"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}