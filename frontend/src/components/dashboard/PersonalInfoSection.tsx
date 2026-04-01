/*
const PersonalInfoSection = () => (
  <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-bold text-slate-900 font-headline">Personal Information</h2>
      <button className="text-sm font-semibold text-blue-700 hover:underline">Save Changes</button>
    </div>
    <div className="space-y-8">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100">
            <img 
              alt="Profile picture" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4ctw6YxBY6_aE5O2irFlej6cfdv5-TDUS_Z7hgM2XcQwkaOccOCjC7BokUaCbI03VeYTKehFaMmk08JAeE5-bexXIdpqFsNRpFSHFZgMFt4WWa6TXKsA-dEm4GaVw3kE9TMPeTTqeSl7u7lpNZs12zXWJfhdCrwuZrrIygPULsYn4pZe4IuGemDxUee1lx8e8-4ZTccNQe_cj_LXGUQwv7vQ1Csf8v44fmM-SyVzWiXmFEEfO8ehxvAtWs9C6TtbP_pvMCecFe8"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-700 text-white p-1.5 rounded-full border-2 border-white hover:scale-105 transition-transform shadow-md">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Profile Picture</h3>
          <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
          <div className="mt-3 flex gap-3">
            <button className="px-4 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">Upload New</button>
            <button className="px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">Remove</button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 block">Display Name</label>
          <input 
            className="w-full bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 px-4 py-3 text-sm" 
            type="text" 
            defaultValue="Alex Henderson"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 block">Email Address</label>
          <input 
            className="w-full bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 px-4 py-3 text-sm" 
            type="email" 
            defaultValue="alex.h@webnav.io"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-600 block">Bio</label>
          <textarea 
            className="w-full bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 px-4 py-3 text-sm resize-none" 
            placeholder="Write a short bio about yourself..." 
            rows={3}
            defaultValue="Product Manager at WebNav. Passionate about productivity and clean UI."
          />
        </div>
      </div>
    </div>
  </section>
);

const SecuritySection = () => (
  <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
    <h2 className="text-xl font-bold text-slate-900 font-headline mb-8">Security & Privacy</h2>
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Lock className="text-blue-700 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Password</h3>
            <p className="text-xs text-slate-500">Last changed 3 months ago</p>
          </div>
        </div>
        <button className="px-4 py-2 text-xs font-bold text-blue-700 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">Change Password</button>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Smartphone className="text-orange-700 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Two-Factor Authentication</h3>
            <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <div className="relative inline-flex items-center cursor-pointer">
          <input defaultChecked className="sr-only peer" type="checkbox" />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
        </div>
      </div>
    </div>
  </section>
);

const BillingSection = () => (
  <section className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 overflow-hidden relative">
    <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl"></div>
    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-blue-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Current Plan</span>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-blue-700 font-headline">Free Plan</h2>
          <p className="text-slate-600 text-sm max-w-sm mt-2">You are currently using the limited free tier. Upgrade to unlock advanced analytics and unlimited projects.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-700 w-4 h-4" />
            <span className="text-xs font-medium text-slate-700">3 Active Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-700 w-4 h-4" />
            <span className="text-xs font-medium text-slate-700">1GB Storage</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-800"></div>
          <span className="relative flex items-center gap-2">
            Upgrade to Pro
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        <p className="text-center mt-3 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Starting at $12/mo</p>
      </div>
    </div>
  </section>
);

const BentoCards = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-bold mb-4 text-slate-900">Email Notifications</h3>
      <div className="space-y-4">
        {[
          { label: 'Product Updates', checked: true },
          { label: 'Security Alerts', checked: true, disabled: true },
          { label: 'Marketing Emails', checked: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-slate-600">{item.label}</span>
            <input 
              defaultChecked={item.checked} 
              disabled={item.disabled}
              className={`rounded text-blue-700 focus:ring-blue-700 border-slate-300 ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
              type="checkbox" 
            />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-blue-50/30 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-100/50">
      <div className="w-12 h-12 rounded-full bg-white mb-4 flex items-center justify-center shadow-sm border border-slate-100">
        <Monitor className="text-slate-500 w-6 h-6" />
      </div>
      <h3 className="font-bold text-sm mb-1 text-slate-900">Active Sessions</h3>
      <p className="text-xs text-slate-600">2 devices currently logged in</p>
      <button className="mt-4 text-[11px] font-extrabold uppercase tracking-wider text-blue-700 hover:underline">Manage All</button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 py-10 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-blue-700 font-headline">WebNav Productivity Suite</span>
        <span className="text-xs text-slate-500">© 2024 Aeon Productivity Inc.</span>
      </div>
      <div className="flex gap-8 text-xs font-semibold text-slate-500">
        <a className="hover:text-blue-700 transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-blue-700 transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-blue-700 transition-colors" href="#">API Documentation</a>
      </div>
    </div>
  </footer>
);
*/

import { ArrowRight, Camera, CheckCircle2, LoaderCircle, Lock, Monitor, Smartphone } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  changePassword,
  fetchActiveSessions,
  removeAvatar,
  type AuthUser,
  type UserSession,
  updateProfile,
  updateTwoFactor,
  uploadAvatar,
} from '../../lib/auth';

interface PersonalInfoSectionProps {
  user: AuthUser;
  darkMode?: boolean;
  onUserUpdate: (user: AuthUser) => void;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
    reader.readAsDataURL(file);
  });
}

function formatSessionAge(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function SecuritySection({
  darkMode = false,
  hasPasswordProvider,
  twoFactorEnabled,
  onChangePassword,
  onToggleTwoFactor,
  passwordStatus,
  twoFactorStatus,
  passwordSaving,
  twoFactorSaving,
}: {
  darkMode?: boolean;
  hasPasswordProvider: boolean;
  twoFactorEnabled: boolean;
  onChangePassword: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) => Promise<void>;
  onToggleTwoFactor: () => Promise<void>;
  passwordStatus: string;
  twoFactorStatus: string;
  passwordSaving: boolean;
  twoFactorSaving: boolean;
}) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <section className={`rounded-xl border p-8 shadow-sm ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
      <h2 className={`mb-8 font-headline text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Security & Privacy</h2>
      <div className="space-y-6">
        <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${darkMode ? 'bg-primary/15' : 'bg-blue-100'}`}>
                <Lock className={`h-5 w-5 ${darkMode ? 'text-primary' : 'text-blue-700'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Password</h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {hasPasswordProvider
                    ? 'Managed securely through your selected sign-in method.'
                    : 'Create a password so you can also sign in with email and password.'}
                </p>
              </div>
            </div>
            <button
              className={`rounded-lg border px-4 py-2 text-xs font-bold transition-colors ${
                darkMode
                  ? 'border-slate-700 bg-slate-950 text-primary hover:bg-slate-900'
                  : 'border-slate-200 bg-white text-blue-700 hover:bg-slate-50'
              }`}
              type="button"
              onClick={() => setShowPasswordForm((value) => !value)}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm ? (
            <form
              className="mt-5 grid gap-3 md:grid-cols-3"
              onSubmit={(event) => {
                event.preventDefault();
                void onChangePassword({ currentPassword, newPassword, confirmPassword }).then(() => {
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setShowPasswordForm(false);
                });
              }}
            >
              <input
                className={`rounded-lg px-4 py-3 text-sm outline-none ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}
                placeholder={hasPasswordProvider ? 'Current password' : 'No current password needed'}
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
              <input
                className={`rounded-lg px-4 py-3 text-sm outline-none ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}
                placeholder="New password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <div className="flex gap-3">
                <input
                  className={`min-w-0 flex-1 rounded-lg px-4 py-3 text-sm outline-none ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  className={`rounded-lg px-4 py-3 text-sm font-semibold text-white ${darkMode ? 'bg-primary' : 'bg-blue-700'} disabled:cursor-not-allowed disabled:opacity-60`}
                  disabled={passwordSaving}
                  type="submit"
                >
                  {passwordSaving ? 'Saving...' : 'Update'}
                </button>
              </div>
            </form>
          ) : null}

          {passwordStatus ? <p className={`mt-3 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{passwordStatus}</p> : null}
        </div>
        <div className={`flex items-center justify-between rounded-xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
          <div className="flex gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${darkMode ? 'bg-amber-500/15' : 'bg-orange-100'}`}>
              <Smartphone className={`h-5 w-5 ${darkMode ? 'text-amber-300' : 'text-orange-700'}`} />
            </div>
            <div>
              <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Two-Factor Authentication</h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Toggle Google Authenticator-style extra account protection.</p>
              {twoFactorStatus ? <p className={`mt-1 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{twoFactorStatus}</p> : null}
            </div>
          </div>
          <button
            aria-label="Toggle two-factor authentication"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              twoFactorEnabled ? (darkMode ? 'bg-primary' : 'bg-blue-700') : darkMode ? 'bg-slate-700' : 'bg-slate-200'
            } ${twoFactorSaving ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
            disabled={twoFactorSaving}
            type="button"
            onClick={() => void onToggleTwoFactor()}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                twoFactorEnabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function BillingSection({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <section className={`relative overflow-hidden rounded-xl border p-8 ${
      darkMode ? 'border-primary/20 bg-slate-950' : 'border-blue-100 bg-blue-50/50'
    }`}>
      <div className={`absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl ${darkMode ? 'bg-primary/15' : 'bg-blue-100/50'}`} />
      <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 shadow-sm ${
            darkMode ? 'border-slate-700 bg-slate-900' : 'border-blue-100 bg-white'
          }`}>
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Current Plan</span>
          </div>
          <div>
            <h2 className={`font-headline text-3xl font-extrabold ${darkMode ? 'text-primary' : 'text-blue-700'}`}>Free Plan</h2>
            <p className={`mt-2 max-w-sm text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              You are currently using the limited free tier. Upgrade to unlock advanced analytics and unlimited projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${darkMode ? 'text-primary' : 'text-blue-700'}`} />
              <span className={`text-xs font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>3 Active Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${darkMode ? 'text-primary' : 'text-blue-700'}`} />
              <span className={`text-xs font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>1GB Storage</span>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <button className="group relative overflow-hidden rounded-xl px-8 py-4 font-bold text-white transition-all active:scale-95">
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-primary to-fuchsia-700' : 'bg-gradient-to-br from-blue-700 to-blue-800'}`} />
            <span className="relative flex items-center gap-2">
              Upgrade to Pro
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <p className={`mt-3 text-center text-[10px] font-bold uppercase tracking-tighter ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Starting at $12/mo</p>
        </div>
      </div>
    </section>
  );
}

function BentoCards({
  darkMode = false,
  sessions,
  sessionsLoading,
}: {
  darkMode?: boolean;
  sessions: UserSession[];
  sessionsLoading: boolean;
}) {
  const activeCount = sessions.length;
  const latestSession = sessions[0];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className={`rounded-xl border p-6 shadow-sm md:col-span-2 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <h3 className={`mb-4 font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Email Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'Product Updates', checked: true },
            { label: 'Security Alerts', checked: true, disabled: true },
            { label: 'Marketing Emails', checked: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{item.label}</span>
              <input
                defaultChecked={item.checked}
                disabled={item.disabled}
                className={`rounded ${darkMode ? 'border-slate-600 text-primary focus:ring-primary' : 'border-slate-300 text-blue-700 focus:ring-blue-700'} ${item.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                type="checkbox"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center rounded-xl border p-6 text-center ${
        darkMode ? 'border-primary/20 bg-slate-950' : 'border-blue-100/50 bg-blue-50/30'
      }`}>
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border shadow-sm ${
          darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-100 bg-white'
        }`}>
          {sessionsLoading ? (
            <LoaderCircle className={`h-6 w-6 animate-spin ${darkMode ? 'text-slate-300' : 'text-slate-500'}`} />
          ) : (
            <Monitor className={`h-6 w-6 ${darkMode ? 'text-slate-300' : 'text-slate-500'}`} />
          )}
        </div>
        <h3 className={`mb-1 text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Active Sessions</h3>
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {activeCount} device{activeCount === 1 ? '' : 's'} currently logged in
        </p>
        {latestSession ? (
          <p className={`mt-3 text-[11px] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {latestSession.current ? 'Current device' : latestSession.userAgent}
            <br />
            Last seen {formatSessionAge(latestSession.lastSeenAt)}
          </p>
        ) : null}
        <div className="mt-4 w-full space-y-2 text-left">
          {sessions.slice(0, 2).map((session) => (
            <div key={session.id} className={`rounded-lg px-3 py-2 text-[11px] ${darkMode ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-600'}`}>
              <div className="font-semibold">{session.current ? 'Current device' : session.userAgent}</div>
              <div>Started {formatSessionAge(session.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PersonalInfoSection({ user, darkMode = false, onUserUpdate }: PersonalInfoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || `Hi, I'm ${user.name}. I use WebNav to streamline research and workflow analysis.`,
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [twoFactorStatus, setTwoFactorStatus] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [twoFactorSaving, setTwoFactorSaving] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessions, setSessions] = useState<UserSession[]>(user.activeSessions || []);

  useEffect(() => {
    setFormState({
      name: user.name,
      email: user.email,
      bio: user.bio || `Hi, I'm ${user.name}. I use WebNav to streamline research and workflow analysis.`,
    });
  }, [user.bio, user.email, user.name]);

  useEffect(() => {
    setSessionsLoading(true);
    fetchActiveSessions()
      .then(({ sessions: activeSessions }) => setSessions(activeSessions))
      .catch(() => {})
      .finally(() => setSessionsLoading(false));
  }, []);

  const avatarSrc = useMemo(
    () => user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=00488d&color=ffffff`,
    [user.avatarUrl, user.name]
  );

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setStatusMessage('');

    try {
      const { user: updatedUser } = await updateProfile(formState);
      onUserUpdate(updatedUser);
      setStatusMessage('Profile details saved.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to save profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setStatusMessage('Only JPG, PNG, or GIF images are supported.');
      return;
    }

    if (file.size > 800 * 1024) {
      setStatusMessage('Profile image must be 800KB or smaller.');
      return;
    }

    setAvatarSaving(true);
    setStatusMessage('');

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const { user: updatedUser } = await uploadAvatar(dataUrl);
      onUserUpdate(updatedUser);
      setStatusMessage('Profile image updated.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to upload image.');
    } finally {
      setAvatarSaving(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarSaving(true);
    setStatusMessage('');

    try {
      const { user: updatedUser } = await removeAvatar();
      onUserUpdate(updatedUser);
      setStatusMessage('Profile image removed.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to remove image.');
    } finally {
      setAvatarSaving(false);
    }
  };

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (newPassword !== confirmPassword) {
      setPasswordStatus('New password and confirmation must match.');
      throw new Error('Password confirmation mismatch.');
    }

    setPasswordSaving(true);
    setPasswordStatus('');

    try {
      const { user: updatedUser, message } = await changePassword({ currentPassword, newPassword });
      onUserUpdate(updatedUser);
      setPasswordStatus(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update password.';
      setPasswordStatus(message);
      throw error;
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    setTwoFactorSaving(true);
    setTwoFactorStatus('');

    try {
      const { user: updatedUser, message } = await updateTwoFactor(!user.twoFactorEnabled);
      onUserUpdate(updatedUser);
      setTwoFactorStatus(message);
    } catch (error) {
      setTwoFactorStatus(error instanceof Error ? error.message : 'Unable to update 2FA.');
    } finally {
      setTwoFactorSaving(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-8">
      <section className={`rounded-xl border p-8 shadow-sm ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <div className="mb-8 flex items-center justify-between">
          <h2 className={`font-headline text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Personal Information</h2>
          <button
            className={`text-sm font-semibold hover:underline ${darkMode ? 'text-primary' : 'text-blue-700'} disabled:opacity-60`}
            disabled={savingProfile}
            type="button"
            onClick={() => void handleSaveProfile()}
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        <div className="space-y-8">
          <div className="flex items-center gap-8">
            <div className="group relative">
              <div className={`h-24 w-24 overflow-hidden rounded-full border-4 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <img
                  alt="Profile picture"
                  className="h-full w-full object-cover"
                  src={avatarSrc}
                  referrerPolicy="no-referrer"
                />
              </div>
              <button
                className={`absolute bottom-0 right-0 rounded-full border-2 p-1.5 text-white shadow-md transition-transform hover:scale-105 ${
                  darkMode ? 'border-slate-950 bg-primary' : 'border-white bg-blue-700'
                }`}
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/gif"
                className="hidden"
                type="file"
                onChange={(event) => void handleAvatarSelect(event)}
              />
            </div>
            <div>
              <h3 className={`font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Profile Picture</h3>
              <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>JPG, GIF or PNG. Max size of 800K</p>
              <div className="mt-3 flex gap-3">
                <button
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
                    darkMode ? 'bg-slate-900 text-slate-200 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  } disabled:opacity-60`}
                  disabled={avatarSaving}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatarSaving ? 'Uploading...' : 'Upload New'}
                </button>
                <button
                  className="rounded-lg px-4 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                  disabled={avatarSaving || !user.avatarUrl}
                  type="button"
                  onClick={() => void handleRemoveAvatar()}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Display Name</label>
              <input
                className={`w-full rounded-lg border-none px-4 py-3 text-sm ${darkMode ? 'bg-slate-900 text-slate-100 focus:ring-primary/30' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'}`}
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Email Address</label>
              <input
                className={`w-full rounded-lg border-none px-4 py-3 text-sm ${darkMode ? 'bg-slate-900 text-slate-100 focus:ring-primary/30' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'}`}
                type="email"
                value={formState.email}
                onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Bio</label>
              <textarea
                className={`w-full resize-none rounded-lg border-none px-4 py-3 text-sm ${darkMode ? 'bg-slate-900 text-slate-100 focus:ring-primary/30' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'}`}
                placeholder="Write a short bio about yourself..."
                rows={3}
                value={formState.bio}
                onChange={(event) => setFormState((current) => ({ ...current, bio: event.target.value }))}
              />
            </div>
          </div>
          {statusMessage ? <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{statusMessage}</p> : null}
        </div>
      </section>
      <SecuritySection
        darkMode={darkMode}
        hasPasswordProvider={Boolean(user.providers?.password)}
        passwordSaving={passwordSaving}
        passwordStatus={passwordStatus}
        twoFactorEnabled={Boolean(user.twoFactorEnabled)}
        twoFactorSaving={twoFactorSaving}
        twoFactorStatus={twoFactorStatus}
        onChangePassword={handleChangePassword}
        onToggleTwoFactor={handleToggleTwoFactor}
      />
      <BillingSection darkMode={darkMode} />
      <BentoCards darkMode={darkMode} sessions={sessions} sessionsLoading={sessionsLoading} />
    </section>
  );
}
