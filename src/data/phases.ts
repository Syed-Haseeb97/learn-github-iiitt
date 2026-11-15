// 10-Phase Progressive Architectural Continuum from Git & GitHub Beginners to Open Source & MCP
export interface PhaseSection {
  heading: string;
  content?: string;
  body?: string;
  code?: string;
  tip?: string;
}

export interface Phase {
  id: number;
  code: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  image: string;
  imageCaption?: string;
  analogyTitle: string;
  analogyText: string;
  visualSteps?: { step: string; title: string; desc: string }[];
  technicalTerms?: { term: string; plain: string }[];
  sections: PhaseSection[];
  commandsTable?: { cmd: string; use?: string; desc?: string; detail?: string; [key: string]: any }[];
  cliExamples?: { title: string; cmd: string; output: string }[];
  comparisonHeaders?: string[];
  comparisonRows?: string[][];
  [key: string]: any;
}

export const phasesData: Phase[] = [
  {
    "id": 1,
    "code": "PHASE 01",
    "shortTitle": "What is Git & GitHub?",
    "title": "Welcome to Git & GitHub: Foundations for Absolute Beginners",
    "subtitle": "Understanding Version Control, Centralized Repositories, Team Collaboration, Profiles, Stars & Contribution Graphs",
    "image": "/images/phase-1.jpg",
    "imageCaption": "FIG 1.1 \u2014 THE ESSENTIAL DIFFERENCE: LOCAL GIT (ON YOUR LAPTOP) VS CLOUD GITHUB (ON THE WEB)",
    "analogyTitle": "The Camera vs Instagram Analogy",
    "analogyText": "Think of Git as your phone's camera: it takes high-resolution snapshots of your files locally on your laptop whenever you want to save a milestone. GitHub is like Instagram or Google Photos in the cloud: it is the online website where you upload, share, showcase, and collaborate on those snapshots with your teammates across the world.",
    "technicalTerms": [
      {
        "term": "Git",
        "plain": "A free, open-source program that runs offline on your computer to track changes in your files over time like a personal time machine."
      },
      {
        "term": "GitHub",
        "plain": "A cloud platform (website) owned by Microsoft where developers host their Git repositories, collaborate in teams, and build open-source software."
      },
      {
        "term": "Repository ('Repo')",
        "plain": "A dedicated project folder tracked by Git. It contains all your project files, images, code, and the entire historical record of every change ever made."
      },
      {
        "term": "Star \u2b50",
        "plain": "A public bookmark on GitHub. When you find a cool project or library, clicking Star saves it to your favorites and shows appreciation to the author."
      },
      {
        "term": "Contribution Graph",
        "plain": "The iconic grid of green squares on your GitHub profile. Every time you commit code, open a pull request, or review code, a square lights up green."
      },
      {
        "term": "Achievements \ud83c\udfc6",
        "plain": "Fun badges on your GitHub profile awarded for developer milestones, like 'Quickdraw' (closing an issue within 5 mins) or 'Pull Shark' (merging pull requests)."
      }
    ],
    "sections": [
      {
        "heading": "1.1 What is a Repository and Why Can't We Just Use Google Drive or WhatsApp?",
        "body": "When beginners first start coding, they often save versions of their projects with messy names like 'project_v1', 'project_final', 'project_final_really_final'. If you email code as a zip file to your teammates, chaos immediately ensues: two people edit the same file, overwrite each other's work, and have no way of knowing who broke what. A Repository (commonly called a 'Repo') solves this forever. It is a single authoritative home for your project where every change is tracked with the author's name, timestamp, and purpose. In companies, software engineering teams cannot function without repositories because dozens or hundreds of engineers must write code for the same app simultaneously without stepping on each other's toes."
      },
      {
        "heading": "1.2 Why Every Tech Company Uses GitHub",
        "body": "In professional engineering companies (Google, Microsoft, Amazon, startups), code is never stored on a single engineer's computer. If their laptop breaks, the company's software is safe in the cloud repository. Furthermore, GitHub acts as an automated assembly line: when code is uploaded to a repository, automated robots run tests, check for security bugs, and deploy the application live to millions of users. It also provides issue tracking, project boards, and code review systems where senior engineers review every single line of code before it reaches production."
      },
      {
        "heading": "1.3 Anatomy of a GitHub Profile: The Developer's Resume",
        "body": "Your GitHub profile (github.com/your-username) is your digital engineering identity. Tech recruiters and open-source communities look at your profile before they look at your CV. Key profile elements include: (1) Pinned Repositories: Showcase your top 6 projects; (2) The Green Contribution Matrix: Visual heatmap reflecting how consistently you build; (3) Stars & Followers: Community engagement; (4) Organizations: Clubs and companies you belong to, such as IIIT Trichy Developer Community; and (5) Achievement Badges: Badges like 'Pair Extraordinaire', 'YOLO', and 'Pull Shark' unlocked through everyday development."
      }
    ],
    "commandsTable": [
      {
        "cmd": "git --version",
        "use": "Checks if Git is installed on your computer and shows the installed version number."
      },
      {
        "cmd": "git config --global user.name 'Your Name'",
        "use": "Tells Git your name so your teammates know who wrote each piece of code."
      },
      {
        "cmd": "git config --global user.email 'your@iiitt.ac.in'",
        "use": "Links your Git commits to your GitHub account email address."
      }
    ]
  },
  {
    "id": 2,
    "code": "PHASE 02",
    "shortTitle": "Uploading Code to GitHub",
    "title": "Getting Your Code Online: The 3 Upload Methods & READMEs",
    "subtitle": "From VS Code to GitHub: Web Drag-and-Drop, Built-In Source Control GUI, and the Command Line Bridge",
    "image": "/images/phase-2.jpg",
    "imageCaption": "FIG 2.1 \u2014 THE THREE WAYS CODE TRAVELS FROM YOUR EDITOR TO GITHUB.COM",
    "analogyTitle": "The Storefront Billboard Analogy",
    "analogyText": "Imagine your GitHub repository is a brand new tech store in a busy city. A README.md file is the large, welcoming billboard at the entrance: it tells visitors what you sell, how to use it, who built it, and how to get started. Without a README, visitors walk into an empty room full of unlabeled code files and immediately leave!",
    "technicalTerms": [
      {
        "term": "README.md",
        "plain": "A markdown text file displayed automatically on the home page of your repository. It explains what your project does, how to install it, and how to run it."
      },
      {
        "term": ".gitignore",
        "plain": "A special text file telling Git which files NOT to upload, such as secret passwords, API keys (.env), or huge temporary build folders (node_modules/)."
      },
      {
        "term": "Markdown (.md)",
        "plain": "A super simple text formatting language. Writing '# Hello' creates a big title; '**text**' makes text bold; '- item' makes bullet points."
      },
      {
        "term": "Source Control Panel",
        "plain": "The third icon on the left sidebar in VS Code (looks like three dots connected by branches) allowing you to commit and publish with clicks."
      }
    ],
    "sections": [
      {
        "heading": "2.1 What is a README.md and How to Write a Great One",
        "body": "The '.md' extension stands for Markdown. Whenever someone visits your repository URL, GitHub looks for 'README.md' and renders it as an attractive webpage beneath your file list. Every great README includes: (1) Project Title and a one-sentence elevator pitch; (2) Key Features with bullet points; (3) Quickstart Guide: How to run it on another computer (e.g., '1. Install Node.js, 2. Run npm install, 3. Run npm run dev'); and (4) Author credits. Writing a clear README is the single most effective way to make your college projects look polished and professional."
      },
      {
        "heading": "2.2 Method 1: The Web Browser Drag-and-Drop Uploader (Day 1 Beginner)",
        "body": "If you don't know any terminal commands yet, you can upload code directly through GitHub's website! (1) Click the green 'New' button on github.com to create a repository; (2) Inside your empty repository, click 'Add file' -> 'Upload files'; (3) Drag and drop your project files (like index.html, styles.css) or your unzipped project folder directly into the browser window; (4) At the bottom, type a short message (e.g., 'Initial upload of college project') and click the green 'Commit changes' button. Your files are now instantly live on GitHub!"
      },
      {
        "heading": "2.3 Method 2: The VS Code Built-In Source Control GUI (One-Click Publish)",
        "body": "Visual Studio Code has Git deeply integrated into its user interface. When you open a folder in VS Code: (1) Click the Source Control icon on the left sidebar (shortcut: Ctrl+Shift+G); (2) Click the button labeled 'Initialize Repository'; (3) Type a commit message into the top text box (e.g., 'First version'); (4) Click the checkmark icon 'Commit'; (5) Click the blue button 'Publish to GitHub'. VS Code will ask whether you want a Public or Private repo, connect to your GitHub account, and automatically push your files without you ever opening a command prompt!"
      },
      {
        "heading": "2.4 Method 3: The Professional Terminal Bridge (The Real Developer Way)",
        "body": "While graphical buttons are convenient, professional software engineers and DevOps pipelines upload code via command-line tools. The fundamental sequence is: (1) 'git init' - turns the current folder into a Git repository; (2) 'git add .' - bundles all files into the staging buffer; (3) 'git commit -m \"first commit\"' - seals the snapshot; (4) 'git remote add origin <url>' - connects your laptop folder to your GitHub repo URL; (5) 'git push -u origin main' - uploads the files to GitHub."
      },
      {
        "heading": "2.5 What is a .gitignore and Why It Is Critical (Never Push Secrets or Bloat!)",
        "body": "A .gitignore file is a plain text file placed in the root directory of your project. It instructs Git to completely ignore specified files and folders, preventing them from ever being tracked, staged, or uploaded to GitHub. It is essential for three critical reasons: (1) Security: Prevents accidentally leaking private .env files containing API keys or database credentials; (2) Bloat Prevention: Blocks huge dependency directories like node_modules/ (150MB+, 80,000 files) or Python virtual environments (.venv/) from clogging the repo; (3) Cleanliness: Excludes temporary compiler outputs (*.exe, *.out, dist/) and OS metadata (.DS_Store, Thumbs.db). Once added to .gitignore, Git treats these files as invisible."
      }
    ],
    "commandsTable": [
      {
        "cmd": "git init",
        "use": "Creates a new Git repository inside your current folder."
      },
      {
        "cmd": "git add .",
        "use": "Stages all files in the current directory for the next commit."
      },
      {
        "cmd": "git commit -m 'Initial project release'",
        "use": "Saves an immutable snapshot with a descriptive message."
      },
      {
        "cmd": "git remote add origin <https://github.com/user/repo.git>",
        "use": "Pairs your local laptop repository with your remote GitHub cloud repository."
      },
      {
        "cmd": "git push -u origin main",
        "use": "Transmits your local commits up to the main branch on GitHub."
      }
    ]
  },
  {
    "id": 3,
    "code": "PHASE 03",
    "shortTitle": "Commits & Commit History",
    "title": "The Time Machine: Commits, Commit History & Reading Diffs",
    "subtitle": "Understanding Immutable Snapshots, The Staging Buffer, Viewing History on GitHub, and Inspecting Additions vs Deletions",
    "image": "/images/phase-3.jpg",
    "imageCaption": "FIG 3.1 \u2014 VISUALIZING COMMIT HISTORY: A CHRONOLOGICAL TIMELINE OF SNAPSHOTS",
    "analogyTitle": "The Video Game Checkpoint Analogy",
    "analogyText": "A commit is exactly like saving your game at a checkpoint before fighting a difficult boss. If you make a mistake later or introduce a bug that breaks your entire app, you don't have to start from scratch. You simply reload the last checkpoint and your project is restored to perfection!",
    "technicalTerms": [
      {
        "term": "Commit",
        "plain": "A permanent snapshot of your entire project at a specific moment in time. Once created, a commit can never be altered."
      },
      {
        "term": "Commit Hash (SHA)",
        "plain": "A unique 40-character digital fingerprint (e.g. 7f3a8b2...) that identifies every commit like an Aadhaar or passport number."
      },
      {
        "term": "Commit History",
        "plain": "The chronological log of all commits in a project. Accessible by clicking the 'commits' counter on GitHub."
      },
      {
        "term": "Diff (Difference)",
        "plain": "A visual comparison showing exactly which lines were added (green +) and which lines were removed (red -)."
      },
      {
        "term": "Staging Area (Index)",
        "plain": "The draft buffer between editing files and committing them. It lets you selectively choose which modified files go into a snapshot."
      }
    ],
    "sections": [
      {
        "heading": "3.1 Where is Commit History on GitHub and How to Explore It?",
        "body": "On any repository homepage on GitHub, look just above the file directory on the right-hand side. You will see a clock icon next to a number like '42 commits'. Clicking on that number opens the Commit History timeline! Each entry shows: (1) The commit message explaining what was done; (2) The author's avatar; (3) The exact date and time; and (4) The 7-character short commit hash. Clicking on any commit opens the Diff View, showing every modified file with green highlights for additions and red highlights for deletions."
      },
      {
        "heading": "3.2 The Golden Rule: Why We Stage Before We Commit",
        "body": "Beginners often ask: 'Why do I need to run git add before git commit? Why not just save everything?' Imagine you are preparing a physical parcel to ship to a friend. You have 10 items on your desk, but only 3 of them are gifts for your friend; the rest are personal notes. You wouldn't throw everything on your desk blindly into the shipping box! 'git add' lets you handpick only the files that are ready, leaving half-finished experimental code untouched on your disk."
      },
      {
        "heading": "3.3 How to Write Great Commit Messages (Like an Industry Engineer)",
        "body": "Bad commit messages written by frustrated beginners look like: 'fixed stuff', 'asdfgh', 'why is this broken', 'final'. In real companies, this makes debugging impossible. Industry engineers follow simple conventions: (1) Use present tense imperative verbs ('Add attendance calculator' instead of 'Added attendance calculator'); (2) Keep the summary line under 50 characters; (3) Use common prefixes: 'feat:' for new features, 'fix:' for bug fixes, 'docs:' for documentation changes."
      }
    ],
    "commandsTable": [
      {
        "cmd": "git status",
        "use": "Checks which files are modified, staged, or untracked."
      },
      {
        "cmd": "git diff",
        "use": "Shows the exact green (+) additions and red (-) deletions on your computer."
      },
      {
        "cmd": "git log --oneline",
        "use": "Prints a compact, readable list of previous commits with their short hashes."
      },
      {
        "cmd": "git show <commit-sha>",
        "use": "Inspects the exact changes introduced by a specific commit."
      }
    ]
  },
  {
    "id": 4,
    "code": "PHASE 04",
    "shortTitle": "Team Collaboration & PRs",
    "title": "Working in Teams: Branches, Pull Requests & Code Reviews",
    "subtitle": "Why Companies Never Push to Main, Isolated Feature Branches, Opening PRs, and Resolving Merge Conflicts",
    "image": "/images/phase-4.jpg",
    "imageCaption": "FIG 4.1 \u2014 FORKING & FEATURE BRANCH TOPOLOGIES IN COLLABORATIVE TEAMS",
    "analogyTitle": "The Parallel Universe Analogy",
    "analogyText": "A branch is like creating a parallel universe for your project. You can try crazy experiments, redesign the entire UI, or rewrite backend logic without affecting the real world (the 'main' branch). If your experiment works, you merge the parallel universe back into reality. If it fails, you simply delete the branch and nothing is lost!",
    "technicalTerms": [
      {
        "term": "Branch",
        "plain": "An independent line of development. The default production branch is called 'main'."
      },
      {
        "term": "Pull Request (PR)",
        "plain": "A formal proposal asking team maintainers to review code from your branch before merging it into main."
      },
      {
        "term": "Merge Conflict",
        "plain": "Occurs when two developers edit the exact same line of code in different ways. Git pauses and asks humans to choose which version to keep."
      },
      {
        "term": "Code Review",
        "plain": "Peers inspect proposed code line-by-line, leaving comments, suggestions, and approvals to ensure high quality."
      }
    ],
    "sections": [
      {
        "heading": "4.1 The Iron Law of Engineering: Never Commit Directly to 'main'",
        "body": "In amateur projects, developers often push changes straight to the 'main' branch. If someone introduces a typo or broken logic, the live website crashes for all users immediately! In tech companies, the 'main' branch is protected by branch protection rules. Nobody\u2014not even the CTO\u2014is allowed to push directly. Instead, developers create a feature branch (e.g. 'feature/login-modal'), write and test code there, and open a Pull Request."
      },
      {
        "heading": "4.2 Opening Your First Pull Request on GitHub",
        "body": "When you push a feature branch to GitHub, a yellow banner appears on the repo: 'Compare & pull request'. Clicking it opens the Pull Request form: (1) Give it a clear title; (2) Add a description explaining what problem you solved and attach screenshots of your UI changes; (3) Assign a teammate as a Reviewer. GitHub automatically runs tests, checks for merge conflicts, and displays the full diff. Once approved, clicking the green 'Merge pull request' button smoothly merges the changes into main."
      },
      {
        "heading": "4.3 Surviving Merge Conflicts Without Panic",
        "body": "Merge conflicts happen to every developer and are a normal part of teamwork. When Git cannot automatically decide between two changes, it marks the file with conflict markers: '<<<<<<< HEAD' (your changes), '=======' (divider), and '>>>>>>> feature-branch' (teammate's changes). VS Code provides one-click buttons above the conflict: 'Accept Current Change', 'Accept Incoming Change', or 'Accept Both'. Simply pick the correct code, save the file, and commit!"
      }
    ],
    "commandsTable": [
      {
        "cmd": "git checkout -b feature/auth",
        "use": "Creates a new branch named 'feature/auth' and switches to it immediately."
      },
      {
        "cmd": "git branch",
        "use": "Lists all local branches and marks your currently active branch with an asterisk."
      },
      {
        "cmd": "git checkout main",
        "use": "Switches your working directory back to the primary main branch."
      },
      {
        "cmd": "git merge feature/auth",
        "use": "Combines changes from 'feature/auth' into your currently active branch."
      }
    ]
  },
  {
    "id": 5,
    "code": "PHASE 05",
    "shortTitle": "Git Internals & DAG",
    "title": "Git Under the Hood: Object Database, DAG & Recovery",
    "subtitle": "Content-Addressable Filesystem, Blobs, Trees, Commits, Directed Acyclic Graph (DAG), Reflog & git fsck",
    "image": "/images/phase-5.jpg",
    "imageCaption": "FIG 5.1 \u2014 CONTENT-ADDRESSABLE OBJECT STORE: BLOBS, TREES (040000/100644), AND COMMITS",
    "analogyTitle": "The Cryptographic Museum Archive Analogy",
    "analogyText": "Inside the hidden '.git/objects' folder, Git behaves like an ultra-secure museum archive. Every artifact (file) is weighed, scanned, compressed, and assigned an unforgeable 40-character wax seal (SHA-1 hash). The museum never stores two identical artifacts: if two files have the exact same text, they share the exact same seal!",
    "technicalTerms": [
      {
        "term": "Blob (Binary Large Object)",
        "plain": "Stores raw file contents, completely devoid of filename or timestamp. Identical file contents share the same blob."
      },
      {
        "term": "Tree",
        "plain": "Represents directory structures. Maps filenames and permissions (100644 for files, 040000 for directories) to blob hashes."
      },
      {
        "term": "DAG (Directed Acyclic Graph)",
        "plain": "A tree-like graph where each commit node points backward to its parent commit, forming an unbroken historical chain."
      },
      {
        "term": "Reflog",
        "plain": "The local flight recorder that logs every single movement of the HEAD pointer, allowing recovery of deleted commits."
      }
    ],
    "sections": [
      {
        "heading": "5.1 The Four Atomic Git Objects",
        "body": "Git stores all repository history inside the hidden '.git/objects' folder as zlib-compressed objects identified by 40-character SHA-1 hashes. There are 4 fundamental types: (1) Blob: holds raw file bytes; (2) Tree: holds directory structures mapping file names to blobs; (3) Commit: points to a top-level root tree, records parent commits, author, timestamp, and message; (4) Tag: persistent human-readable label pointing to a specific commit."
      },
      {
        "heading": "5.2 Never Truly Lost: Reflog and git fsck Disaster Recovery",
        "body": "Because Git objects are immutable, running a destructive command like 'git reset --hard' does not delete your code from disk. The commit simply becomes a 'dangling commit' unreachable by active branch pointers. Running 'git reflog' reveals the SHA-1 hash of where HEAD was before the reset. If reflog expired, running 'git fsck --full' scans the raw object database to locate lost work and restore it."
      }
    ],
    "commandsTable": [
      {
        "cmd": "git cat-file -p <sha>",
        "use": "Pretty-prints the content of any raw Git object (blob, tree, or commit) by its hash."
      },
      {
        "cmd": "git cat-file -t <sha>",
        "use": "Reveals whether a hash belongs to a blob, tree, commit, or tag."
      },
      {
        "cmd": "git reflog",
        "use": "Displays chronological HEAD movement log to rescue lost commits."
      },
      {
        "cmd": "git fsck --full",
        "use": "Audits database cryptographic integrity and lists unreachable dangling commits."
      }
    ]
  },
  {
    "id": 6,
    "code": "PHASE 06",
    "shortTitle": "CI/CD & GitHub Actions",
    "title": "Continuous Integration & Deployment: GitHub Actions",
    "subtitle": "Workflow Anatomy, Event Triggers, Runners, GitHub Pages Deployments, and Composite vs Reusable Workflows",
    "image": "/images/phase-6.jpg",
    "imageCaption": "FIG 6.1 \u2014 GITHUB ACTIONS CI/CD LIFECYCLE: TRIGGERS \u2192 RUNNERS \u2192 ARTIFACT DEPLOYMENT",
    "analogyTitle": "The Automated Factory Assembly Line Analogy",
    "analogyText": "GitHub Actions is an automated quality inspection factory. Whenever code is pushed to your repo, robot inspectors (cloud runners) boot up in seconds, compile your code, run unit tests, check for syntax errors, and if everything passes, automatically ship your website live to the internet!",
    "technicalTerms": [
      {
        "term": "Workflow",
        "plain": "An automated process declared in a YAML file inside the .github/workflows directory."
      },
      {
        "term": "Trigger (on:)",
        "plain": "The event that starts a workflow, such as a push, pull_request, or scheduled cron."
      },
      {
        "term": "Runner",
        "plain": "A clean virtual machine in the cloud (Ubuntu, Windows, or macOS) that executes your workflow steps."
      },
      {
        "term": "GitHub Pages",
        "plain": "Free static web hosting provided by GitHub directly from your repository."
      }
    ],
    "sections": [
      {
        "heading": "6.1 Anatomy of a GitHub Actions YAML Workflow",
        "body": "Every workflow lives inside '.github/workflows/deploy.yml'. It has 3 essential sections: (1) 'name': descriptive title; (2) 'on': triggers (e.g. on: push to main); (3) 'jobs': isolated execution environments consisting of sequential 'steps' running shell commands or pre-built community actions like 'actions/checkout@v4' and 'actions/setup-node@v4'."
      },
      {
        "heading": "6.2 Free Website Hosting with GitHub Pages and Actions",
        "body": "Modern web architectures host portfolios and documentation directly on GitHub Pages using native Actions. The official 'actions/deploy-pages@v4' action takes your compiled 'dist' or 'build' folder, packages it into a verified artifact, and deploys it live to 'https://your-username.github.io/repo-name' with automatic SSL certificates and global CDN caching."
      }
    ],
    "commandsTable": [
      {
        "cmd": "gh run list",
        "use": "Lists recent GitHub Actions CI/CD workflow runs using GitHub CLI."
      },
      {
        "cmd": "gh run view <run-id> --log",
        "use": "Streams real-time terminal logs from a cloud runner to debug CI failures."
      }
    ]
  },
  {
    "id": 7,
    "code": "PHASE 07",
    "shortTitle": "Security & OIDC Federation",
    "title": "Workflow Security, OIDC Cloud Federation & Threat Defense",
    "subtitle": "Least-Privilege Token Scoping, Eliminating Static Cloud Secrets via OIDC, and Defending Against Poisoned Pipeline Execution (PPE)",
    "image": "/images/phase-3.jpg",
    "imageCaption": "FIG 7.1 \u2014 ZERO-TRUST OIDC FEDERATION: SHORT-LIVED JWT TOKENS VS STATIC SECRET LEAKS",
    "analogyTitle": "The Single-Use RFID Badge Analogy",
    "analogyText": "Traditional cloud keys are like metal master keys: if an attacker steals one, they can enter your AWS cloud forever from anywhere in the world. OpenID Connect (OIDC) is like an ephemeral digital hotel keycard: it is generated dynamically for one specific job, expires in 15 minutes, and only works for that exact repository!",
    "technicalTerms": [
      {
        "term": "GITHUB_TOKEN",
        "plain": "A temporary cryptographic authentication token generated automatically by GitHub for each workflow run."
      },
      {
        "term": "OpenID Connect (OIDC)",
        "plain": "A standard that lets GitHub Actions authenticate directly with AWS, Azure, or GCP without storing static access keys."
      },
      {
        "term": "Poisoned Pipeline (PPE)",
        "plain": "A supply-chain attack where malicious code in a Pull Request tricks a privileged CI pipeline into exfiltrating secrets."
      }
    ],
    "sections": [
      {
        "heading": "7.1 Least Privilege: Scoping GITHUB_TOKEN Permissions",
        "body": "By default, GITHUB_TOKEN should possess read-only permissions. Elevate permissions explicitly only in the specific job requiring them using the YAML permissions block: e.g. 'permissions: { contents: read, pages: write, id-token: write }'. This compartmentalization ensures that compromised third-party dependencies cannot tamper with releases or repository contents."
      },
      {
        "heading": "7.2 Defending Against Poisoned Pipeline Execution (PPE)",
        "body": "The most dangerous vulnerability in CI/CD is the misuse of 'pull_request_target'. Unlike normal 'pull_request' which runs in an unprivileged sandbox, 'pull_request_target' runs in the context of the base repo with write access and secrets. If you check out untrusted code from an external PR and run 'npm install' or scripts under 'pull_request_target', an attacker can exfiltrate your secrets. Never execute untrusted code in privileged workflows."
      }
    ],
    "commandsTable": [
      {
        "cmd": "gh secret list",
        "use": "Inspects configured encrypted secrets in your GitHub repository."
      },
      {
        "cmd": "gh auth status",
        "use": "Verifies token authorization scopes and active account identities."
      }
    ]
  },
  {
    "id": 8,
    "code": "PHASE 08",
    "shortTitle": "AI & GitHub Copilot",
    "title": "AI-Driven Development: Copilot Instructions & Autonomous Loops",
    "subtitle": "Context Management, copilot-instructions.md Hierarchy, Agent Mode Autonomous Planning, and Self-Healing Loops",
    "image": "/images/phase-5.jpg",
    "imageCaption": "FIG 8.1 \u2014 COPILOT AGENT LOOP: CONTEXT SCAN \u2192 STRATEGIC PLAN \u2192 CODE EXECUTION \u2192 SELF-HEALING",
    "analogyTitle": "The Expert Senior Co-Pilot Analogy",
    "analogyText": "GitHub Copilot in Agent Mode is like having a patient senior Google engineer sitting beside you. When you point at an issue, it scans your entire repository, writes an architectural plan, writes the code across multiple files, runs your terminal compiler, and automatically fixes any errors before asking for your final sign-off!",
    "technicalTerms": [
      {
        "term": "copilot-instructions.md",
        "plain": "A markdown file placed in .github/ that permanently teaches Copilot your project coding rules, styles, and architecture."
      },
      {
        "term": "Copilot Agent Mode",
        "plain": "An autonomous AI software engineering loop that scans the workspace, edits multiple files, runs terminal tests, and self-heals errors."
      },
      {
        "term": "Copilot Workspace",
        "plain": "A browser-based AI environment that turns GitHub issues into full working code pull requests with human control checkpoints."
      }
    ],
    "sections": [
      {
        "heading": "8.1 The Custom Instruction Hierarchy (.github/copilot-instructions.md)",
        "body": "LLMs perform infinitely better when provided with project context. Creating '.github/copilot-instructions.md' conditions Copilot to act as a seasoned developer deeply familiar with your codebase: enforce TypeScript strictness, specify your CSS framework (Tailwind), ban deprecated libraries, and outline state management rules so you never have to repeat yourself in prompts."
      },
      {
        "heading": "8.2 The 4-Stage Autonomous Agent Loop",
        "body": "Copilot Agent Mode operates on an autonomous 4-stage execution cycle: (1) Contextual Analysis: scans relevant project files and dependencies; (2) Strategic Planning: generates a multi-file plan for developer review; (3) Iterative Execution: writes code and executes build commands; (4) Self-Healing Validation: reads stderr terminal errors and autonomously iterates until stability is achieved."
      }
    ],
    "commandsTable": [
      {
        "cmd": "gh copilot suggest 'command'",
        "use": "Asks GitHub Copilot CLI to generate terminal shell syntax for complex commands."
      },
      {
        "cmd": "gh copilot explain 'command'",
        "use": "Translates cryptic bash, git, or PowerShell commands into plain English."
      }
    ]
  },
  {
    "id": 9,
    "code": "PHASE 09",
    "shortTitle": "Model Context Protocol (MCP)",
    "title": "The Model Context Protocol: Enterprise AI Tool Integration",
    "subtitle": "JSON-RPC 2.0 Client-Server Architecture, STDIO vs HTTP/SSE Transports, Official GitHub MCP Server Toolsets & Governance",
    "image": "/images/phase-6.jpg",
    "imageCaption": "FIG 9.1 \u2014 MODEL CONTEXT PROTOCOL: CONNECTING AI AGENTS TO REAL-TIME ENTERPRISE INFRASTRUCTURE",
    "analogyTitle": "The Universal USB-C for AI Applications",
    "analogyText": "Before USB-C, every device had proprietary chargers and cables. The Model Context Protocol (MCP) is the universal USB-C standard for AI models: it gives AI agents a standard plug to talk to GitHub repos, live databases, internal file systems, and Slack without custom connectors!",
    "technicalTerms": [
      {
        "term": "Model Context Protocol (MCP)",
        "plain": "An open standard created by Anthropic allowing AI models to safely access external tools, databases, and APIs."
      },
      {
        "term": "JSON-RPC 2.0",
        "plain": "A lightweight remote procedure call protocol used by MCP to send structured requests and responses between AI and servers."
      },
      {
        "term": "STDIO Transport",
        "plain": "A secure local connection where the AI host spawns the MCP server as a local subprocess and communicates via standard in/out."
      },
      {
        "term": "GitHub MCP Server",
        "plain": "An official proxy allowing AI agents to query issues, create branches, inspect CI runs, and summarize pull requests."
      }
    ],
    "sections": [
      {
        "heading": "9.1 The Three Core MCP Primitives: Resources, Prompts, and Tools",
        "body": "MCP standardizes three foundational primitives for connecting AI agents to enterprise data: (1) Resources: structured, semantic read-only data sources (like file contents, database tables, or live logs); (2) Prompts: reusable, parameterized interaction templates that guide agents through complex workflows; (3) Tools: executable functions that AI models can invoke dynamically with JSON Schema arguments to create branches or deploy systems."
      },
      {
        "heading": "9.2 Enterprise Governance & Managed Settings",
        "body": "Granting AI agents programmatic access to repositories requires strict security policies. Enterprise administrators enforce allowlists via 'managed-settings.json': built-in verified servers (like GitHub MCP) are permitted by default, while untrusted third-party servers or unauthorized local executables are categorically blocked to prevent data exfiltration."
      },
      {
        "heading": "9.3 Real-World GitHub MCP Superpowers: From Code Inspection to Autonomous Bug Fixing",
        "body": "When you connect GitHub MCP to your AI tool (Claude, ChatGPT, DeepSeek, Cursor, or Grok), the AI is no longer a passive text generator—it becomes an autonomous software developer with direct repository access. Here is what you can do: (1) Inspect Entire Repositories: The AI reads file trees, multi-file codebases, and commit logs directly without manual copy-pasting; (2) Direct Code Editing & Commits: The AI writes file modifications, generates clean commit messages, and pushes snapshots straight to your branch; (3) Autonomous Bug Fixing: You can paste a bug report or Issue link—the AI analyzes the problem, edits the source files, and opens a Pull Request for your review; (4) Pull Request Management: The AI compares branches, writes detailed PR summaries, and reviews teammates' diffs; (5) Issue Tracking: The AI drafts issue responses, creates labels, and tracks sprint tasks directly."
      }
    ],
    "commandsTable": [
      {
        "cmd": "npx @modelcontextprotocol/inspector",
        "use": "Launches the interactive developer GUI to test and inspect local MCP servers."
      },
      {
        "cmd": "curl -H 'Content-Type: application/json' <endpoint>",
        "use": "Tests JSON-RPC 2.0 endpoint connectivity for remote HTTP/SSE MCP servers."
      }
    ]
  },
  {
    "id": 10,
    "code": "PHASE 10",
    "shortTitle": "The Open-Source Workflow",
    "title": "The Open-Source Workflow: Forks, Upstream Sync, and Release Governance",
    "subtitle": "Fork Topologies, Upstream Remote Tracking, Shelving Changes with Git Stash, Merge vs Rebase, Issues & Semantic Versioning Releases",
    "image": "/images/phase-4.jpg",
    "imageCaption": "FIG 10.1 — THE OPEN-SOURCE ECOSYSTEM: UPSTREAM SYNCHRONIZATION, SHELVING, REBASING & RELEASES",
    "analogyTitle": "The Public Library & Personal Notebook Analogy",
    "analogyText": "Imagine an authoritative encyclopedia in the college central library (the upstream repository). As a student, you cannot scribble your notes directly on the library's master copy. Instead, you photocopy the book to your personal desk (a fork). When the librarians release revised chapters, you update your personal copy with a fast delivery slip (upstream sync). And when your study session is suddenly interrupted by another urgent task, you slip a bookmark in and set your draft notes in a drawer (git stash) until you are ready to resume!",
    "technicalTerms": [
      {
        "term": "Upstream Remote",
        "plain": "The original authoritative repository from which you created your fork, tracked locally via 'git remote add upstream <url>' to pull ongoing changes."
      },
      {
        "term": "git stash",
        "plain": "A temporary shelf that safely saves uncommitted modifications without making a formal commit, letting you switch branches with a clean working directory."
      },
      {
        "term": "Merge vs Rebase",
        "plain": "'git merge' creates a merge commit preserving historical branches; 'git rebase' rewrites commit history onto the tip of another branch for a clean, linear timeline."
      },
      {
        "term": "Semantic Versioning (SemVer)",
        "plain": "A standard version numbering system: MAJOR.MINOR.PATCH (e.g., v2.1.0) indicating breaking changes, new features, and bug fixes."
      },
      {
        "term": "Good First Issue",
        "plain": "A curated GitHub issue label marking well-scoped tasks ideal for newcomers making their first contribution."
      }
    ],
    "sections": [
      {
        "heading": "10.1 Forks vs Clones and Keeping in Sync with Upstream",
        "body": "When contributing to open-source or community repositories where you do not possess direct push permissions, the standard workflow begins with a Fork. A fork creates an independent, server-side copy of the project under your own GitHub account. Once cloned locally, your laptop is linked to your personal fork (designated as 'origin'). To incorporate updates from the central project, you configure a second remote called 'upstream' pointing to the authoritative repo. Regularly running 'git fetch upstream' and merging or rebasing against 'upstream/main' ensures your branch never diverges into irreconcilable merge conflicts."
      },
      {
        "heading": "10.2 Shelving In-Progress Work with git stash and stash pop",
        "body": "Often, you are halfway through editing files on a feature branch when an urgent bug arises or you need to pull latest changes from upstream. Git prevents switching branches if uncommitted changes would be overwritten. Instead of making sloppy 'wip' (work-in-progress) commits, use 'git stash'. Stashing takes your uncommitted modifications (both staged and unstaged) and saves them onto an internal stack, returning your working directory to a clean HEAD state. Once your urgent task or sync is complete, run 'git stash pop' to reapply your shelved modifications exactly where you left off."
      },
      {
        "heading": "10.3 Merge vs Rebase: Understanding Linear History vs Preserved Topology",
        "body": "When bringing your feature branch in sync with main, you face an architectural choice: Merge or Rebase. 'git merge' is non-destructive: it joins the two branch tips by creating a dedicated 'merge commit', preserving the exact branching topology and timeline. Conversely, 'git rebase' takes all commits on your current feature branch and replays them one by one on top of the latest commit of the target branch. Rebase produces a clean, perfectly linear commit history without merge bubbles. Rule of thumb: never rebase public shared branches that others are actively working on; use rebase on local personal feature branches before submitting a Pull Request."
      },
      {
        "heading": "10.4 GitHub Issues, Labels, Good First Issues & Project Kanban Boards",
        "body": "Healthy open-source collaboration centers around GitHub Issues. Issues track bugs, feature requests, and architectural discussions. Maintainers categorize issues using colored labels: 'bug' (defects), 'enhancement' (new features), 'documentation' (guides and READMEs), and 'good first issue' (introductory tasks curated for newcomers). GitHub Projects adds Kanban boards (To Do, In Progress, Done) directly integrated with issues and pull requests, giving engineering teams complete visibility into sprint milestones."
      },
      {
        "heading": "10.5 Semantic Versioning, Git Tags, and Official GitHub Releases",
        "body": "Software releases must be predictable. Industry teams follow Semantic Versioning (SemVer: MAJOR.MINOR.PATCH). A MAJOR increment (e.g. 2.0.0) indicates breaking API changes; MINOR (e.g. 1.2.0) introduces backward-compatible functionality; PATCH (e.g. 1.1.3) delivers backward-compatible bug fixes. In Git, milestones are pinned using annotated tags ('git tag -a v1.0.0 -m \"Release v1.0.0\"'). Pushing tags to GitHub enables creating an official Release, bundling downloadable build artifacts (binaries, zip files) and generating automated changelog release notes."
      }
    ],
    "commandsTable": [
      {
        "cmd": "git remote add upstream <url>",
        "use": "Registers the original authoritative community repository as an upstream remote."
      },
      {
        "cmd": "git fetch upstream",
        "use": "Downloads all branches and commits from the upstream repository without altering local files."
      },
      {
        "cmd": "git merge upstream/main",
        "use": "Merges changes from the upstream main branch into your current active branch."
      },
      {
        "cmd": "git rebase upstream/main",
        "use": "Replays your local branch commits on top of upstream main for a clean linear history."
      },
      {
        "cmd": "git stash",
        "use": "Shelves modified, tracked files into a temporary stack, restoring a clean working tree."
      },
      {
        "cmd": "git stash pop",
        "use": "Restores the most recently stashed changes back into your working directory."
      },
      {
        "cmd": "git tag -a v1.0.0 -m 'Release v1.0.0'",
        "use": "Creates an annotated Git tag with a release message at the current commit."
      },
      {
        "cmd": "git push origin --tags",
        "use": "Pushes all locally created Git tags to the remote repository on GitHub."
      }
    ]
  }
];
