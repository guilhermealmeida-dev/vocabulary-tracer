import { AuthLayout } from "@/components/layout/auth-layout";
import { GuestGuard } from "@/components/layout/guest-guard";
import { LoginForm } from "@/features/auth/login/login-form";

export const instant = false;

export default function LoginPage() {
  return (
     <GuestGuard>
      <AuthLayout
      title="Welcome back"
      description="Sign in to continue tracking your vocabulary."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLinkHref="/auth/register"
    >
      <LoginForm />
    </AuthLayout>
    </GuestGuard>
  
  );
}