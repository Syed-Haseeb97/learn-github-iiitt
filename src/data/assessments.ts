// 9-Phase Assessments: Quizzes & Terminal Verification
export interface AssessmentQuestion {
  q: string;
  options: string[];
  correct: number;
  explain?: string;
}

export interface PhaseAssessment {
  phaseId?: number;
  title?: string;
  mcqs?: AssessmentQuestion[];
  quiz?: AssessmentQuestion[];
  terminalTask: {
    scenario: string;
    hint: string;
    validate?: (input: any) => boolean;
    successOutput?: string;
    prompt?: string;
    expected?: string;
    solution?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const assessmentsData: Record<number, PhaseAssessment> = {
  "1": {
    "phaseId": 1,
    "title": "Phase 01: Git & GitHub Foundations Verification",
    "mcqs": [
      {
        "q": "What is the primary difference between Git and GitHub?",
        "options": [
          "Git is a programming language; GitHub is a cloud compiler.",
          "Git is local version control software on your laptop; GitHub is an online cloud platform for sharing and collaborating on repositories.",
          "Git only runs on Linux servers; GitHub only runs on Windows.",
          "They are the exact same proprietary tool developed by Microsoft."
        ],
        "correct": 1,
        "explain": "Git is an open-source tool installed on your computer that tracks file history locally. GitHub is the cloud platform where you host your Git repositories to share code and collaborate with others."
      },
      {
        "q": "Why do tech companies and developer teams use a repository instead of emailing code as a zip file?",
        "options": [
          "Zip files are too large to email across the internet.",
          "Repositories allow multiple developers to work concurrently, track author provenance for every line, and provide a single authoritative source of truth.",
          "Google Drive permanently locks files after 10 downloads.",
          "You cannot execute programming languages without a GitHub account."
        ],
        "correct": 1,
        "explain": "Emailing zip files results in overwritten code, zero historical tracking, and no conflict resolution. A Git repository tracks every change, author, and timestamp with cryptographic permanence."
      },
      {
        "q": "What does the iconic grid of green squares on a developer's GitHub profile represent?",
        "options": [
          "The amount of RAM their laptop utilizes during compilation.",
          "The Contribution Graph showing how consistently they commit, open PRs, and review code across repositories.",
          "A personal calendar showing institute lecture attendance.",
          "The security score calculated by the GitHub anti-malware system."
        ],
        "correct": 1,
        "explain": "The GitHub Contribution Graph is an activity heatmap representing your daily developer commits, pull requests, and code reviews over the past 52 weeks."
      }
    ],
    "terminalTask": {
      "scenario": "Verify your local Git installation version before starting development.",
      "prompt": "Run the command to check your installed Git version.",
      "expected": "git --version",
      "solution": "git --version",
      "hint": "Type 'git --version' to print the active version string.",
      "successOutput": "git version 2.47.1.windows.1 \u2014 Git verified on system!"
    }
  },
  "2": {
    "phaseId": 2,
    "title": "Phase 02: Upload Methods & READMEs Verification",
    "mcqs": [
      {
        "q": "What is the primary function of a 'README.md' file in a repository?",
        "options": [
          "It stores encrypted environment variables and database passwords.",
          "It acts as the front-page storefront of your project, automatically rendered by GitHub to explain what the project does and how to run it.",
          "It is a required compiled binary required by the browser.",
          "It stores the raw commit history database of Git."
        ],
        "correct": 1,
        "explain": "GitHub automatically parses README.md using Markdown and renders it on the repository's home page so visitors immediately understand the project."
      },
      {
        "q": "Why is it critical to list folders like 'node_modules/' and files like '.env' inside '.gitignore'?",
        "options": [
          "Because GitHub rejects all repositories that have more than 10 files.",
          "To prevent accidental leakage of secret API keys (.env) and avoid uploading gigabytes of regenerable dependency packages (node_modules/).",
          "Because .env files corrupt the Git commit hash database.",
          "So that other teammates can download them from GitHub faster."
        ],
        "correct": 1,
        "explain": "Secrets (.env) must never be committed publicly to prevent security breaches, and heavy dependencies (node_modules/) can easily be regenerated with 'npm install'."
      },
      {
        "q": "Which of the following is a valid method for uploading code from VS Code to GitHub?",
        "options": [
          "Using the built-in VS Code Source Control panel and clicking 'Publish to GitHub'.",
          "Dragging and dropping project files directly via the GitHub web uploader.",
          "Running the terminal sequence: 'git init', 'git add .', 'git commit', and 'git push'.",
          "All of the above are valid methods."
        ],
        "correct": 3,
        "explain": "GitHub supports web drag-and-drop, the VS Code built-in Source Control GUI, and standard terminal CLI commands depending on developer preference."
      }
    ],
    "terminalTask": {
      "scenario": "You have modified multiple files in your workspace and need to stage them for the next commit snapshot.",
      "prompt": "Stage all modified and newly created files in the current folder.",
      "expected": "git add .",
      "solution": "git add .",
      "hint": "Type 'git add .' to stage all changes into the index buffer.",
      "successOutput": "All modified files staged into index buffer! Ready for commit."
    }
  },
  "3": {
    "phaseId": 3,
    "title": "Phase 03: Commits & Commit History Verification",
    "mcqs": [
      {
        "q": "Where is the commit history timeline located on any GitHub repository home page?",
        "options": [
          "Under the 'Settings' tab in the Danger Zone section.",
          "Above the file directory table, indicated by a clock icon next to the commit count (e.g., '38 commits').",
          "Commits are private and can never be viewed by users.",
          "Inside the README.md document footer."
        ],
        "correct": 1,
        "explain": "Clicking the clock icon and commits counter above the file explorer opens the chronological commit history timeline for that branch."
      },
      {
        "q": "In a GitHub commit Diff view, what do green (+) and red (-) line highlights indicate?",
        "options": [
          "Green indicates high-performance code; red indicates syntax errors.",
          "Green indicates newly added lines; red indicates deleted or replaced lines.",
          "Green indicates code written by the owner; red by contributors.",
          "Green indicates passing tests; red indicates failed tests."
        ],
        "correct": 1,
        "explain": "Git diffs use green background with a '+' for added lines, and red background with a '-' for removed or modified lines."
      }
    ],
    "terminalTask": {
      "scenario": "You have staged your files and need to seal an immutable snapshot with an informative message.",
      "prompt": "Commit your staged changes with the message 'feat: add student portal UI'.",
      "expected": "git commit -m",
      "solution": "git commit -m \"feat: add student portal UI\"",
      "hint": "Use 'git commit -m \"feat: add student portal UI\"' to record the snapshot.",
      "successOutput": "[main 7f2a10b] feat: add student portal UI \u2014 Immutable snapshot sealed!"
    }
  },
  "4": {
    "phaseId": 4,
    "title": "Phase 04: Branches & Pull Requests Verification",
    "mcqs": [
      {
        "q": "Why do engineering teams mandate feature branches instead of committing directly to the 'main' branch?",
        "options": [
          "Because Git limits the main branch to a maximum of 50 commits.",
          "To isolate new feature development and protect the production codebase from bugs until code review and automated CI tests pass.",
          "Because only managers have permission to create files in Git.",
          "Branches make the repository download size smaller."
        ],
        "correct": 1,
        "explain": "Feature branches isolate ongoing work. Teammates submit Pull Requests from their feature branch, allowing rigorous peer review before anything merges into production."
      },
      {
        "q": "What happens when two developers edit the same line of a file in conflicting ways?",
        "options": [
          "Git automatically deletes both developers' repositories.",
          "A Merge Conflict occurs, and Git pauses to allow developers to manually choose which changes to keep.",
          "The developer who pushed first has their code permanently overwritten.",
          "GitHub files a copyright infringement alert."
        ],
        "correct": 1,
        "explain": "A merge conflict occurs when divergent histories touch the same lines. Git inserts conflict markers ('<<<<<<<', '=======', '>>>>>>>') so humans can resolve the discrepancy."
      }
    ],
    "terminalTask": {
      "scenario": "You need to create and switch to an isolated feature branch named 'feature/auth-modal'.",
      "prompt": "Create and check out a new branch named 'feature/auth-modal'.",
      "expected": "git checkout -b feature/auth-modal",
      "solution": "git checkout -b feature/auth-modal",
      "hint": "Use 'git checkout -b feature/auth-modal' (or 'git switch -c feature/auth-modal').",
      "successOutput": "Switched to a new branch 'feature/auth-modal'. Main branch is safely isolated."
    }
  },
  "5": {
    "phaseId": 5,
    "title": "Phase 05: Git Internals & DAG Verification",
    "mcqs": [
      {
        "q": "Which Git object type stores raw file content, completely devoid of filename, timestamp, or mode bits?",
        "options": [
          "Commit",
          "Tree",
          "Blob",
          "Annotated Tag"
        ],
        "correct": 2,
        "explain": "A Blob (Binary Large Object) holds only the zlib-compressed raw bytes of a file. Filenames and Unix mode permissions are stored separately in Tree objects."
      },
      {
        "q": "If a developer accidentally runs 'git reset --hard' and loses an active branch, which tool enables recovering the dangling commit SHA-1?",
        "options": [
          "git reflog",
          "git pull --force",
          "git checkout --clean",
          "git rm -rf ."
        ],
        "correct": 0,
        "explain": "The Reference Log (git reflog) silently records every movement of the HEAD pointer, allowing recovery of unreachable dangling commits before garbage collection."
      }
    ],
    "terminalTask": {
      "scenario": "A catastrophic hard reset lost your last 3 commits. You need to inspect recent HEAD pointer movements to locate the lost commit hash.",
      "prompt": "Inspect the chronological reference log of HEAD movements.",
      "expected": "git reflog",
      "solution": "git reflog",
      "hint": "Type 'git reflog' to view the reference history.",
      "successOutput": "HEAD@{0}: commit: Update portal. Dangling commit SHA recovered!"
    }
  },
  "6": {
    "phaseId": 6,
    "title": "Phase 06: GitHub Actions CI/CD Verification",
    "mcqs": [
      {
        "q": "In which exact directory must GitHub Actions workflow YAML files reside?",
        "options": [
          ".github/workflows/",
          ".git/actions/",
          ".ci/pipelines/",
          "actions/workflows/"
        ],
        "correct": 0,
        "explain": "GitHub Actions strictly evaluates YAML workflow configuration files located in the root '.github/workflows/' directory."
      },
      {
        "q": "When choosing between Composite Actions and Reusable Workflows for organization-wide pipelines, which key architectural difference applies?",
        "options": [
          "Composite Actions run as isolated jobs on custom runners; Reusable Workflows only run at step level.",
          "Reusable Workflows run at the job level on independent runners and can inherit secrets; Composite Actions run at the step level within the caller runner.",
          "Composite Actions support infinite nesting; Reusable Workflows cannot be nested.",
          "There is no architectural difference."
        ],
        "correct": 1,
        "explain": "Reusable Workflows operate at the job level, allocate their own compute runner (runs-on), and inherit secrets cleanly. Composite Actions bundle steps inside the caller runner."
      }
    ],
    "terminalTask": {
      "scenario": "You need to inspect the status and logs of recent CI/CD workflow executions on GitHub.",
      "prompt": "List recent workflow runs using GitHub CLI.",
      "expected": "gh run list",
      "solution": "gh run list",
      "hint": "Type 'gh run list' to inspect automated pipeline runs.",
      "successOutput": "STATUS: COMPLETED (4 runs passed, 0 failed). Artifact deployment verified!"
    }
  },
  "7": {
    "phaseId": 7,
    "title": "Phase 07: Security & OIDC Federation Verification",
    "mcqs": [
      {
        "q": "Why does OpenID Connect (OIDC) eliminate systemic security risks compared to storing static AWS/GCP access keys in GitHub Secrets?",
        "options": [
          "OIDC issues ephemeral, short-lived JWTs bound cryptographically to repo and branch identity, removing long-lived credentials that can leak.",
          "Static access keys are faster to compute than OIDC tokens.",
          "Cloud providers do not allow passwords in CI/CD pipelines.",
          "OIDC automatically encrypts the developer's laptop."
        ],
        "correct": 0,
        "explain": "Static keys can be exfiltrated and used indefinitely from anywhere. OIDC tokens expire within minutes and are strictly bound to repo and workflow execution context."
      },
      {
        "q": "What is the primary danger of using 'pull_request_target' with 'actions/checkout' configured to the head SHA of an untrusted PR?",
        "options": [
          "It consumes excessive GitHub Actions runner minutes.",
          "It causes Poisoned Pipeline Execution (PPE), executing malicious code in the privileged context of the base repo with access to secrets and write tokens.",
          "It automatically merges the pull request without approval.",
          "It deletes the runner virtual machine."
        ],
        "correct": 1,
        "explain": "pull_request_target runs in the base repo context with access to secrets. Checking out and running untrusted fork code enables remote code execution and secret exfiltration."
      }
    ],
    "terminalTask": {
      "scenario": "Audit configured secrets in the current repository to ensure zero hardcoded production keys exist.",
      "prompt": "List all encrypted repository secrets with the GitHub CLI.",
      "expected": "gh secret list",
      "solution": "gh secret list",
      "hint": "Type 'gh secret list' to inspect repository secrets.",
      "successOutput": "Zero static credentials found. OIDC dynamic role trust policy active."
    }
  },
  "8": {
    "phaseId": 8,
    "title": "Phase 08: AI & Copilot Agent Mode Verification",
    "mcqs": [
      {
        "q": "Where should repository-wide global instructions for GitHub Copilot be placed?",
        "options": [
          ".github/copilot-instructions.md",
          ".git/copilot.config",
          "README.md footer",
          "src/copilot.txt"
        ],
        "correct": 0,
        "explain": "GitHub Copilot automatically discovers and parses '.github/copilot-instructions.md' at the root of the repo to inject project-specific context into prompts."
      },
      {
        "q": "In Copilot Agent Mode, what occurs during the 'Self-Healing Validation' phase of the autonomous loop?",
        "options": [
          "The model restarts the developer's laptop.",
          "The agent parses terminal stderr/stdout output, reasons over linter or compiler failures, and autonomously refactors code until stability is achieved.",
          "The agent files a bug report to Microsoft support.",
          "The agent shuts down the terminal."
        ],
        "correct": 1,
        "explain": "Self-healing validation allows the AI agent to capture compile/linter errors from the terminal, reason about the root cause, and autonomously fix the code without human intervention."
      }
    ],
    "terminalTask": {
      "scenario": "Ask GitHub Copilot CLI to explain an unfamiliar git plumbing command.",
      "prompt": "Ask Copilot CLI to explain the command 'git rev-parse HEAD'.",
      "expected": "gh copilot explain",
      "solution": "gh copilot explain 'git rev-parse HEAD'",
      "hint": "Type 'gh copilot explain \"git rev-parse HEAD\"' to query the AI assistant.",
      "successOutput": "Copilot: 'git rev-parse HEAD resolves the current HEAD pointer into its 40-character SHA-1 hash.'"
    }
  },
  "9": {
    "phaseId": 9,
    "title": "Phase 09: Model Context Protocol (MCP) Verification",
    "mcqs": [
      {
        "q": "Which underlying protocol and client-server architecture forms the foundation of the Model Context Protocol (MCP)?",
        "options": [
          "GraphQL with WebSockets only",
          "JSON-RPC 2.0 with STDIO (local) and HTTP/SSE (remote) transport layers",
          "SOAP with XML over FTP",
          "gRPC without authentication"
        ],
        "correct": 1,
        "explain": "MCP standardizes stateful client-server communication using JSON-RPC 2.0, supporting STDIO for local IDE tools and HTTP with Server-Sent Events (SSE) for remote services."
      },
      {
        "q": "How do enterprise administrators govern which MCP servers developers are allowed to connect to Copilot?",
        "options": [
          "By banning the use of AI tools entirely.",
          "Through an enterprise allowlist and denylist enforced via 'managed-settings.json' in a restricted administrative repository.",
          "By requiring every developer to pay a license fee per tool.",
          "MCP connections cannot be regulated."
        ],
        "correct": 1,
        "explain": "Enterprise administrators configure allowlists and denylists in 'managed-settings.json' to block unauthorized MCP tools and prevent proprietary data exfiltration."
      }
    ],
    "terminalTask": {
      "scenario": "Launch the local developer inspector to test and debug Model Context Protocol servers.",
      "prompt": "Launch the MCP inspector using npx.",
      "expected": "npx @modelcontextprotocol/inspector",
      "solution": "npx @modelcontextprotocol/inspector",
      "hint": "Type 'npx @modelcontextprotocol/inspector' to run the testing GUI.",
      "successOutput": "MCP Inspector running on http://localhost:5173. Ready to debug tool calls!"
    }
  }
};
