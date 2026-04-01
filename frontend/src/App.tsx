import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Analytics from './components/dashboard/Analytics';
import SessionURL from './components/dashboard/SessionURL';
import UploadZone from './components/dashboard/UploadZone';
import ResourceCenter from './components/dashboard/ResourceCard';
import HistorySection from './components/dashboard/HistorySection';
import PersonalInfoSection from './components/dashboard/PersonalInfoSection';
import StatsCard from './components/dashboard/StatsCard';
import PromoCard from './components/dashboard/PromoCard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  createUploadSession,
  fetchCurrentUser,
  fetchUploadSessions,
  loginWithEmail,
  logoutUser,
  registerWithEmail,
  startGitHubLogin,
  startGoogleLogin,
  type AuthUser,
} from './lib/auth';
import type { Session, UploadActivity } from './components/types';

type AppView = 'dashboard' | 'analytics' | 'resources' | 'history' | 'savedUrls' | 'profile' | 'signin' | 'signup';

const defaultHistorySessions: Session[] = [
  {
    id: '1',
    title: 'Market Research Q4',
    date: 'Oct 24, 2023',
    time: '14:30',
    urlCount: 42,
    status: 'COMPLETED',
  },
  {
    id: '2',
    title: 'UI Design Inspiration Search',
    date: 'Today',
    time: '09:15',
    urlCount: 12,
    status: 'IN PROGRESS',
  },
  {
    id: '3',
    title: 'Competitor Analysis - FinTech',
    date: 'Oct 20, 2023',
    time: '11:00',
    urlCount: 89,
    status: 'ARCHIVED',
  },
];

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [uploadedSessions, setUploadedSessions] = useState<UploadActivity[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchCurrentUser()
      .then(({ user }) => {
        setCurrentUser(user);

        const url = new URL(window.location.href);
        if (url.searchParams.get('auth') === 'success') {
          setView('dashboard');
          url.searchParams.delete('auth');
          window.history.replaceState({}, '', url.toString());
        }
      })
      .catch(() => {})
      .finally(() => {
        const url = new URL(window.location.href);
        if (url.searchParams.has('auth')) {
          url.searchParams.delete('auth');
          window.history.replaceState({}, '', url.toString());
        }
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUploadedSessions([]);
      return;
    }

    fetchUploadSessions()
      .then(({ uploads }) => {
        setUploadedSessions(uploads as UploadActivity[]);
      })
      .catch(() => {});
  }, [currentUser]);

  const handleEmailLogin = async (payload: { email: string; password: string }) => {
    const { user } = await loginWithEmail(payload);
    setCurrentUser(user);
    setView('dashboard');
  };

  const handleEmailSignup = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { user } = await registerWithEmail(payload);
    setCurrentUser(user);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setView('dashboard');
  };

  const handleUploadComplete = async (upload: UploadActivity) => {
    const { upload: savedUpload } = await createUploadSession(upload);
    setUploadedSessions((currentUploads) => [savedUpload as UploadActivity, ...currentUploads.filter((item) => item.id !== savedUpload.id)]);
    setView('history');
  };

  const historySessions: Session[] = [...uploadedSessions, ...defaultHistorySessions];

  if (view === 'signin') {
    return (
      <SignIn
        onBack={() => setView('dashboard')}
        onCreateAccount={() => setView('signup')}
        onGitHubLogin={startGitHubLogin}
        onGoogleLogin={startGoogleLogin}
        onLogin={handleEmailLogin}
      />
    );
  }

  if (view === 'signup') {
    return (
      <SignUp
        onBack={() => setView('dashboard')}
        onCreateAccount={handleEmailSignup}
        onGitHubLogin={startGitHubLogin}
        onGoogleLogin={startGoogleLogin}
        onSignIn={() => setView('signin')}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-background transition-colors dark:bg-background">
      <Navbar
        currentUser={currentUser}
        darkMode={darkMode}
        activeNav={view === 'analytics' ? 'analytics' : view === 'resources' ? 'resources' : view === 'profile' ? 'profile' : null}
        isSettingsActive={view === 'profile'}
        onAnalyticsClick={() => setView('analytics')}
        onLoginClick={() => setView('signin')}
        onResourcesClick={() => setView('resources')}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
        onSettingsClick={() => setView('profile')}
      />
      <Sidebar
        activeView={view === 'dashboard' ? 'dashboard' : view === 'history' ? 'history' : view === 'savedUrls' ? 'savedUrls' : 'other'}
        darkMode={darkMode}
        onDashboardClick={() => setView('dashboard')}
        onHistoryClick={() => setView('history')}
        onSavedUrlsClick={() => setView('savedUrls')}
      />
      
      
      <main className="flex-1 lg:ml-64 px-5 py-6 pt-24 pb-24 md:px-8 md:pb-12 xl:px-10">
        {view === 'analytics' ? (
          <Analytics />
        ) : view === 'resources' ? (
          <ResourceCenter darkMode={darkMode} />
        ) : view === 'history' ? (
          <HistorySection darkMode={darkMode} sessions={historySessions} />
        ) : view === 'savedUrls' ? (
          <SessionURL
            darkMode={darkMode}
            recentUploads={uploadedSessions}
            setDarkMode={setDarkMode}
            onViewHistory={() => setView('history')}
          />
        ) : view === 'profile' && currentUser ? (
          <div className="space-y-4">
            <div className="mx-auto flex w-full max-w-5xl justify-end">
              <button
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  darkMode
                    ? 'border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
            <PersonalInfoSection
              darkMode={darkMode}
              user={currentUser}
              onUserUpdate={setCurrentUser}
            />
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 xl:flex-row xl:items-start">
            <div className="min-w-0 flex-1">
              <header className="mb-6">
                <h1 className="mb-2 text-3xl font-extrabold font-headline tracking-tight text-on-surface md:text-[2.5rem] md:leading-[1.05]">
                  The Smarter Way to Navigate
                </h1>
                <p className="max-w-2xl text-sm text-on-surface-variant md:text-lg">
                  Streamline your bulk URL exploration and analysis with AI-powered insights.
                </p>
              </header>
              
              <div className="flex flex-col gap-6">
                <UploadZone
                  isAuthenticated={Boolean(currentUser)}
                  onUploadComplete={handleUploadComplete}
                  onRequireLogin={() => setView('signin')}
                />
              </div>
            </div>
            
            <aside className="w-full shrink-0 xl:sticky xl:top-24 xl:w-[290px]">
              <div className="flex flex-col gap-4">
                <StatsCard />
                <PromoCard />
              </div>
            </aside>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
