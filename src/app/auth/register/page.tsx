import { AuthLayout } from "@/components/layout/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Start organizing and tracking your English vocabulary."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/auth/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}