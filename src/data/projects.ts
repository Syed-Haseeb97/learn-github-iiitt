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
            code: `name: Deploy IIITT Student Portfolio to Pages\non:\n  push:\n    branches: ["main"]\n  workflow_dispatch:\n\npermissions:\n  contents: read\n  pages: write\n  id-token: write\n\njobs:\n  build-and-deploy:\n    environment:\n      name: github-pages\n      url: \${{ steps.deployment.outputs.page_url }}\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout trusted base code\n        uses: actions/checkout@v4\n      - name: Upload static artifact\n        uses: actions/upload-pages-artifact@v3\n        with:\n          path: './dist'\n      - name: Deploy to GitHub Pages\n        id: deployment\n        uses: actions/deploy-pages@v4`
          }
        ],
        steps: [
          'Create `.github/workflows/deploy-pages.yml` in your repository.',
          'Declare explicit least-privilege permissions (`contents: read`, `pages: write`, `id-token: write`).',
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
      }
    ];
