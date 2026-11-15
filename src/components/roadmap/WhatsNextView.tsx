import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  UserCheck,
  FolderGit2,
  GitPullRequest,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Key,
  Layers,
  GitFork,
  Cpu,
  Globe,
} from 'lucide-react';

export const WhatsNextView: React.FC = () => {
  const { state, setView } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<'web' | 'ai' | 'core'>('web');

  const isCurriculumFinished = Boolean(
    state.completedTasks[10] ||
    Object.keys(state.completedQuizzes).some((k) => k.startsWith('10-'))
  );

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="border-b border-line pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted shadow-xs mb-3">
          <Compass className="size-3.5 text-safe" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-safe">
            POST-CURRICULUM TRAJECTORY • IIIT TRICHY DEVS
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink uppercase">
          What's Next: <br />
          <span className="text-safe italic font-normal">Your Developer Roadmap.</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-muted">
          Mastering the 10 phases is only milestone zero. Follow this structured timeline designed by
          senior students and community leads to build verified software, land open-source contributions,
          and prepare for technical hackathons and internships.
        </p>

        {/* Milestone Status Banner */}
        <div className="mt-6 p-4 rounded-2xl border border-line bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-line bg-paper text-safe shrink-0">
              <CheckCircle2 className="size-5 text-safe" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-ink uppercase tracking-wider">
                {isCurriculumFinished
                  ? 'Curriculum Completed • Ready for Applied Engineering'
                  : 'Curriculum in Progress • Self-Paced Guide'}
              </p>
              <p className="text-xs text-muted">
                {isCurriculumFinished
                  ? 'All core foundation and open-source phases verified. Follow the timeline below.'
                  : 'You can refer to this roadmap at any time to plan your upcoming semesters.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView('projects')}
              className="px-3.5 py-1.5 rounded-full border border-line bg-paper hover:bg-surface text-ink font-mono text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderGit2 className="size-3 text-safe" />
              <span>Browse Projects</span>
            </button>
            <button
              type="button"
              onClick={() => setView('curriculum')}
              className="px-3.5 py-1.5 rounded-full bg-ink hover:bg-ink/90 text-paper font-mono text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Back to Curriculum</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Structured Roadmap Timeline */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-muted flex items-center gap-2">
            <span>01 / TIMELINE MILESTONES (MONTHS 1 TO 3+)</span>
          </h2>
          <span className="font-mono text-xs text-muted">
            Ordered Execution Path
          </span>
        </div>

        <div className="grid gap-6">
          {/* Week 1: Identity & Toolchain */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-safe text-paper">
                  WEEK 01
                </span>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  Developer Identity & Local Toolchain Setup
                </h3>
              </div>
              <span className="font-mono text-xs text-muted">
                Days 1 to 7 • High Priority
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Before writing complex code, establish your public engineering identity and configure a friction-free
              local development environment with secure SSH keys and the official GitHub CLI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <UserCheck className="size-4 text-safe" />
                  <span>Profile README & Pins</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Create a repository matching your GitHub username and write a polished README showcasing your tech stack, contact links, and pin 3 to 6 best repositories.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <Key className="size-4 text-safe" />
                  <span>SSH Keys & GitHub CLI</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Generate an Ed25519 SSH keypair (`ssh-keygen -t ed25519`), upload your public key to GitHub, and authenticate the `gh` CLI for terminal productivity.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <Users className="size-4 text-safe" />
                  <span>Join IIIT-Trichy-Devs Org</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Join the organization, add your name to the community roster, and complete Foundation Projects 01 through 03 in the Student Projects lab.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-line/70 bg-surface text-xs font-mono text-muted flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-ink">
                Runbook Checklist:
              </span>
              <span>1. Profile README</span>
              <span>•</span>
              <span>2. 3-6 Repos Pinned</span>
              <span>•</span>
              <span>3. Org Joined</span>
              <span>•</span>
              <span>4. gh auth login</span>
              <span>•</span>
              <span>5. Finish Projects 1-3</span>
            </div>
          </div>

          {/* Weeks 2-3: First Real Project */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-paper text-ink border border-line">
                  WEEKS 02 - 03
                </span>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  First Real Campus Project (Project 05 Blueprint)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setView('projects')}
                className="font-mono text-xs text-safe hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Project 05 Specs</span>
                <ExternalLink className="size-3" />
              </button>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Stop building throwaway tutorial code. Build a utility that solves an actual daily problem for yourself and fellow
              IIIT Trichy students, adhering to professional repository hygiene from day one.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">1. Attendance Tracker</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Client-side 75% threshold calculator computing safe bunk quotas.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">2. Timetable Viewer</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Responsive schedule planner highlighting ongoing and upcoming lecture slots.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">3. Mess Menu Tracker</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Daily hostel meal viewer with ratings, feedback, and special feast schedules.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">4. Course Lab Archive</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Clean directory structure with course-wise lab programs and problem statements.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-safe/30 bg-safe-soft/30 space-y-2">
              <p className="font-mono text-xs font-bold text-safe uppercase tracking-wider">
                Mandatory Project Engineering Rules:
              </p>
              <ul className="text-xs text-ink space-y-1 font-mono list-disc list-inside">
                <li>Include a comprehensive README with project motivation, local setup commands, and UI screenshots.</li>
                <li>Add a production-grade .gitignore before the first commit to prevent committing build outputs or secrets.</li>
                <li>Work on dedicated feature branches (e.g. `feat/calculator-ui`). Never push experimental code directly to main.</li>
                <li>Use conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).</li>
                <li>Deploy live to GitHub Pages (Actions artifact workflow) or Vercel.</li>
              </ul>
            </div>
          </div>

          {/* Weeks 3-4: First Open-Source Contribution */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-paper text-ink border border-line">
                  WEEKS 03 - 04
                </span>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  First Open-Source Contribution (Project 06 Blueprint)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setView('projects')}
                className="font-mono text-xs text-safe hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Project 06 Specs</span>
                <ExternalLink className="size-3" />
              </button>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Transition from personal repositories to community collaboration. Contributing to open-source software teaches you
              codebase navigation, etiquette, upstream synchronization, and code review communication.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <GitFork className="size-4 text-safe" />
                  <span>Start with Community Repos</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Contribute directly to IIIT-Trichy-Devs repositories, including `learn-github-iiitt` or `community-roster`.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <GitPullRequest className="size-4 text-safe" />
                  <span>Scope: Good First Issues</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Target issues tagged `good first issue`, `documentation`, or fix typos, broken links, and edge cases.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                  <CheckCircle2 className="size-4 text-safe" />
                  <span>Review & Iterate</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Open a Pull Request with the PR template, observe automated CI checks, and promptly answer maintainer suggestions.
                </p>
              </div>
            </div>
          </div>

          {/* Month 2: Team Collaboration Project */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-paper text-ink border border-line">
                  MONTH 02
                </span>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  Multi-Developer Team Project (3-4 Members)
                </h3>
              </div>
              <span className="font-mono text-xs text-muted">
                Simulated Software Engineering Team
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Form a squad of 3 to 4 classmates to build a larger project over 4 weeks. This simulates real tech industry
              practices and ensures you encounter real-world merge conflicts, sprint boards, and code reviews.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">1. Issue & Board Tracking</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Create GitHub Issues for every task and organize them on a GitHub Projects Kanban board (To Do, In Progress, Done).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">2. No Direct Push to Main</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Configure branch protection rules on `main`: require a Pull Request and at least 1 approving peer review before merge.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">3. Automated CI Gate</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Add a `.github/workflows/ci.yml` workflow that automatically runs linter and build tests on every incoming PR.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-line bg-paper space-y-1">
                <p className="font-mono font-bold text-ink">4. Rotate Reviewers</p>
                <p className="text-muted text-[11px] leading-relaxed">
                  Rotate code review duties so every team member learns to read diffs, leave constructive feedback, and test branches.
                </p>
              </div>
            </div>
          </div>

          {/* Month 3 onward: Pick a Track */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-paper text-ink border border-line">
                  MONTH 03 ONWARD
                </span>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  Pick a Specialization Track & Enter Hackathons
                </h3>
              </div>
              <span className="font-mono text-xs text-muted">
                Advanced Engineering
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              With Git foundations and team collaboration solidified, focus on deep technical domains. Select a track
              aligned with your semester goals and participate in collegiate hackathons with your team.
            </p>

            {/* Track Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-line pb-3 overflow-x-auto no-scrollbar">
              {[
                { id: 'web', label: 'Track A: Modern Web Development', icon: Globe },
                { id: 'ai', label: 'Track B: AI Agents & MCP Servers', icon: Cpu },
                { id: 'core', label: 'Track C: Core CS, DSA & Systems', icon: Layers },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTrack === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTrack(t.id as typeof selectedTrack)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-ink text-paper font-semibold'
                        : 'border border-line bg-paper text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className="size-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Track Content Details */}
            {selectedTrack === 'web' && (
              <div className="p-4 rounded-xl border border-line bg-paper space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
                  <Globe className="size-4 text-safe" />
                  <span>Full-Stack Web Architecture Track</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Learn React, TypeScript, Next.js, and server-side APIs. Connect databases (PostgreSQL with Prisma/Drizzle or Supabase),
                  implement authentication, and deploy serverless functions to Vercel or Cloudflare Pages.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Next.js</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">TypeScript</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">PostgreSQL</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Tailwind CSS</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Vercel</span>
                </div>
              </div>
            )}

            {selectedTrack === 'ai' && (
              <div className="p-4 rounded-xl border border-line bg-paper space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
                  <Cpu className="size-4 text-safe" />
                  <span>Autonomous AI Agents & MCP Toolsets Track</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Leverage what you learned in Phase 9. Build custom Model Context Protocol (MCP) servers using STDIO or HTTP/SSE,
                  grant AI models tools to query campus APIs or college databases, and explore agentic workflows with Copilot and Claude.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">MCP STDIO/SSE</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">JSON-RPC 2.0</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Copilot Agent Mode</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">AI SDK</span>
                </div>
              </div>
            )}

            {selectedTrack === 'core' && (
              <div className="p-4 rounded-xl border border-line bg-paper space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
                  <Layers className="size-4 text-safe" />
                  <span>Core Computer Science, DSA & Systems Track</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Focus on Data Structures, Algorithms, Competitive Programming (Codeforces, LeetCode), and Systems Programming
                  (C++, Rust, Linux internals). Maintain clean GitHub repositories tracking your algorithm solutions and course projects.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">C++20</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Algorithms & DAGs</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Linux CLI</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-ink">Rust</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Habits to Keep Section */}
      <section className="editorial-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink uppercase tracking-wider">
          <ShieldCheck className="size-4 text-safe" />
          <span>Core Engineering Habits to Keep for Your College Career</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-line bg-paper space-y-1.5">
            <p className="font-mono font-bold text-ink text-sm">Commit Regularly</p>
            <p className="text-muted leading-relaxed">
              Never wait until an entire project is finished to commit. Make small, logical commits each time a single subtask is completed.
              This protects you against accidental data loss and creates a clear timeline.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-line bg-paper space-y-1.5">
            <p className="font-mono font-bold text-ink text-sm">Write Decent READMEs</p>
            <p className="text-muted leading-relaxed">
              A repository without a README is an unreadable black box. Always explain what the project does, prerequisites, setup instructions,
              and include a demo link or screenshot.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-line bg-paper space-y-1.5">
            <p className="font-mono font-bold text-ink text-sm">Never Commit Secrets</p>
            <p className="text-muted leading-relaxed">
              API tokens, private keys, database passwords, and .env files must never touch git. Public GitHub bots scrape and revoke leaked keys within seconds.
              Always use .gitignore and environment variables.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default WhatsNextView;