import { AuthLayout } from "@/components/layout/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue tracking your vocabulary."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLinkHref="/auth/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}