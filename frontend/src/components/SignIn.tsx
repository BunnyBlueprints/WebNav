import { Mail, Lock, Eye, EyeOff, GitBranch, ShieldCheck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: (payload: { email: string; password: string }) => Promise<void>;
  onCreateAccount: () => void;
  onBack: () => void;
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
}

export default function LoginScreen({
  onLogin,
  onCreateAccount,
  onBack,
  onGoogleLogin,
  onGitHubLogin,
}: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await onLogin({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7ff]">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7e5ff] blur-[130px]"></div>

        <div className="z-10 w-full max-w-[440px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary">
              WebNav
            </h1>
            <p className="mt-2 font-medium text-slate-500">Architect your digital workspace.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-[22px] border border-white/80 bg-white p-8 shadow-[0_24px_65px_rgba(0,72,141,0.12)] md:p-10">
              <button
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-blue-700"
                type="button"
                onClick={onBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </button>

              <div className="mb-10 text-center md:text-left">
                <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tight text-slate-900">Welcome Back</h1>
                <p className="text-sm font-medium text-slate-500">Please enter your details to access your dashboard.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="ml-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      className="w-full rounded-xl border border-[#e6edf8] bg-[#f5f8fe] py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 transition-all placeholder:text-slate-400 focus:border-[#bfd3f5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#dce8fb]"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600" htmlFor="password">
                      Password
                    </label>
                    <a className="text-xs font-bold text-primary transition-colors hover:text-blue-700 hover:underline" href="#">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      className="w-full rounded-xl border border-[#e6edf8] bg-[#f5f8fe] py-3.5 pl-11 pr-11 text-sm font-medium text-slate-700 transition-all placeholder:text-slate-400 focus:border-[#bfd3f5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#dce8fb]"
                      id="password"
                      name="password"
                      placeholder="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <button
                        className="text-slate-400 transition-colors hover:text-slate-600"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center px-1">
                  <input
                    className="h-4 w-4 rounded border-slate-300 bg-white text-primary focus:ring-2 focus:ring-[#dce8fb] focus:ring-offset-0"
                    id="remember"
                    name="remember"
                    type="checkbox"
                  />
                  <label className="ml-2.5 text-sm font-medium text-slate-500" htmlFor="remember">
                    Keep me signed in
                  </label>
                </div>

                <button
                  className="w-full rounded-xl bg-primary py-4 font-headline font-bold text-white shadow-[0_10px_24px_rgba(0,72,141,0.22)] transition-all hover:bg-[#0057ab] hover:shadow-[0_14px_28px_rgba(0,72,141,0.28)] active:scale-[0.98]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In to WebNav'}
                </button>

                {errorMessage ? (
                  <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                ) : null}
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-4 font-bold uppercase tracking-[0.18em] text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-slate-700 transition-colors hover:bg-[#edf3fd]"
                  type="button"
                  onClick={onGoogleLogin}
                >
                  <img
                    alt="Google"
                    className="h-5 w-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgOKZwxr0TIy_gBcAe9VZiRlYc31L-6Fc2m6ZUaXV6bjlryst27KfLjQHjpFTeu2xf3fF3hld_joDQmNYIMaKdT88qouc1uOxqhtnmThkzDCxKVCh6THCn1mzpeLcPVnCuGZSVCE34igNHU3L9WyvnLaCoLksGA5rez5K9avl3WLqAR6MePyIbWzkhLIIbZHjXFlc1Z0St5e-JfP0xm2ABR_T1ZLMgA3yV4hx7OgoaOJVP6q5fSjwPLHQHqZa5WIUcbWou_muhEjE"
                  />
                  <span className="text-sm font-bold">Google</span>
                </button>
                <button
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-slate-700 transition-colors hover:bg-[#edf3fd]"
                  type="button"
                  onClick={onGitHubLogin}
                >
                  <GitBranch className="h-5 w-5" />
                  <span className="text-sm font-bold">GitHub</span>
                </button>
              </div>

              <div className="mt-10 border-t border-slate-100 pt-8 text-center">
                <p className="text-sm font-medium text-slate-500">
                  Don't have an account yet?
                  <button
                    className="ml-1 font-bold text-primary hover:underline underline-offset-4"
                    type="button"
                    onClick={onCreateAccount}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure 256-bit AES</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">SOC2 Type II Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
