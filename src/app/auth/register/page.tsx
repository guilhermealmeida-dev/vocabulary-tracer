import { AuthLayout } from "@/components/layout/auth-layout";
import { GuestGuard } from "@/components/layout/guest-guard";
import { RegisterForm } from "@/features/auth/register/register-form";

export const instant = false;

export default function RegisterPage() {
  return (
    <GuestGuard>
      <AuthLayout
        title="Create your account"
        description="Start organizing and tracking your English vocabulary."
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkHref="/auth/login"
      >
        <RegisterForm />
      </AuthLayout>{" "}
    </GuestGuard>
  );
}
