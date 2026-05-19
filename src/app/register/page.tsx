import RegisterForm from "@/components/register/RegisterForm";
import AnimatedBackground from "@/components/register/AnimatedBackground";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex
      items-center justify-center text-white">

      <AnimatedBackground />

      <div className="w-full max-w-md">
        <RegisterForm />
      </div>

    </main>
  );
}