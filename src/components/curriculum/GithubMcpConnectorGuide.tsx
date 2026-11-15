import React, { useState } from 'react';
import {
  Bot,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  GitPullRequest,
  FileCode,
  Bug,
  GitBranch,
  UploadCloud,
  Search,
  Sparkles,
  ArrowRight,
  Key,
} from 'lucide-react';

type SupportedAITool = 'claude' | 'chatgpt' | 'deepseek' | 'grok' | 'cursor';

export const GithubMcpConnectorGuide: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<SupportedAITool>('claude');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const toolConfigs: Record<
    SupportedAITool,
    {
      name: string;
      badge: string;
      color: string;
      configPathWindows: string;
      configPathMac: string;
      configJson: string;
      testPrompt: string;
      setupInstructions: string[];
    }
  > = {
    claude: {
      name: 'Claude Desktop & Claude Code',
      badge: 'OFFICIAL ANTHROPIC CLIENT',
      color: 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]',
      configPathWindows: '%APPDATA%\\Claude\\claude_desktop_config.json',
      configPathMac: '~/Library/Application Support/Claude/claude_desktop_config.json',
      configJson: JSON.stringify(
        {
          mcpServers: {
            github: {
              command: 'npx',
              args: ['-y', '@modelcontextprotocol/server-github'],
              env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
              },
            },
          },
        },
        null,
        2
      ),
      testPrompt:
        'Please list my recent repositories and check the open issues on iiitt-devs/campus-portal.',
      setupInstructions: [
        'Generate a GitHub Personal Access Token (classic) with "repo" and "workflow" scopes at github.com/settings/tokens.',
        'Open Claude Desktop, go to Settings -> Developer -> Edit Config (or open the JSON path above in VS Code).',
        'Paste the JSON configuration below, replacing "ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE" with your token.',
        'Restart Claude Desktop. The hammer / tool icon will show active GitHub tools!',
      ],
    },
    chatgpt: {
      name: 'ChatGPT (Desktop & OpenAI Operator)',
      badge: 'OPENAI MCP CLIENT',
      color: 'border-[#10A37F] bg-[#10A37F]/10 text-[#10A37F]',
      configPathWindows: '%APPDATA%\\OpenAI\\chatgpt_mcp_config.json',
      configPathMac: '~/Library/Application Support/OpenAI/chatgpt_mcp_config.json',
      configJson: JSON.stringify(
        {
          mcpServers: {
            github: {
              command: 'docker',
              args: ['run', '-i', '--rm', '-e', 'GITHUB_PERSONAL_ACCESS_TOKEN', 'mcp/github'],
              env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
              },
            },
          },
        },
        null,
        2
      ),
      testPrompt:
        'Inspect my current repository branch, review open Pull Requests, and draft a summary of changes.',
      setupInstructions: [
        'Ensure you have Docker or Node.js installed on your machine.',
        'Generate a GitHub Personal Access Token at github.com/settings/tokens with "repo" permissions.',
        'In ChatGPT Desktop Settings -> Developer / Integrations -> Add MCP Server, or paste into config file.',
        'Save and ask ChatGPT: "List my GitHub repositories and tell me what branches exist."',
      ],
    },
    deepseek: {
      name: 'DeepSeek (via Cline / Roo Code / Cursor)',
      badge: 'DEEPSEEK V3 & R1 REASONING',
      color: 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]',
      configPathWindows: '%APPDATA%\\Code\\User\\globalStorage\\rooveterinaryinc.roo-cline\\settings\\cline_mcp_settings.json',
      configPathMac: '~/Library/Application Support/Code/User/globalStorage/.../cline_mcp_settings.json',
      configJson: JSON.stringify(
        {
          mcpServers: {
            github: {
              command: 'npx',
              args: ['-y', '@modelcontextprotocol/server-github'],
              env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
              },
            },
          },
        },
        null,
        2
      ),
      testPrompt:
        'Search for bug issues labeled "help wanted" across my GitHub repositories, inspect the code, and propose a pull request.',
      setupInstructions: [
        'Open VS Code with the Cline or Roo Code extension installed, configured with your DeepSeek API key.',
        'Click the MCP icon in the Cline/Roo sidebar and click "Configure MCP Servers".',
        'Paste the JSON configuration below with your GitHub PAT token.',
        'DeepSeek will now autonomously inspect repositories, edit code, and create commits!',
      ],
    },
    grok: {
      name: 'xAI Grok (MCP & API Client)',
      badge: 'XAI GROK REASONING ENGINE',
      color: 'border-[#16181D] bg-[#16181D]/10 text-[#16181D]',
      configPathWindows: '~/.grok/mcp_config.json',
      configPathMac: '~/.grok/mcp_config.json',
      configJson: JSON.stringify(
        {
          mcpServers: {
            github: {
              command: 'npx',
              args: ['-y', '@modelcontextprotocol/server-github'],
              env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
              },
            },
          },
        },
        null,
        2
      ),
      testPrompt:
        'Analyze my repository commit history for the last 14 days and summarize who contributed which features.',
      setupInstructions: [
        'In your Grok MCP host configuration (or CLI runner), set up the stdio command.',
        'Add your GitHub Personal Access Token to the environment variable block.',
        'Launch Grok and test query: "Inspect my latest GitHub commits and identify any security vulnerabilities in my dependencies."',
      ],
    },
    cursor: {
      name: 'Cursor & Windsurf IDE',
      badge: 'NATIVE AI CODE EDITORS',
      color: 'border-safe bg-safe-soft text-safe',
      configPathWindows: 'Cursor Settings -> Features -> MCP -> Add New MCP Server',
      configPathMac: 'Cursor Settings -> Features -> MCP -> Add New MCP Server',
      configJson: JSON.stringify(
        {
          name: 'github',
          type: 'command',
          command: 'npx -y @modelcontextprotocol/server-github',
          env: {
            GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
          },
        },
        null,
        2
      ),
      testPrompt:
        'Create a new branch "fix-auth-token", edit src/auth.ts to fix the null check bug, commit the changes, and open a Pull Request.',
      setupInstructions: [
        'Open Cursor Settings (Ctrl + , or Cmd + ,), click on "Features", and select "MCP".',
        'Click "+ Add New MCP Server".',
        'Name: "github", Type: "command", Command: "npx -y @modelcontextprotocol/server-github".',
        'Add GITHUB_PERSONAL_ACCESS_TOKEN under environment variables with your GitHub PAT token.',
        'Now Cursor Composer can edit, commit, and push straight to your GitHub account!',
      ],
    },
  };

  const currentTool = toolConfigs[selectedTool];

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(currentTool.configJson);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentTool.testPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="editorial-card p-6 sm:p-8 space-y-8 border border-line bg-surface">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase font-semibold text-safe bg-safe-soft px-2.5 py-0.5 rounded-full border border-safe/25 mb-1.5">
            <Bot className="size-3" />
            <span>AI AGENT SUPERPOWERS • GITHUB MCP INTEGRATION</span>
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
            What AI Can Do When Connected to GitHub via MCP
          </h4>
        </div>
        <span className="font-mono text-xs text-muted bg-paper px-3 py-1 rounded-full border border-line self-start sm:self-auto">
          UNIVERSAL AI PROTOCOL
        </span>
      </div>

      {/* 5 Superpowers AI Gains with GitHub MCP */}
      <div className="space-y-3">
        <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-ink">
          The 5 Superpowers Your AI Model Unlocks:
        </h5>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              icon: Search,
              title: '1. Inspect Repos & File Trees',
              desc: 'No more copy-pasting code! The AI reads entire directory trees, multi-file modules, and commit histories directly from github.com.',
            },
            {
              icon: FileCode,
              title: '2. Directly Edit & Commit Files',
              desc: 'Ask the AI to change code—it creates the commit snapshot, writes the commit message, and updates the repository in real time.',
            },
            {
              icon: GitBranch,
              title: '3. Create Branches & Push Diffs',
              desc: 'AI can spin up a new feature branch (e.g. "feat-dark-mode"), apply changes, and push without you touching the command prompt.',
            },
            {
              icon: GitPullRequest,
              title: '4. Open & Review Pull Requests',
              desc: 'AI drafts side-by-side pull request diffs, reviews your teammates’ PRs, comments on specific lines, and helps with merging.',
            },
            {
              icon: Bug,
              title: '5. Autonomous Bug Fixing',
              desc: 'Point the AI to a GitHub Issue URL: it reads the bug report, locates the faulty file in the repo, writes the patch, and submits a PR fix!',
            },
            {
              icon: ShieldCheck,
              title: '6. Safe Token Governance',
              desc: 'You control what the AI can and cannot do using your Personal Access Token. Revoke permissions anytime with zero risk.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl border border-line bg-paper/40 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-surface border border-line text-safe">
                    <Icon className="size-3.5" />
                  </div>
                  <h6 className="font-sans text-xs font-bold text-ink">{item.title}</h6>
                </div>
                <p className="text-xs text-muted leading-relaxed font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tool Selector */}
      <div className="space-y-4 pt-4 border-t border-line">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
            <Key className="size-3.5 text-safe" />
            <span>Which AI Tool Do You Use? Select to Get Your Step-by-Step Connection Setup:</span>
          </label>
          <p className="text-xs text-muted">
            Click your primary AI interface to generate the exact JSON configuration and file paths.
          </p>
        </div>

        {/* Tool Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'claude', label: 'Claude', sub: 'Desktop / Code' },
            { id: 'chatgpt', label: 'ChatGPT', sub: 'Desktop / Operator' },
            { id: 'deepseek', label: 'DeepSeek', sub: 'Cline / Roo Code' },
            { id: 'cursor', label: 'Cursor', sub: 'AI Editor' },
            { id: 'grok', label: 'Grok', sub: 'xAI Reasoning' },
          ].map((tool) => {
            const isSelected = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedTool(tool.id as SupportedAITool)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-safe bg-surface shadow-md ring-2 ring-safe/25'
                    : 'border-line bg-paper/60 hover:bg-surface text-muted hover:text-ink'
                }`}
              >
                <div className="font-sans text-xs font-bold text-ink">{tool.label}</div>
                <div className="font-mono text-[10px] text-muted mt-0.5">{tool.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tool Setup Guide */}
        <div className="p-5 rounded-2xl border border-line bg-paper/30 space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-safe bg-safe-soft px-2.5 py-0.5 rounded-full border border-safe/25">
                {currentTool.badge}
              </span>
              <h5 className="font-serif text-xl sm:text-2xl text-ink font-semibold mt-1">
                How to Connect GitHub MCP to {currentTool.name}
              </h5>
            </div>
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-xs font-mono text-ink hover:text-safe transition-colors"
            >
              <span>Get GitHub PAT Token</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Setup Steps */}
          <div className="space-y-2.5">
            <h6 className="font-mono text-xs uppercase tracking-wider font-bold text-ink">
              Step-by-Step Instructions:
            </h6>
            <ol className="space-y-2 text-xs font-sans text-ink leading-relaxed">
              {currentTool.setupInstructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-surface border border-line/60">
                  <span className="flex size-5 items-center justify-center rounded-full bg-safe text-paper font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Config File Path */}
          <div className="space-y-1.5 font-mono text-xs">
            <span className="text-[11px] font-bold text-muted uppercase">Configuration File Path:</span>
            <div className="p-2.5 rounded-lg bg-white border border-line text-ink break-all select-all">
              {currentTool.configPathWindows}
            </div>
          </div>

          {/* Ready-to-Copy JSON Configuration Snippet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-ink uppercase">JSON Configuration Code:</span>
              <button
                type="button"
                onClick={handleCopyConfig}
                className="inline-flex items-center gap-1.5 text-safe hover:text-ink cursor-pointer font-semibold transition-colors"
              >
                {copiedConfig ? (
                  <>
                    <Check className="size-3 text-safe" />
                    <span>Copied JSON!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy Config JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl border border-line bg-white font-mono text-xs text-ink overflow-x-auto leading-relaxed shadow-xs">
              <code>{currentTool.configJson}</code>
            </pre>
          </div>

          {/* Verification Prompt */}
          <div className="p-3.5 rounded-xl border border-safe/30 bg-safe-soft/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-safe uppercase flex items-center gap-1.5">
                <Sparkles className="size-3.5" />
                <span>Test Prompt (Ask Your AI Model to Verify):</span>
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="text-[11px] text-safe hover:text-ink cursor-pointer font-bold"
              >
                {copiedPrompt ? 'Copied Prompt!' : 'Copy Prompt'}
              </button>
            </div>
            <p className="text-xs font-sans text-ink leading-relaxed italic bg-surface p-2.5 rounded-lg border border-line">
              "{currentTool.testPrompt}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
