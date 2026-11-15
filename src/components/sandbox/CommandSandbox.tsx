import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  GitCommit,
  GitBranch,
  Layers,
  ArrowRight,
  Shield,
  FileCode,
  HardDrive,
  Cloud,
  CheckCircle2,
} from 'lucide-react';

interface GitObject {
  sha: string;
  type: 'blob' | 'tree' | 'commit';
  name?: string;
  msg?: string;
}

interface CommitNode {
  sha: string;
  message: string;
  branch: string;
  timestamp: string;
}

export const CommandSandbox: React.FC = () => {
  const { updateChecklist } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Microsoft Windows [Version 10.0.22631.4317]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'C:\\Users\\iiitt-dev\\projects\\attendance> git status',
    'fatal: not a git repository (or any of the parent directories): .git',
    'Hint: Type "git init" to create a new Git repository.',
    '',
  ]);

  // Simulated Git state
  const [isRepoInit, setIsRepoInit] = useState(false);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [workingFiles, setWorkingFiles] = useState<{ name: string; status: 'untracked' | 'staged' | 'committed' }[]>([
    { name: 'index.html', status: 'untracked' },
    { name: 'app.js', status: 'untracked' },
    { name: 'styles.css', status: 'untracked' },
  ]);
  const [commits, setCommits] = useState<CommitNode[]>([]);
  const [objects, setObjects] = useState<GitObject[]>([]);
  const [remoteSynced, setRemoteSynced] = useState(false);
  const [reflogList, setReflogList] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [logs]);

  const generateSha = () => {
    return Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    // Mark checklist task verified
    updateChecklist('ranSandboxCmd', true);

    const newLogs = [...logs, `C:\\Users\\iiitt-dev\\projects\\attendance> ${raw}`];

    const lower = raw.toLowerCase().replace(/\s+/g, ' ');

    if (lower === 'cls' || lower === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newLogs.push(
        'Supported Git Sandbox Commands:',
        '  git init                  - Initialize a new local Git repository (.git)',
        '  git status                - Inspect working directory & staging index state',
        '  git add <file> | git add . - Stage modified files into the index buffer',
        '  git commit -m "<msg>"     - Create an immutable commit object in .git/objects',
        '  git branch <name>         - Create a new branch pointer',
        '  git checkout -b <name>    - Create and switch to a new branch',
        '  git log --oneline         - Print DAG commit history',
        '  git push origin <branch>  - Transmit local commit objects to remote GitHub',
        '  git reflog                - Display chronological HEAD movement reference log',
        '  git fsck                  - Verify cryptographic database integrity',
        '  cls | clear               - Clear terminal screen'
      );
    } else if (lower === 'git init') {
      if (isRepoInit) {
        newLogs.push('Reinitialized existing Git repository in C:/Users/iiitt-dev/projects/attendance/.git/');
      } else {
        setIsRepoInit(true);
        newLogs.push(
          'Initialized empty Git repository in C:/Users/iiitt-dev/projects/attendance/.git/',
          'Created .git/objects/ directory for loose SHA-1 compression',
          'Created .git/refs/heads/ for branch pointers'
        );
      }
    } else if (!isRepoInit) {
      newLogs.push('fatal: not a git repository (or any of the parent directories): .git');
    } else if (lower === 'git status') {
      const staged = workingFiles.filter((f) => f.status === 'staged');
      const untracked = workingFiles.filter((f) => f.status === 'untracked');

      newLogs.push(`On branch ${currentBranch}`);
      if (commits.length === 0) {
        newLogs.push('No commits yet');
      }

      if (staged.length > 0) {
        newLogs.push('Changes to be committed:');
        newLogs.push('  (use "git restore --staged <file>..." to unstage)');
        staged.forEach((f) => newLogs.push(`        new file:   ${f.name}`));
      }

      if (untracked.length > 0) {
        newLogs.push('Untracked files:');
        newLogs.push('  (use "git add <file>..." to include in what will be committed)');
        untracked.forEach((f) => newLogs.push(`        ${f.name}`));
      }

      if (staged.length === 0 && untracked.length === 0) {
        newLogs.push('nothing to commit, working tree clean');
      }
    } else if (lower.startsWith('git add')) {
      const parts = lower.split(' ');
      const target = parts[2];
      if (!target) {
        newLogs.push('Nothing specified, nothing added.');
      } else {
        const newWorking = workingFiles.map((f) => {
          if (target === '.' || target === f.name) {
            return { ...f, status: 'staged' as const };
          }
          return f;
        });
        setWorkingFiles(newWorking);

        // Add blob objects to .git/objects
        const stagedNow = newWorking.filter((f) => f.status === 'staged');
        const newObjs: GitObject[] = stagedNow.map((f) => ({
          sha: generateSha(),
          type: 'blob',
          name: f.name,
        }));
        setObjects((prev) => [...prev, ...newObjs]);

        newLogs.push(`Staged ${target === '.' ? 'all modified files' : target} into index.`);
        newLogs.push('Created SHA-1 blob objects in .git/objects/');
      }
    } else if (lower.startsWith('git commit')) {
      const match = raw.match(/-m\s+["'](.+?)["']/i);
      const msg = match ? match[1] : 'Commit changes';
      const staged = workingFiles.filter((f) => f.status === 'staged');

      if (staged.length === 0) {
        newLogs.push('On branch ' + currentBranch);
        newLogs.push('nothing to commit, working tree clean');
      } else {
        const commitSha = generateSha();
        const treeSha = generateSha();

        const newCommitNode: CommitNode = {
          sha: commitSha.substring(0, 7),
          message: msg,
          branch: currentBranch,
          timestamp: new Date().toLocaleTimeString(),
        };

        setCommits((prev) => [newCommitNode, ...prev]);

        // Add tree and commit object
        setObjects((prev) => [
          { sha: treeSha, type: 'tree' },
          { sha: commitSha, type: 'commit', msg },
          ...prev,
        ]);

        // mark files committed
        setWorkingFiles((prev) =>
          prev.map((f) => (f.status === 'staged' ? { ...f, status: 'committed' as const } : f))
        );

        setReflogList((prev) => [`${commitSha.substring(0, 7)} HEAD@{${prev.length}}: commit: ${msg}`, ...prev]);

        newLogs.push(`[${currentBranch} ${commitSha.substring(0, 7)}] ${msg}`);
        newLogs.push(` ${staged.length} files changed, ${staged.length * 14} insertions(+)`);
        newLogs.push(` create mode 100644 ${staged.map((f) => f.name).join(', ')}`);
      }
    } else if (lower.startsWith('git branch')) {
      const parts = lower.split(' ');
      const branchName = parts[2];
      if (!branchName) {
        newLogs.push(`* ${currentBranch}`);
      } else {
        newLogs.push(`Created branch refs/heads/${branchName}`);
      }
    } else if (lower.startsWith('git checkout -b') || lower.startsWith('git switch -c')) {
      const parts = lower.split(' ');
      const branchName = parts[parts.length - 1];
      if (branchName) {
        setCurrentBranch(branchName);
        newLogs.push(`Switched to a new branch '${branchName}'`);
        setReflogList((prev) => [`HEAD@{${prev.length}}: checkout: moving to ${branchName}`, ...prev]);
      }
    } else if (lower === 'git log' || lower === 'git log --oneline') {
      if (commits.length === 0) {
        newLogs.push('fatal: your current branch does not have any commits yet');
      } else {
        commits.forEach((c) => {
          newLogs.push(`${c.sha} (${currentBranch === c.branch ? 'HEAD -> ' + c.branch : c.branch}) ${c.message}`);
        });
      }
    } else if (lower.startsWith('git push')) {
      if (commits.length === 0) {
        newLogs.push('error: src refspec main does not match any');
      } else {
        setRemoteSynced(true);
        newLogs.push('Enumerating objects: ' + objects.length + ', done.');
        newLogs.push('Counting objects: 100% (' + objects.length + '/' + objects.length + '), done.');
        newLogs.push('Writing objects: 100% (' + objects.length + '/' + objects.length + '), done.');
        newLogs.push('Total ' + objects.length + ' (delta 0), reused 0');
        newLogs.push('To https://github.com/iiitt-devs/campus-portal.git');
        newLogs.push(` * [new branch]      ${currentBranch} -> ${currentBranch}`);
        newLogs.push(`Branch '${currentBranch}' set up to track remote branch '${currentBranch}' from 'origin'.`);
      }
    } else if (lower === 'git reflog') {
      if (reflogList.length === 0) {
        newLogs.push('fatal: your current branch does not have any reflog entries yet');
      } else {
        reflogList.forEach((r) => newLogs.push(r));
      }
    } else if (lower === 'git fsck') {
      newLogs.push('Checking object directories: 100% (256/256), done.');
      newLogs.push(`Checking objects: 100% (${objects.length}/${objects.length}), done.`);
      newLogs.push(`Database integrity verified: 0 corrupt objects, 0 dangling references.`);
    } else {
      newLogs.push(`'${raw}' is not recognized as an internal or external command.`);
      newLogs.push('Type "help" to view supported commands.');
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const resetSandbox = () => {
    setIsRepoInit(false);
    setCurrentBranch('main');
    setWorkingFiles([
      { name: 'index.html', status: 'untracked' },
      { name: 'app.js', status: 'untracked' },
      { name: 'styles.css', status: 'untracked' },
    ]);
    setCommits([]);
    setObjects([]);
    setRemoteSynced(false);
    setReflogList([]);
    setLogs([
      'Microsoft Windows [Version 10.0.22631.4317]',
      '(c) Microsoft Corporation. All rights reserved.',
      '',
      'C:\\Users\\iiitt-dev\\projects\\attendance> git status',
      'fatal: not a git repository (or any of the parent directories): .git',
      'Hint: Type "git init" to create a new Git repository.',
      '',
    ]);
  };

  return (
    <div className="space-y-8 sm:space-y-10 view-enter">
      {/* Header Banner */}
      <section className="border-b border-line pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs text-muted shadow-xs mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-safe">
            LIVE KERNEL SIMULATION • SHA-1 OBJECT GRAPH
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink uppercase">
          Windows CMD Sandbox <br />
          <span className="text-safe italic font-normal">& Live Git Object DAG.</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-muted">
          Type genuine Git commands into the command prompt below. Observe how files move through the working directory,
          compress into the staging index, generate cryptographic SHA-1 blobs/trees in <code className="bg-paper px-1.5 py-0.5 rounded border border-line">.git/objects</code>,
          and synchronize with remote GitHub.
        </p>
      </section>

      {/* Main Responsive Grid: Terminal Console on Left, Live DAG on Right */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left Column: Authentic Windows CMD Window */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-line bg-white overflow-hidden shadow-md">
            {/* Windows Chrome Window Header */}
            <div className="bg-paper border-b border-line px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <TerminalIcon className="size-3.5 sm:size-4 text-ink shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs text-ink font-semibold truncate">
                  Command Prompt • cmd.exe • C:\Users\iiitt-dev\projects\attendance
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={resetSandbox}
                  className="flex items-center gap-1 text-[11px] font-mono text-muted hover:text-ink transition-colors cursor-pointer"
                  title="Reset Sandbox"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-3.5 sm:p-5 font-mono text-xs leading-relaxed bg-white text-ink min-h-[320px] sm:min-h-[380px] max-h-[460px] overflow-y-auto custom-scroll space-y-1">
              {logs.length === 0 ? (
                /* Helpful Empty State */
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                  <TerminalIcon className="size-8 text-line" />
                  <p className="font-mono text-xs text-muted">
                    Terminal screen cleared. Click a starter command below or type <code className="bg-paper px-1.5 py-0.5 rounded text-safe font-bold">git init</code> to begin.
                  </p>
                </div>
              ) : (
                logs.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap ${
                      line.startsWith('C:\\')
                        ? 'text-ink font-bold'
                        : line.startsWith('fatal:') || line.startsWith('error:')
                        ? 'text-risk font-semibold'
                        : line.startsWith('[') || line.includes('Initialized')
                        ? 'text-safe'
                        : 'text-muted'
                    }`}
                  >
                    {line}
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="p-3 bg-paper border-t border-line flex items-center gap-2"
            >
              <span className="font-mono text-xs text-safe font-bold select-none pl-1">
                &gt;
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'git init', 'git status', 'git add .', 'git commit -m &quot;feat&quot;', 'help'..."
                className="w-full bg-transparent font-mono text-xs text-ink outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-ink text-paper font-mono text-xs font-semibold cursor-pointer shrink-0"
              >
                Enter
              </button>
            </form>
          </div>

          {/* Quick Command Starters */}
          <div className="editorial-card p-3 sm:p-4 border border-line bg-surface space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-muted tracking-wider">
              CLICK TO EXECUTE STARTER COMMAND:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'git init',
                'git status',
                'git add .',
                'git commit -m "feat: initial commit"',
                'git branch feature-auth',
                'git log --oneline',
                'git push origin main',
                'help',
                'cls',
              ].map((cmd, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCommand(cmd)}
                  className="px-2.5 py-1 rounded-lg border border-line bg-paper hover:bg-surface text-ink font-mono text-[11px] cursor-pointer transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Git Architectural State & Object DAG */}
        <div className="space-y-4">
          {/* Staging Index & Working Directory State */}
          <div className="editorial-card p-4 sm:p-5 border border-line bg-surface space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs font-bold text-safe uppercase flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>WORKING TREE & STAGING BUFFER</span>
              </span>
              <span className="font-mono text-[10px] text-muted">
                {isRepoInit ? '.git Initialized' : 'Uninitialized'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="p-2.5 rounded-xl border border-line bg-paper/50">
                <span className="text-[10px] text-muted block uppercase">Untracked</span>
                <span className="text-base font-bold text-ink">
                  {workingFiles.filter((f) => f.status === 'untracked').length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-safe/30 bg-safe-soft/30">
                <span className="text-[10px] text-safe block uppercase">Staged (Index)</span>
                <span className="text-base font-bold text-safe">
                  {workingFiles.filter((f) => f.status === 'staged').length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-line bg-paper/50">
                <span className="text-[10px] text-muted block uppercase">Committed</span>
                <span className="text-base font-bold text-ink">
                  {workingFiles.filter((f) => f.status === 'committed').length}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs pt-1">
              {workingFiles.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg border border-line/60 bg-paper/30"
                >
                  <span className="text-ink">{f.name}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      f.status === 'staged'
                        ? 'bg-safe text-paper'
                        : f.status === 'committed'
                        ? 'bg-paper text-muted border border-line'
                        : 'bg-warn-soft text-warn'
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Object DAG History Visualizer */}
          <div className="editorial-card p-4 sm:p-5 border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs font-bold text-ink uppercase flex items-center gap-1.5">
                <GitCommit className="size-3.5 text-safe" />
                <span>COMMIT DAG & .GIT/OBJECTS</span>
              </span>
              <span className="font-mono text-xs text-muted">
                {commits.length} Snapshots
              </span>
            </div>

            {commits.length === 0 ? (
              <div className="py-8 text-center text-muted font-mono text-xs space-y-1">
                <p>No commits recorded yet.</p>
                <p className="text-[11px] text-muted/70">
                  Run <code className="bg-paper px-1 py-0.5 rounded">git add .</code> followed by <code className="bg-paper px-1 py-0.5 rounded">git commit -m "..."</code>
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {commits.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-line bg-paper/40 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-safe font-bold">{c.sha}</span>
                      <span className="text-ink font-sans font-medium line-clamp-1">
                        {c.message}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted bg-paper px-2 py-0.5 rounded-full border border-line">
                      {c.branch}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
