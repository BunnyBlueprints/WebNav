import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, GitBranch, HelpCircle, Shield, Activity, ArrowLeft } from 'lucide-react';

interface SignupProps {
  onCreateAccount: (payload: { name: string; email: string; password: string }) => Promise<void>;
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
  onSignIn: () => void;
  onBack: () => void;
}

export default function Signup({
  onCreateAccount,
  onGoogleLogin,
  onGitHubLogin,
  onSignIn,
  onBack,
}: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await onCreateAccount({
        name: String(formData.get('full_name') ?? ''),
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f4f7ff] px-6 py-12">
      <div className="fixed bottom-0 left-0 -z-10 h-1/3 w-full pointer-events-none opacity-40">
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#d9e7ff] blur-[110px]" />
        <div className="absolute bottom-24 right-0 h-64 w-64 rounded-full bg-[#cfe1ff] blur-[90px]" />
      </div>

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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[480px] rounded-[22px] border border-white/80 bg-white p-8 shadow-[0_24px_65px_rgba(0,72,141,0.12)] lg:p-10"
      >
        <button
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-blue-700"
          type="button"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>

        <header className="mb-8">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900">Join the community</h2>
          <p className="mt-1 text-sm text-slate-500">Start organizing your workflow today.</p>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group flex items-center justify-center gap-3 rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#edf3fd]"
            type="button"
            onClick={onGoogleLogin}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpgNkgrkaUbunPz1Ds7oFfWcNb7SFt0MFqnwMJLX83v2gGcs3FqiMSyCKLX7wEcQDMDYhIVR_nT8kiNc2sIECpU7vOtMw6WptrT3UMHiTCE4wJymjgTR7SVWBC1EiZZCTlJQ-vOfFA6eEhJQM47sQZiKgCfszsON61JYJsI_s2RjOXbCsbVHrHXbRscV8hht5Bhtg7G-0nXO2z4OehvSHCYaUszQpfuajD0xlaBuYwihR11RFuLPX58ItQd0LCphJ5Q0-5jn4zD0"
              alt="Google"
              className="h-5 w-5"
              referrerPolicy="no-referrer"
            />
            Google
          </button>
          <button
            className="flex items-center justify-center gap-3 rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#edf3fd]"
            type="button"
            onClick={onGitHubLogin}
          >
            <GitBranch className="h-5 w-5" />
            GitHub
          </button>
        </div>

        <div className="relative mb-8 flex items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Or with email</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-600" htmlFor="full_name">
              Full Name
            </label>
            <input
              className="w-full rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 outline-none focus:border-[#bfd3f5] focus:bg-white focus:ring-4 focus:ring-[#dce8fb]"
              id="full_name"
              name="full_name"
              placeholder="Alex Morgan"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-600" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 outline-none focus:border-[#bfd3f5] focus:bg-white focus:ring-4 focus:ring-[#dce8fb]"
              id="email"
              name="email"
              placeholder="alex@company.com"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-600" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-[#e6edf8] bg-[#f5f8fe] px-4 py-3 pr-12 text-sm text-slate-700 transition-all placeholder:text-slate-400 outline-none focus:border-[#bfd3f5] focus:bg-white focus:ring-4 focus:ring-[#dce8fb]"
                id="password"
                name="password"
                placeholder="password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <div className="flex h-5 items-center">
              <input
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-2 focus:ring-[#dce8fb]"
                id="terms"
                name="terms"
                type="checkbox"
              />
            </div>
            <div className="text-sm">
              <label className="cursor-pointer leading-tight text-slate-500" htmlFor="terms">
                I agree to the <a className="font-semibold text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-semibold text-primary hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <button
            className="mt-4 w-full rounded-xl bg-primary py-4 font-headline font-bold text-white shadow-[0_10px_24px_rgba(0,72,141,0.22)] transition-all hover:scale-[1.01] hover:bg-[#0057ab] hover:shadow-[0_14px_28px_rgba(0,72,141,0.28)] active:scale-[0.98]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          {errorMessage ? <p className="text-sm font-medium text-red-600">{errorMessage}</p> : null}
        </form>

        <footer className="mt-8 border-t border-slate-100 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?
            <button className="ml-1 font-bold text-primary hover:underline" type="button" onClick={onSignIn}>
              Sign In
            </button>
          </p>
        </footer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex gap-8 text-slate-500"
      >
        <a className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary" href="#">
          <HelpCircle size={14} />
          Help Center
        </a>
        <a className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary" href="#">
          <Shield size={14} />
          Security
        </a>
        <a className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary" href="#">
          <Activity size={14} />
          System Status
        </a>
      </motion.div>
    </div>
  );
}
