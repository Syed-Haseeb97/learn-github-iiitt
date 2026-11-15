export interface ProjectBlueprint {
  id: string;
  tag: string;
  title: string;
  goal: string;
  files: { name: string; code: string }[];
  steps: string[];
  domain?: string;
  difficulty?: string;
  timeframe?: string;
  description?: string;
  iiittRelevance?: string;
  workflowSteps?: string[];
  architectureComponents?: string[];
  starterFiles?: string[];
  [key: string]: any;
}

export const projectsLabData: ProjectBlueprint[] = [
      {
        id: 'proj-1',
        tag: 'PROJECT 01 • BEGINNER FOUNDATION',
        title: 'Initialize & Publish Your First IIIT Trichy Course Repo with MIT License',
        goal: 'Create a clean repository for your 1st-year CS/ECE lab assignments, exclude compiled binaries with .gitignore, attach an MIT License, and push from Windows CMD.',
        files: [
          {
            name: 'README.md',
            code: `# CS101 Data Structures & Algorithms — IIIT Trichy\nMaintained by **IIIT Trichy Developer** (IIIT Trichy Devs Community)\n\n## Folder Structure\n- \`/linked-lists\`: Singly & doubly linked list implementations in C\n- \`/trees\`: Binary search tree traversal labs\n\n## License\nDistributed under the MIT License.`
          },
          {
            name: '.gitignore',
            code: `# Ignore compiled C executables and Windows temp files\n*.exe\n*.out\n*.obj\n.vscode/\n.env`
          }
        ],
        steps: [
          'Run `git init` inside `C:\\Users\\IIITT_Student\\cs101-labs` to create the `.git` database.',
          'Create `README.md`, `.gitignore`, and select the `MIT License` on GitHub so others can legally fork and learn from your code.',
          'Run `git add .` and `git commit -m "feat: add initial lab solutions and MIT license"`.',
          'Link your GitHub repo with `git remote add origin <url>` and run `git push -u origin main`.'
        ]
      },
      {
        id: 'proj-2',
        tag: 'PROJECT 02 • OPEN-SOURCE COLLABORATION',
        title: 'Fork & Submit Your First Pull Request to IIIT Trichy Devs Community Directory',
        goal: 'Experience the real open-source workflow without needing direct write access to the central community repository.',
        files: [
          {
            name: 'members/batch-2026.json',
            code: `{\n  "community": "IIIT Trichy Devs Community",\n  "member": {\n    "name": "First-Year Member",\n    "department": "CSE / ECE",\n    "github": "https://github.com/iiitt-student",\n    "skills": ["C", "Git", "GitHub Actions"]\n  }\n}`
          }
        ],
        steps: [
          'Click the **Fork** button at the top-right of `github.com/IIIT-Trichy-Devs/community-roster` to create a server-side clone under your username.',
          'Run `git clone https://github.com/<your-username>/community-roster.git` in Windows CMD.',
          'Create a dedicated branch: `git checkout -b add-my-profile`.',
          'Stage, commit, push to your fork (`git push origin add-my-profile`), and click **Compare & pull request** on GitHub!'
        ]
      },
      {
        id: 'proj-3',
        tag: 'PROJECT 03 • CI/CD & GITHUB PAGES',
        title: 'Zero-Branch Portfolio Deployment with actions/deploy-pages@v4',
        goal: 'Deploy your student developer portfolio automatically on every push to main using modern artifact-based GitHub Actions and least-privilege OIDC permissions.',
        files: [
          {
            name: '.github/workflows/deploy-pages.yml',
            code: `name: Deploy IIITT Student Portfolio to Pages\non:\n  push:\n    branches: ["main"]\n  workflow_dispatch:\n\npermissions:\n  contents: read\n  pages: write\n  id-token: write\n\njobs:\n  build-and-deploy:\n    environment:\n      name: github-pages\n      url: \${{ steps.deployment.outputs.page_url }}\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout trusted base code\n        uses: actions/checkout@v4\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: 'npm'\n      - name: Install dependencies\n        run: npm ci\n      - name: Build site\n        run: npm run build\n      - name: Upload static artifact\n        uses: actions/upload-pages-artifact@v3\n        with:\n          path: './dist'\n      - name: Deploy to GitHub Pages\n        id: deployment\n        uses: actions/deploy-pages@v4`
          }
        ],
        steps: [
          'Create `.github/workflows/deploy-pages.yml` in your repository.',
          'Declare explicit least-privilege permissions (`contents: read`, `pages: write`, `id-token: write`).',
          'Include the Node.js setup, `npm ci`, and `npm run build` steps to compile assets into `./dist`. Plain HTML site with no build step? Change the upload path to \'.\'.',
          'In your GitHub Repo → **Settings → Pages**, set Source to **GitHub Actions** (no `gh-pages` branch required).',
          'Push to `main` and watch the **Actions** tab package and publish your live URL.'
        ]
      },
      {
        id: 'proj-4',
        tag: 'PROJECT 04 • AI COPILOT & MCP GOVERNANCE',
        title: 'Configure Copilot Instructions & Enterprise MCP Allowlist',
        goal: 'Condition GitHub Copilot with team coding standards and lock down MCP servers with a deny-by-default managed-settings.json policy.',
        files: [
          {
            name: '.github/copilot-instructions.md',
            code: `# IIIT Trichy Devs Community — Copilot Engineering Rules\n- Always use strict light-mode semantic tokens (#F5F3EE canvas, #16181D ink).\n- Never use pull_request_target with untrusted PR head checkouts.\n- Prefer OIDC federation (id-token: write) over static cloud secrets.\n- Write unit tests for all new API endpoints before completing Agent Mode loops.`
          },
          {
            name: '.github-private/managed-settings.json',
            code: `{\n  "mcpGovernance": {\n    "builtInGitHubMcpServer": "allowed",\n    "deniedMcpServers": [\n      "^https://untrusted-registry\\\\.example\\\\.com/.*$"\n    ],\n    "allowedMcpServers": [\n      {\n        "name": "github-official-mcp",\n        "toolsets": ["repos", "issues", "pull_request", "actions"]\n      },\n      {\n        "name": "iiitt-local-postgres-stdio",\n        "serverCommand": "npx -y @modelcontextprotocol/server-postgres"\n      }\n    ]\n  }\n}`
          }
        ],
        steps: [
          'Add `.github/copilot-instructions.md` at your repo root so Copilot automatically follows community architecture standards.',
          'Add path-specific `.instructions.md` files with `applyTo: "src/api/**/*.ts"` for backend modules.',
          'Enable the official GitHub MCP Server toolsets (`repos`, `issues & pull_request`, `actions`) in Agent Mode.',
          'Audit `.github-private/managed-settings.json` to ensure regex denylists and explicit whitelists block unverified MCP servers.'
        ]
      },
      {
        id: 'proj-5',
        tag: 'PROJECT 05 • FIRST REAL CAMPUS TOOL',
        title: 'Build & Deploy Your First Campus Utility (Attendance, Timetable, Mess, or Lab Repo)',
        goal: 'Create a standalone, campus-useful tool with clean repository architecture. Practice feature branches, .gitignore, conventional commits, and deploy live on GitHub Pages or Vercel.',
        files: [
          {
            name: 'README.md',
            code: `# IIIT Trichy Campus Utility — Attendance & Bunk Calculator\n\nLive Demo: https://<your-username>.github.io/attendance-calc/\n\n## Overview\nA lightweight client-side utility built for IIIT Trichy students to track course attendance percentages against the mandatory 75% institutional threshold and calculate safe bunks remaining.\n\n## Four Campus Project Options\n1. **Attendance / Bunk Calculator**: Input attended vs total lectures to determine how many classes you can afford to miss.\n2. **Timetable & Exam Schedule Viewer**: Responsive daily schedule with current-slot highlighting.\n3. **Hostel Mess Menu Tracker**: Day-by-day breakfast, lunch, snacks, and dinner schedule with meal ratings.\n4. **Curated Lab Programs Archive**: Organized lab assignment repository with a structured README per course.\n\n## Architecture & Standards\n- Isolated feature branches for every enhancement (\`feat/calc-logic\`, \`feat/responsive-table\`)\n- Strict \`.gitignore\` ignoring all build outputs and sensitive tokens\n- Semantic conventional commits (\`feat:\`, \`fix:\`, \`docs:\`)\n- Deployed automatically via GitHub Actions or Vercel on push to \`main\`\n\n## Local Setup\n\`\`\`bash\ngit clone https://github.com/<your-username>/attendance-calc.git\ncd attendance-calc\nnpm install\nnpm run dev\n\`\`\`\n\n## License\nMIT License.`
          },
          {
            name: '.gitignore',
            code: `# Dependencies\nnode_modules/\n/.pnp\n.pnp.js\n\n# Production build outputs\ndist/\nbuild/\nout/\n\n# Environment & secrets\n.env\n.env.local\n.env.production\n\n# Editor & OS temporary files\n.DS_Store\nThumbs.db\n.vscode/\n*.log\n*.tmp`
          },
          {
            name: 'src/calculator.js',
            code: `// IIIT Trichy 75% Attendance & Bunk Calculator Logic\nexport function calculateBunks(attended, total) {\n  const currentPercentage = (attended / total) * 100;\n  const targetRatio = 0.75;\n  \n  if (currentPercentage < 75) {\n    // Need to attend more classes to reach 75%\n    // Formula: (attended + x) / (total + x) >= 0.75\n    // x = (0.75 * total - attended) / (1 - 0.75)\n    const requiredClasses = Math.ceil((targetRatio * total - attended) / (1 - targetRatio));\n    return {\n      status: 'shortage',\n      percentage: currentPercentage.toFixed(1),\n      actionNeeded: \`Attend next \${requiredClasses} consecutive classes to recover to 75%.\`,\n      safeBunks: 0\n    };\n  } else {\n    // Above 75%: can afford to miss some classes\n    // Formula: attended / (total + x) >= 0.75\n    // x = (attended / 0.75) - total\n    const safeBunks = Math.floor((attended / targetRatio) - total);\n    return {\n      status: 'safe',\n      percentage: currentPercentage.toFixed(1),\n      actionNeeded: \`You are safe! You can miss \${safeBunks} more classes while maintaining >= 75%.\`,\n      safeBunks\n    };\n  }\n}`
          }
        ],
        steps: [
          'Choose 1 of 4 campus utility blueprints: (1) Attendance & Bunk Calculator; (2) Timetable & Exam Schedule Viewer; (3) Hostel Mess Menu Tracker; or (4) Curated Lab Programs Repository with per-course READMEs.',
          'Initialize your local repository with `git init` and commit a comprehensive `.gitignore` first to prevent tracking build artifacts, dependencies, or secrets.',
          'Develop on feature branches: `git checkout -b feat/calculator-engine`. Never commit unfinished experimental code directly onto `main`.',
          'Use conventional commits: `feat: implement 75% threshold logic`, `fix: handle edge case when total classes is zero`, `docs: add live URL and usage instructions to README`.',
          'Deploy your tool live using GitHub Pages (via `.github/workflows/deploy-pages.yml`) or connect your repo to Vercel for zero-config production deployments.'
        ]
      },
      {
        id: 'proj-6',
        tag: 'PROJECT 06 • FIRST OPEN-SOURCE CONTRIBUTION',
        title: 'Find an Issue, Fork, Fix & Submit Your First Open-Source Pull Request',
        goal: 'Transition from solo projects to community contributor: locate a "good first issue", fork an active community repo, branch, fix code or documentation, open a Pull Request, and respond to code reviews.',
        files: [
          {
            name: '.github/pull_request_template.md',
            code: `## Summary of Changes\n- Briefly describe the bug fixed or feature added.\n\n## Related Issue\n- Closes # (e.g. Closes #42)\n\n## Checklist\n- [ ] My code adheres to the project's formatting and architectural guidelines\n- [ ] I have verified the fix locally (\`npm run build\` or local test suite)\n- [ ] No extraneous files or secrets are included in this PR\n- [ ] Commit messages follow conventional commit specifications (\`feat:\`, \`fix:\`, \`docs:\`)`
          },
          {
            name: 'CONTRIBUTING.md',
            code: `# Contributing to IIIT-Trichy-Devs\n\nThank you for contributing! We welcome bug fixes, documentation improvements, and new features.\n\n## Getting Started\n1. Search existing issues labeled \`good first issue\` or \`documentation\`.\n2. Comment on the issue to get assigned before beginning work.\n3. Fork the repository to your own GitHub profile.\n4. Clone your fork locally and configure upstream:\n   \`\`\`bash\n   git clone https://github.com/<your-username>/<repo-name>.git\n   cd <repo-name>\n   git remote add upstream https://github.com/IIIT-Trichy-Devs/<repo-name>.git\n   \`\`\`\n5. Create a topic branch: \`git checkout -b fix/issue-description\`.\n6. Test changes thoroughly (\`npm run lint\` && \`npm run build\`).\n7. Push to your fork and submit a Pull Request to upstream \`main\`!`
          }
        ],
        steps: [
          'Locate an open issue with the label `good first issue` or `documentation` in community repositories like `IIIT-Trichy-Devs/learn-github-iiitt` or `IIIT-Trichy-Devs/community-roster`.',
          'Click the **Fork** button on GitHub to create your own server-side copy of the repository.',
          'Clone your fork locally and connect the upstream repository: `git remote add upstream https://github.com/IIIT-Trichy-Devs/learn-github-iiitt.git`. Verify with `git remote -v`.',
          'Create a dedicated topic branch: `git checkout -b fix/update-phase-10-links`.',
          'Implement your fix or documentation enhancement, verify it compiles cleanly (`npm run build`), and commit with conventional messages: `fix(docs): update upstream remote command explanation`.',
          'Push the branch to your fork (`git push -u origin fix/update-phase-10-links`) and open a Pull Request against the upstream community repository.',
          'Review CI/CD check results on GitHub, read maintainer comments, make any requested adjustments locally, and push additional commits to update the active PR automatically.'
        ]
      }
    ];
