# Learn GitHub — IIIT Trichy Devs

Official interactive Git & GitHub curriculum and repository lab platform for Indian Institute of Information Technology, Tiruchirappalli (IIITT) students.

- **Live Platform**: [https://learn-github-iiitt.vercel.app/](https://learn-github-iiitt.vercel.app/)
- **Organization**: [https://github.com/IIIT-Trichy-Devs](https://github.com/IIIT-Trichy-Devs)
- **Target Audience**: 1st-year CSE, ECE, and VLSI undergraduate developers, campus project teams, and open-source contributors.

---

## Overview

Most university students struggle with Git because traditional tutorials either focus on disconnected commands (`git commit`, `git push`) or leap directly into complex branching without explaining why version control exists.

`learn-github-iiitt` provides a complete, hands-on architectural journey:
1. **Interactive Curriculum**: 10 progressive phases going from absolute zero to enterprise AI tooling and open-source contribution.
2. **Interactive UI Map**: Visual walkthrough of github.com with deep dives on buttons, clone modals, and commit timelines.
3. **Windows CMD Simulator & DAG Explorer**: Test commands safely in a simulated terminal and watch Git SHA-1 blobs, trees, and commit pointers form live.
4. **Interactive Assessments**: Zero-stress phase quizzes and terminal verification challenges.
5. **Applied Project Blueprints**: 6 curated campus projects with production starter files and checklists.
6. **Post-Curriculum Roadmap**: Structured trajectory from Week 1 identity setup to hackathon squads and specialized engineering tracks.

---

## The 10 Curriculum Phases

| Phase | Title | Core Focus |
| :--- | :--- | :--- |
| **Phase 01** | Git & GitHub Foundations | Version control principles, distributed repos, contribution graph, stars & forks. |
| **Phase 02** | Upload Methods & Project Storefronts | Web drag-and-drop, VS Code Git integration, README.md, and .gitignore. |
| **Phase 03** | Commit History & Staging | Staging buffer, DAG diffs, commit hashes, and conventional commit messages. |
| **Phase 04** | Team Collaboration & PRs | Feature branches, Pull Requests, code review comments, and merge conflict resolution. |
| **Phase 05** | Git Internals & DAG Architecture | Object database (.git/objects), SHA-1 hashing, Blobs, Trees, Commits, and HEAD refs. |
| **Phase 06** | The Windows CMD Runbook | PowerShell vs CMD.exe, SSH keys, credential helper, and common terminal pitfalls. |
| **Phase 07** | CI/CD Pipelines & Security | GitHub Actions, runner environments, least-privilege permissions, and OIDC tokens. |
| **Phase 08** | AI-Augmented Development | GitHub Copilot CLI, instruction files (.github/copilot-instructions.md), and prompt engineering. |
| **Phase 09** | Model Context Protocol (MCP) | JSON-RPC 2.0 client-server architecture, STDIO/SSE transports, and GitHub MCP server. |
| **Phase 10** | The Open-Source Workflow | Forking, upstream remotes (`git remote add upstream`), git stash, merge vs rebase, and SemVer releases. |

---

## The 6 Applied Campus Projects

1. **Project 01 • Beginner Foundation**: Initialize & Publish Your First IIIT Trichy Course Repo with MIT License.
2. **Project 02 • Open-Source Collaboration**: Fork & Submit Your First Pull Request to IIIT-Trichy-Devs Community Roster (`github.com/IIIT-Trichy-Devs/community-roster`).
3. **Project 03 • CI/CD & GitHub Pages**: Zero-Branch Portfolio Deployment with `actions/deploy-pages@v4` and Node.js build step.
4. **Project 04 • AI Copilot & MCP Governance**: Configure Copilot Instructions & Enterprise MCP Server Allowlists.
5. **Project 05 • First Real Campus Tool**: Build and deploy an Attendance/Bunk Calculator, Timetable Viewer, Mess Menu Tracker, or Course Lab Archive.
6. **Project 06 • First Open-Source Contribution**: Find a `good first issue`, fork, configure upstream, branch, fix code/docs, open a PR, and iterate with maintainers.

---

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS with strict editorial light mode (`#F5F3EE` canvas, `#FFFFFF` cards, `#C8C2B5` hairline borders, `#16181D` ink, `#1D6B52` academic safe accent)
- **Typography**: Instrument Serif (editorial headings), Geist (body UI sans), and Geist Mono (metadata & terminal)
- **Icons**: Lucide React
- **Linter & Verification**: Oxlint (fast Rust-based linter) and TypeScript strict typechecking
- **Deployment**: Vercel production hosting (`https://learn-github-iiitt.vercel.app/`) with GitHub Actions CI

---

## Local Development

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher

### Setup Commands
```bash
# Clone the repository
git clone https://github.com/IIIT-Trichy-Devs/learn-github-iiitt.git
cd learn-github-iiitt

# Install dependencies
npm install

# Start local development server (Vite HMR)
npm run dev

# Run linter
npm run lint

# Compile TypeScript and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Contributing

We welcome contributions from all IIIT Trichy students and alumni!

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for full instructions.
2. Fork the repository on GitHub.
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/IIIT-Trichy-Devs/learn-github-iiitt.git
   ```
4. Create a descriptive feature branch:
   ```bash
   git checkout -b feat/add-phase-quiz-question
   ```
5. Follow conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
6. Verify locally before opening a PR (`npm run lint` && `npm run build`).
7. Open a Pull Request referencing an issue.

---

## License

Distributed under the MIT License. Maintained by the **IIIT-Trichy-Devs** student developer community.
