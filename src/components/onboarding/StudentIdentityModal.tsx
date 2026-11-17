import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, User, Github, ArrowRight, X, ExternalLink } from 'lucide-react';
import type { StudentIdentity } from '../../types';

export const StudentIdentityModal: React.FC = () => {
  const { state, setStudentIdentity, setIdentityModalOpen } = useApp();

  const isEditing = Boolean(state.studentIdentity);
  const isReturningUser = Boolean(state.userProfile || state.tourCompleted);

  const [name, setName] = useState(state.studentIdentity?.name || '');
  const [githubUsername, setGithubUsername] = useState(
    state.studentIdentity?.githubUsername || ''
  );
  const [department, setDepartment] = useState<'cse' | 'ece' | 'vlsi_other'>(
    state.studentIdentity?.department || 'cse'
  );
  const [error, setError] = useState<string | null>(null);

  if (!state.identityModalOpen) return null;

  const cleanGithubUser = githubUsername.trim().replace(/^@/, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedGithub = cleanGithubUser;

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }

    if (!trimmedGithub) {
      setError('Please enter your GitHub username.');
      return;
    }

    // Basic GitHub username character validation (alphanumeric and single hyphens)
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(trimmedGithub)) {
      setError('Please enter a valid GitHub username (letters, numbers, single hyphens).');
      return;
    }

    setError(null);

    const identityPayload: StudentIdentity = {
      name: trimmedName,
      githubUsername: trimmedGithub,
      department,
      registeredAt: state.studentIdentity?.registeredAt || new Date().toISOString(),
      updatedAt: isEditing ? new Date().toISOString() : undefined,
    };

    setStudentIdentity(identityPayload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg editorial-card bg-surface p-6 sm:p-8 shadow-2xl border border-line animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Close Button only if editing existing profile */}
        {isEditing && (
          <button
            type="button"
            onClick={() => setIdentityModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full border border-line text-muted hover:text-ink hover:bg-paper cursor-pointer transition-colors"
            aria-label="Close identity dialog"
          >
            <X className="size-4" />
          </button>
        )}

        {/* Header */}
        <div className="space-y-2 border-b border-line pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-safe/25 bg-safe-soft px-3.5 py-1 text-xs text-safe font-mono uppercase tracking-wider font-semibold">
            <GraduationCap className="size-3.5" />
            <span>IIIT TRICHY DEVS • STUDENT IDENTITY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
            {isEditing
              ? 'Update Your Details.'
              : isReturningUser
              ? 'Welcome Back!'
              : 'Identify Yourself.'}
          </h2>

          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            {isEditing
              ? 'Correct any typos in your name, GitHub handle, or department.'
              : isReturningUser
              ? 'We forgot to ask for your name earlier. Please let us know who you are so we can record your progress and activity on our community channel.'
              : 'Please enter your name and GitHub handle so your progress and open-source milestones are credited to you.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl border border-risk/30 bg-risk-soft/40 text-risk text-xs font-medium">
              {error}
            </div>
          )}

          {/* Field 1: Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="student-name-input"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink"
            >
              <User className="size-3.5 text-safe" />
              <span>Full Name</span>
            </label>
            <input
              id="student-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Syed Haseeb"
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl border border-line bg-paper/50 text-ink text-sm placeholder:text-muted/60 focus:outline-hidden focus:border-safe focus:bg-surface focus:ring-2 focus:ring-safe/20 transition-all font-sans"
            />
          </div>

          {/* Field 2: GitHub Username */}
          <div className="space-y-2">
            <label
              htmlFor="student-github-input"
              className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold text-ink"
            >
              <div className="flex items-center gap-2">
                <Github className="size-3.5 text-safe" />
                <span>GitHub Username</span>
              </div>
              {cleanGithubUser && (
                <a
                  href={`https://github.com/${cleanGithubUser}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-safe lowercase font-mono hover:underline font-normal"
                >
                  <span>github.com/{cleanGithubUser}</span>
                  <ExternalLink className="size-3" />
                </a>
              )}
            </label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted font-mono text-sm pointer-events-none">
                @
              </span>
              <input
                id="student-github-input"
                type="text"
                value={githubUsername}
                onChange={(e) => {
                  setGithubUsername(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Syed-Haseeb97"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-line bg-paper/50 text-ink text-sm placeholder:text-muted/60 focus:outline-hidden focus:border-safe focus:bg-surface focus:ring-2 focus:ring-safe/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Field 3: Department */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
              <GraduationCap className="size-3.5 text-safe" />
              <span>Department</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cse', title: 'CSE', desc: 'Computer Science' },
                { id: 'ece', title: 'ECE', desc: 'Electronics & Comm' },
                { id: 'vlsi_other', title: 'VLSI / Other', desc: 'Core Engineering' },
              ].map((opt) => {
                const isSelected = department === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDepartment(opt.id as 'cse' | 'ece' | 'vlsi_other')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-safe bg-safe-soft/40 text-ink ring-2 ring-safe/25'
                        : 'border-line bg-surface hover:bg-paper text-muted'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-ink uppercase">
                      {opt.title}
                    </div>
                    <div className="text-[10px] text-muted mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-muted order-2 sm:order-1">
              Recorded locally & sent to Discord
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-ink text-paper font-sans text-xs font-semibold hover:bg-ink/90 cursor-pointer shadow-md transition-transform active:scale-95 order-1 sm:order-2"
            >
              <span>{isEditing ? 'Save Changes' : 'Confirm & Proceed'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
