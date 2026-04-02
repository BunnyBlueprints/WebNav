import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, GitBranch, HelpCircle, Shield, Activity, ArrowLeft, X } from 'lucide-react';

interface SignupProps {
  onCreateAccount: (payload: { name: string; email: string; password: string }) => Promise<void>;
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
  onSignIn: () => void;
  onBack: () => void;
}

type LegalDocument = 'terms' | 'privacy' | null;

function LegalModal({
  document,
  onClose,
}: {
  document: Exclude<LegalDocument, null>;
  onClose: () => void;
}) {
  const isTerms = document === 'terms';
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="font-headline text-2xl font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">Effective date: April 3, 2026</p>
          </div>
          <button
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            type="button"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(85vh-96px)] space-y-6 overflow-y-auto px-6 py-6 text-sm leading-6 text-slate-600">
          {isTerms ? (
            <>
              <section>
                <h4 className="font-semibold text-slate-900">1. Agreement to use WebNav</h4>
                <p>
                  These Terms of Service govern your access to and use of WebNav, including the dashboard, account
                  features, file upload tools, analytics views, and related services. By creating an account or using
                  WebNav, you agree to comply with these terms and all applicable laws.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">2. Eligibility and account responsibility</h4>
                <p>
                  You are responsible for maintaining accurate account information, safeguarding your credentials, and
                  all activity performed through your account. You must not impersonate others, share unauthorized
                  access, or use the service for unlawful, harmful, or deceptive activity.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">3. Acceptable use</h4>
                <p>
                  You may use WebNav only for legitimate workflow, research, and productivity purposes. You must not
                  upload malicious files, attempt to disrupt service operations, probe for vulnerabilities, scrape data
                  without authorization, or use the platform in a way that infringes the rights of others.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">4. User content and uploaded data</h4>
                <p>
                  You retain ownership of files, URLs, profile content, and other materials you submit. You grant
                  WebNav a limited right to host, process, and display that content solely to operate, secure, and
                  improve the service for you. You confirm that you have the rights required to upload and process that
                  content.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">5. Availability and changes</h4>
                <p>
                  We may update features, modify interfaces, add security measures, or temporarily suspend portions of
                  the service for maintenance. While we aim for reliable availability, WebNav is provided on an “as is”
                  and “as available” basis to the maximum extent permitted by law.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">6. Suspension and termination</h4>
                <p>
                  We may suspend or terminate access if we reasonably believe an account violates these terms, creates
                  security risk, or exposes the service or other users to harm. You may stop using the service at any
                  time. Provisions that reasonably should survive termination will continue to apply.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">7. Limitation of liability</h4>
                <p>
                  To the fullest extent permitted by law, WebNav and its operators will not be liable for indirect,
                  incidental, special, consequential, or punitive damages, or for loss of data, business, goodwill, or
                  profits arising from your use of the service.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">8. Contact</h4>
                <p>
                  If you have questions about these terms, contact the WebNav team through the support channel made
                  available in the application or deployment environment.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h4 className="font-semibold text-slate-900">1. Information we collect</h4>
                <p>
                  WebNav may collect account details such as your name, email address, profile image, login provider,
                  encrypted password credentials, session metadata, and the files or URL lists you choose to upload. We
                  also collect technical information such as IP address, browser details, and usage timestamps needed to
                  operate and secure the service.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">2. How we use information</h4>
                <p>
                  We use your information to authenticate your account, provide requested features, save upload history,
                  personalize your workspace, detect abuse, troubleshoot issues, and improve the service experience.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">3. Legal basis and consent</h4>
                <p>
                  By using WebNav and accepting this policy, you consent to the processing described here where consent
                  is required. We may also process information where necessary to provide the service, protect the
                  platform, comply with legal obligations, or pursue legitimate operational interests.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">4. Sharing and disclosure</h4>
                <p>
                  We do not sell your personal information. Information may be shared with infrastructure providers,
                  authentication providers, cloud hosting vendors, analytics or security processors, and legal
                  authorities where required to operate the service or comply with law.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">5. Cookies and session data</h4>
                <p>
                  WebNav uses secure cookies and session identifiers to keep you signed in, protect your account, and
                  remember your preferences. If you choose “Keep me signed in,” the authentication cookie may persist
                  across browser restarts until it expires or you sign out.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">6. Data retention and security</h4>
                <p>
                  We retain information for as long as reasonably necessary to provide the service, maintain account
                  history, resolve disputes, enforce our terms, and meet legal requirements. We use reasonable
                  administrative, technical, and organizational safeguards, but no method of storage or transmission is
                  completely secure.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">7. Your choices and rights</h4>
                <p>
                  Subject to applicable law, you may have rights to access, correct, delete, or export your information
                  and to object to certain uses. You can also update profile fields and sign out of active sessions from
                  within the application where those features are available.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-slate-900">8. Policy updates</h4>
                <p>
                  We may revise this Privacy Policy to reflect product, legal, or security changes. Updated versions
                  become effective when posted in the service or otherwise communicated to users.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
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
  const [activeDocument, setActiveDocument] = useState<LegalDocument>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const hasAcceptedTerms = formData.get('terms') === 'on';

    if (!hasAcceptedTerms) {
      setErrorMessage('You must accept the Terms of Service and Privacy Policy to create an account.');
      setIsSubmitting(false);
      return;
    }

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
              required
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
              required
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
                required
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-primary"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <div className="flex h-5 items-center">
              <input
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-2 focus:ring-[#dce8fb]"
                id="terms"
                name="terms"
                required
                type="checkbox"
              />
            </div>
            <div className="text-sm">
              <label className="cursor-pointer leading-tight text-slate-500" htmlFor="terms">
                I agree to the{' '}
                <button
                  className="font-semibold text-primary hover:underline"
                  type="button"
                  onClick={() => setActiveDocument('terms')}
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  className="font-semibold text-primary hover:underline"
                  type="button"
                  onClick={() => setActiveDocument('privacy')}
                >
                  Privacy Policy
                </button>
                .
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

      {activeDocument ? <LegalModal document={activeDocument} onClose={() => setActiveDocument(null)} /> : null}
    </div>
  );
}
