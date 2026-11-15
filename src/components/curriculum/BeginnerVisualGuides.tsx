import React, { useState } from 'react';
import {
  Star,
  GitFork,
  UploadCloud,
  FileCode,
  CheckCircle2,
  Terminal,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  Shield,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Copy,
  Check,
  FolderX,
  EyeOff,
  Lock,
} from 'lucide-react';

export const BeginnerProfileTour: React.FC = () => {
  // Generate 28-day sample contribution squares
  const contributionGrid = [
    [0, 1, 2, 0, 1, 3, 2],
    [1, 2, 0, 3, 2, 1, 0],
    [2, 3, 1, 2, 4, 3, 2],
    [3, 4, 2, 1, 3, 4, 3],
  ];

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-safe/25 border-safe/30';
      case 2:
        return 'bg-safe/50 border-safe/50';
      case 3:
        return 'bg-safe/75 border-safe/70';
      case 4:
        return 'bg-safe border-safe text-white';
      default:
        return 'bg-paper border-line';
    }
  };

  return (
    <div className="editorial-card p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <span className="font-mono text-xs text-safe font-bold uppercase tracking-wider">
            ANATOMY OF A GITHUB PROFILE
          </span>
          <h4 className="font-serif text-2xl text-ink font-semibold mt-1">
            The Digital Engineering Resume
          </h4>
        </div>
        <span className="font-mono text-[11px] text-muted bg-paper px-3 py-1 rounded-full border border-line">
          VISUAL INSPECTION
        </span>
      </div>

      {/* Simulated GitHub Profile Card */}
      <div className="p-5 rounded-2xl border border-line bg-paper/50 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full bg-surface border-2 border-line flex items-center justify-center font-serif text-2xl font-bold text-ink">
              IH
            </div>
            <div>
              <h5 className="font-sans font-bold text-base text-ink">
                Syed Haseeb
              </h5>
              <p className="font-mono text-xs text-muted">@iiitt-student-dev</p>
              <p className="text-xs text-muted mt-1">
                CSE 1st Year • IIIT Tiruchirappalli • Learning Git & System Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-line bg-surface text-xs font-mono text-ink">
              <Award className="size-3.5 text-safe" />
              <span>Quickdraw Badge</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-line bg-surface text-xs font-mono text-ink">
              <Sparkles className="size-3.5 text-warn" />
              <span>Arctic Vault Contributor</span>
            </span>
          </div>
        </div>

        {/* Contribution Activity Graph Simulation */}
        <div className="p-4 rounded-xl border border-line bg-surface space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span className="font-bold text-ink">48 contributions in the last month</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>Less</span>
              <span className="size-2 rounded-xs bg-paper border border-line" />
              <span className="size-2 rounded-xs bg-safe/25 border border-safe/30" />
              <span className="size-2 rounded-xs bg-safe/50 border border-safe/50" />
              <span className="size-2 rounded-xs bg-safe/75 border border-safe/70" />
              <span className="size-2 rounded-xs bg-safe border border-safe" />
              <span>More</span>
            </div>
          </div>

          {/* Grid of contribution squares */}
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {contributionGrid.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {col.map((lvl, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`size-3 rounded-xs border transition-transform hover:scale-125 cursor-pointer ${getColorClass(
                      lvl
                    )}`}
                    title={`Day ${colIdx * 7 + rowIdx + 1}: ${lvl * 2} commits`}
                  />
                ))}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted leading-relaxed pt-1">
            Every green square represents commits pushed from VS Code to GitHub. Recruiters inspect this chart to verify consistency!
          </p>
        </div>
      </div>
    </div>
  );
};

export const UploadMethodsInteractiveGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browser' | 'vscode' | 'cli'>('cli');

  return (
    <div className="editorial-card p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <span className="font-mono text-xs text-safe font-bold uppercase tracking-wider">
            STEP-BY-STEP WORKFLOWS
          </span>
          <h4 className="font-serif text-2xl text-ink font-semibold mt-1">
            How Code Moves from Laptop to Cloud
          </h4>
        </div>
      </div>

      {/* Method Tabs */}
      <div className="flex items-center gap-2 border-b border-line pb-3">
        {[
          { id: 'cli', label: '1. Professional Terminal (CLI)', icon: Terminal },
          { id: 'vscode', label: '2. VS Code Source Control GUI', icon: Layers },
          { id: 'browser', label: '3. Web Browser Drag & Drop', icon: UploadCloud },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-ink text-paper font-semibold shadow-sm'
                  : 'bg-paper text-muted border border-line hover:bg-surface hover:text-ink'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Professional Terminal CLI */}
      {activeTab === 'cli' && (
        <div className="space-y-4 animate-in fade-in">
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            The industry standard way. You write code in VS Code, open the integrated terminal (<kbd className="bg-paper border border-line px-1.5 py-0.5 rounded font-mono text-[10px]">Ctrl + ~</kbd>), and run these 5 commands:
          </p>

          <div className="rounded-xl border border-ink bg-white overflow-hidden font-mono text-xs shadow-sm">
            <div className="bg-paper px-4 py-2 border-b border-line flex items-center justify-between text-muted text-[11px]">
              <span>WINDOWS POWERSHELL / CMD</span>
              <span>PORTAL PROJECT</span>
            </div>
            <div className="p-4 space-y-2 bg-white text-ink leading-relaxed">
              <div>
                <span className="text-safe font-bold">1. git init</span>
                <span className="text-muted block text-[11px] pl-4 font-sans">
                  Initializes the hidden <code className="font-mono text-ink">.git</code> folder database on your laptop.
                </span>
              </div>
              <div>
                <span className="text-safe font-bold">2. git add .</span>
                <span className="text-muted block text-[11px] pl-4 font-sans">
                  Gathers all your code files into the staging area (preparing the package).
                </span>
              </div>
              <div>
                <span className="text-safe font-bold">3. git commit -m "feat: initial college project release"</span>
                <span className="text-muted block text-[11px] pl-4 font-sans">
                  Takes a permanent snapshot with a meaningful description.
                </span>
              </div>
              <div>
                <span className="text-safe font-bold">4. git remote add origin https://github.com/your-username/my-project.git</span>
                <span className="text-muted block text-[11px] pl-4 font-sans">
                  Links your laptop folder to the online GitHub repository address.
                </span>
              </div>
              <div>
                <span className="text-safe font-bold">5. git push -u origin main</span>
                <span className="text-muted block text-[11px] pl-4 font-sans">
                  Transmits the code files over HTTPS to GitHub.com!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: VS Code Built-In GUI */}
      {activeTab === 'vscode' && (
        <div className="space-y-4 animate-in fade-in">
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            Prefer clicking buttons instead of typing? Visual Studio Code has Git built directly into the sidebar:
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                step: 'Step 1',
                title: 'Open Source Control',
                desc: 'Click the branch icon on the far left sidebar in VS Code (or press Ctrl+Shift+G).',
              },
              {
                step: 'Step 2',
                title: 'Type Message & Commit',
                desc: 'Type what you changed in the "Message" box and click the checkmark button Commit.',
              },
              {
                step: 'Step 3',
                title: 'Publish Branch',
                desc: 'Click the blue "Publish to GitHub" button. Select Public or Private, and VS Code uploads it.',
              },
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-line bg-paper/40 space-y-1.5">
                <span className="font-mono text-[10px] text-safe font-bold uppercase">{s.step}</span>
                <h5 className="font-sans text-sm font-semibold text-ink">{s.title}</h5>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Web Drag-and-Drop */}
      {activeTab === 'browser' && (
        <div className="space-y-4 animate-in fade-in">
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            The simplest method for complete beginners on day one:
          </p>

          <div className="p-4 rounded-xl border border-line bg-paper/40 space-y-3 text-xs leading-relaxed">
            <ol className="list-decimal pl-5 space-y-2 text-ink">
              <li>Open <strong>github.com</strong> and click the green <strong>"New"</strong> button to make a repository.</li>
              <li>Inside your empty repository, click <strong>"uploading an existing file"</strong>.</li>
              <li>Drag and drop your project files (HTML, CSS, JS, Python) directly into the browser window.</li>
              <li>Scroll down, type a commit message like <em>"Initial website upload"</em>, and click the green <strong>Commit changes</strong> button.</li>
            </ol>
            <div className="p-3 rounded-lg bg-surface border border-line text-[11px] text-muted">
              💡 <strong>Pro Tip:</strong> This method works great for small single-file projects, but for real multi-file projects, learn the 5 terminal commands so you can update code seamlessly!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CommitDiffExplorer: React.FC = () => {
  return (
    <div className="editorial-card p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <span className="font-mono text-xs text-safe font-bold uppercase tracking-wider">
            SNAPSHOTS & CODE DIFFERENCES
          </span>
          <h4 className="font-serif text-2xl text-ink font-semibold mt-1">
            How Git Records Changes Over Time
          </h4>
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs text-muted uppercase font-bold">
          Chronological Commit Log (git log --oneline):
        </p>
        <div className="space-y-2">
          {[
            {
              sha: '9c4b10e',
              msg: 'feat: add safe bunk margin recovery calculator',
              time: '2 hours ago',
              author: 'iiitt-student',
            },
            {
              sha: '3a1f82d',
              msg: 'docs: write comprehensive README setup instructions',
              time: 'Yesterday',
              author: 'iiitt-student',
            },
            {
              sha: '1b89ef4',
              msg: 'Initial commit: project structure and .gitignore',
              time: '3 days ago',
              author: 'iiitt-student',
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl border border-line bg-paper/60 text-xs font-mono"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-ink">{c.msg}</p>
                <p className="text-[10px] text-muted">
                  {c.author} committed {c.time}
                </p>
              </div>
              <span className="bg-white border border-line px-2 py-0.5 rounded text-[11px] text-safe font-bold">
                {c.sha}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Line-by-Line Diff Viewer Mockup */}
      <div className="rounded-xl border border-ink bg-white overflow-hidden shadow-sm">
        <div className="bg-paper px-4 py-2 border-b border-line flex items-center justify-between text-xs font-mono text-muted">
          <span>DIFF &bull; STUDENT_CALCULATOR.JS</span>
          <span className="text-safe font-semibold">+2 additions, -1 deletion</span>
        </div>

        <div className="p-3 font-mono text-xs space-y-1 bg-white overflow-x-auto">
          <div className="text-muted pl-4">function calculateAttendanceMargin(attended, total) &#123;</div>
          <div className="text-muted pl-8">const currentPercentage = (attended / total) * 100;</div>
          {/* Red deleted line */}
          <div className="bg-risk-soft/70 text-risk px-2 py-1 rounded flex items-center gap-2">
            <Minus className="size-3 shrink-0" />
            <span>const safeBunks = 0; // old broken formula</span>
          </div>
          {/* Green added lines */}
          <div className="bg-safe-soft text-safe px-2 py-1 rounded flex items-center gap-2 font-semibold">
            <Plus className="size-3 shrink-0" />
            <span>const safeBunks = Math.floor((attended - 0.75 * total) / 0.75);</span>
          </div>
          <div className="bg-safe-soft text-safe px-2 py-1 rounded flex items-center gap-2 font-semibold">
            <Plus className="size-3 shrink-0" />
            <span>return Math.max(0, safeBunks);</span>
          </div>
          <div className="text-muted pl-4">&#125;</div>
        </div>
      </div>
    </div>
  );
};

export const GitIgnoreInteractiveGuide: React.FC = () => {
  // Simulated project files
  const [ignoredRules, setIgnoredRules] = useState<Record<string, boolean>>({
    'node_modules/': true,
    '.env': true,
    '*.log': true,
    'dist/': false,
    '.DS_Store': true,
  });

  const [activeTemplate, setActiveTemplate] = useState<'node' | 'python' | 'cpp'>('node');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const sampleFiles = [
    { name: '.env', type: 'secret', rule: '.env', desc: 'Private OpenAI & Supabase DB keys' },
    { name: 'node_modules/react', type: 'dep', rule: 'node_modules/', desc: 'Heavy 150MB third-party library' },
    { name: 'debug.log', type: 'log', rule: '*.log', desc: 'Temporary local debug crash log' },
    { name: 'dist/bundle.js', type: 'build', rule: 'dist/', desc: 'Compiled production build artifact' },
    { name: '.DS_Store', type: 'os', rule: '.DS_Store', desc: 'Hidden macOS desktop indexing file' },
    { name: 'src/App.tsx', type: 'code', rule: null, desc: 'Your actual application code' },
    { name: 'src/index.css', type: 'code', rule: null, desc: 'Your styles and UI theme' },
    { name: 'package.json', type: 'manifest', rule: null, desc: 'Project configuration & dependency list' },
    { name: 'README.md', type: 'docs', rule: null, desc: 'Documentation & lab report instructions' },
  ];

  const templates = {
    node: `# Logs\nlogs\n*.log\nnpm-debug.log*\n\n# Dependency directories (NEVER commit node_modules!)\nnode_modules/\n\n# Production build output\ndist/\nbuild/\n\n# Environment variables & secrets (CRITICAL!)\n.env\n.env.local\n.env.*.local\n\n# OS Junk\n.DS_Store\nThumbs.db`,
    python: `# Byte-compiled / optimized files\n__pycache__/\n*.py[cod]\n*$py.class\n\n# Virtual environments (NEVER commit virtual environments!)\n.venv/\nvenv/\nenv/\n\n# Environment variables & API keys\n.env\nsecrets.json\n\n# Jupyter Notebook checkpoints\n.ipynb_checkpoints\n\n# OS junk\n.DS_Store`,
    cpp: `# Compiled Object files and binaries\n*.o\n*.obj\n*.exe\n*.out\n*.app\n\n# Debug directories\nDebug/\nRelease/\n*.dSYM/\n\n# Editor settings\n.vscode/\n.idea/\n\n# OS Junk\nThumbs.db\n.DS_Store`,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="editorial-card p-6 sm:p-8 space-y-8 border border-line bg-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase font-semibold text-safe bg-safe-soft px-2.5 py-0.5 rounded-full border border-safe/25 mb-1.5">
            <Shield className="size-3" />
            <span>CRITICAL REPOSITORY DISCIPLINE</span>
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
            What is .gitignore & Why is it Critical?
          </h4>
        </div>
        <span className="font-mono text-xs text-muted bg-paper px-3 py-1 rounded-full border border-line self-start sm:self-auto">
          INTERACTIVE SIMULATOR
        </span>
      </div>

      {/* 3 Major Pillars of .gitignore */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-risk/30 bg-risk-soft/30 space-y-2">
          <div className="flex items-center gap-2 text-risk font-mono text-xs font-bold uppercase tracking-wider">
            <Lock className="size-4" />
            <span>1. Prevent Leaking Secrets</span>
          </div>
          <p className="text-xs text-ink/90 leading-relaxed font-sans">
            Accidentally uploading a <code className="font-mono bg-white px-1 rounded text-risk font-bold">.env</code> file exposes your database passwords and OpenAI/Firebase API keys. Automated bots scan GitHub in real-time and exploit exposed keys within seconds!
          </p>
        </div>

        <div className="p-4 rounded-xl border border-warn/30 bg-warn-soft/30 space-y-2">
          <div className="flex items-center gap-2 text-warn font-mono text-xs font-bold uppercase tracking-wider">
            <FolderX className="size-4" />
            <span>2. Stop Repository Bloat</span>
          </div>
          <p className="text-xs text-ink/90 leading-relaxed font-sans">
            Folders like <code className="font-mono bg-white px-1 rounded text-warn font-bold">node_modules/</code> or <code className="font-mono bg-white px-1 rounded text-warn font-bold">.venv/</code> can contain over 150,000 files and weigh 500MB! Teammates install dependencies with one command (<code className="font-mono text-[11px]">npm install</code>). Never commit them!
          </p>
        </div>

        <div className="p-4 rounded-xl border border-line bg-paper/60 space-y-2">
          <div className="flex items-center gap-2 text-ink font-mono text-xs font-bold uppercase tracking-wider">
            <EyeOff className="size-4 text-safe" />
            <span>3. Block OS & Editor Junk</span>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Operating systems create hidden files like <code className="font-mono bg-white px-1 rounded text-ink">.DS_Store</code> (Mac) and <code className="font-mono bg-white px-1 rounded text-ink">Thumbs.db</code> (Windows) that pollute code reviews and cause unnecessary merge conflicts.
          </p>
        </div>
      </div>

      {/* Interactive Simulator: Toggle Rules & See File Tracking */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-2">
            <FileText className="size-3.5 text-safe" />
            <span>Live Interactive .gitignore Rule Simulator</span>
          </h5>
          <span className="font-mono text-[11px] text-muted">
            Toggle rules below to see which files get ignored vs uploaded
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* Left: Simulated .gitignore file editor / toggles */}
          <div className="editorial-card p-4 sm:p-5 border border-line bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2 text-xs font-mono">
              <span className="font-bold text-ink">.gitignore (Root of Project)</span>
              <span className="text-[10px] text-safe bg-safe-soft px-2 py-0.5 rounded-full font-bold">
                RULES ACTIVE
              </span>
            </div>

            <p className="text-[11px] text-muted font-sans leading-tight">
              Click any rule below to toggle whether Git ignores that pattern:
            </p>

            <div className="space-y-2 font-mono text-xs">
              {[
                { rule: '.env', label: '.env (Secrets & API Keys)', desc: 'Blocks all environment variable files' },
                { rule: 'node_modules/', label: 'node_modules/ (Dependencies)', desc: 'Blocks large 500MB dependencies folder' },
                { rule: '*.log', label: '*.log (Debug Logs)', desc: 'Blocks any file ending with .log' },
                { rule: 'dist/', label: 'dist/ (Build Artifacts)', desc: 'Blocks compiled production bundles' },
                { rule: '.DS_Store', label: '.DS_Store (OS Files)', desc: 'Blocks Mac desktop metadata files' },
              ].map((item) => {
                const isActive = ignoredRules[item.rule];
                return (
                  <button
                    key={item.rule}
                    type="button"
                    onClick={() =>
                      setIgnoredRules((prev) => ({ ...prev, [item.rule]: !isActive }))
                    }
                    className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isActive
                        ? 'border-safe bg-safe-soft/30 text-ink ring-1 ring-safe/30'
                        : 'border-line bg-paper/40 text-muted line-through'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">
                        {isActive ? item.rule : `# ${item.rule} (DISABLED)`}
                      </div>
                      <div className="text-[10px] text-muted font-sans mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-safe text-paper' : 'bg-line text-muted'
                      }`}
                    >
                      {isActive ? 'IGNORING' : 'OFF'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Simulated Files in Working Directory */}
          <div className="editorial-card p-4 sm:p-5 border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2 text-xs font-mono">
              <span className="font-bold text-ink">Project Files & Staging Status</span>
              <span className="text-[11px] text-muted">What goes to GitHub?</span>
            </div>

            <div className="divide-y divide-line/60 text-xs font-mono">
              {sampleFiles.map((file, idx) => {
                const isIgnored = file.rule ? ignoredRules[file.rule] : false;

                return (
                  <div
                    key={idx}
                    className={`py-2.5 px-2 flex items-center justify-between gap-2 rounded-lg transition-colors ${
                      isIgnored
                        ? 'bg-paper/40 text-muted'
                        : file.type === 'secret'
                        ? 'bg-risk-soft/40 text-risk font-semibold'
                        : 'text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isIgnored ? (
                        <EyeOff className="size-3.5 text-muted shrink-0" />
                      ) : file.type === 'secret' ? (
                        <AlertTriangle className="size-3.5 text-risk shrink-0" />
                      ) : (
                        <CheckCircle2 className="size-3.5 text-safe shrink-0" />
                      )}
                      <div className="truncate">
                        <span className="font-bold">{file.name}</span>
                        <span className="hidden sm:inline text-[10px] text-muted font-sans ml-2">
                          ({file.desc})
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isIgnored ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase font-bold text-muted bg-paper border border-line px-2 py-0.5 rounded-full">
                          <Shield className="size-2.5 text-safe" />
                          <span>IGNORED (SAFE)</span>
                        </span>
                      ) : file.type === 'secret' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase font-bold text-risk bg-risk-soft px-2 py-0.5 rounded-full border border-risk/30">
                          <ShieldAlert className="size-2.5" />
                          <span>DANGER: WILL UPLOAD!</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase font-bold text-safe bg-safe-soft px-2 py-0.5 rounded-full border border-safe/25">
                          TRACKED & PUSHED
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Starter .gitignore Templates */}
      <div className="space-y-3 pt-2 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink">
            READY-TO-USE STARTER TEMPLATES FOR IIIT TRICHY STUDENTS:
          </span>
          <div className="flex items-center gap-1 bg-paper p-1 rounded-full border border-line text-xs font-mono">
            {[
              { id: 'node', label: 'Node.js / React' },
              { id: 'python', label: 'Python / AI' },
              { id: 'cpp', label: 'C / C++ Labs' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTemplate(t.id as typeof activeTemplate)}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  activeTemplate === t.id
                    ? 'bg-surface text-ink font-bold shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Code Preview Box */}
        <div className="rounded-xl border border-line bg-white overflow-hidden shadow-sm">
          <div className="bg-paper px-4 py-2 border-b border-line flex items-center justify-between text-xs font-mono">
            <span className="text-muted font-bold">.gitignore ({activeTemplate.toUpperCase()})</span>
            <button
              type="button"
              onClick={() => handleCopy(templates[activeTemplate])}
              className="inline-flex items-center gap-1.5 text-xs text-safe hover:text-ink cursor-pointer transition-colors"
            >
              {copiedTemplate ? (
                <>
                  <Check className="size-3 text-safe" />
                  <span className="font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed bg-white text-ink overflow-x-auto max-h-[160px] custom-scroll">
            <code>{templates[activeTemplate]}</code>
          </pre>
        </div>
      </div>

      {/* Pro Tip Callout: "What if I already committed a secret?" */}
      <div className="p-4 rounded-xl border border-warn/30 bg-warn-soft/30 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-warn font-mono font-bold uppercase tracking-wider">
          <AlertTriangle className="size-4" />
          <span>PRO TIP: What if you already committed a secret before adding it to .gitignore?</span>
        </div>
        <p className="text-ink leading-relaxed font-sans">
          Adding a file to <code className="font-mono bg-white px-1 rounded">.gitignore</code> does NOT delete it from Git's existing history! If you already committed a private file, run this command to stop tracking it without deleting it from your laptop:
        </p>
        <div className="p-2.5 rounded-lg bg-surface border border-line font-mono text-xs text-ink">
          <code>git rm --cached .env</code>
        </div>
        <p className="text-[11px] text-muted leading-relaxed font-sans">
          Then commit the change (<code className="font-mono text-ink">git commit -m "chore: remove .env from tracking"</code>) and push. Most importantly: <strong>Always revoke the leaked API key immediately on OpenAI/Firebase</strong>, because commit history remains permanently accessible!
        </p>
      </div>
    </div>
  );
};
