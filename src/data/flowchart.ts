export interface FlowchartStage {
  id: number | string;
  step: string;
  name: string;
  cmd: string;
  summary: string;
  keyObjects: string;
  stage?: string | number;
  command?: string;
  actor?: string;
  desc?: string;
  shaRole?: string;
  activeSection?: string;
  [key: string]: any;
}

export const flowchartStages: FlowchartStage[] = [
      {
        id: 1,
        step: 'STAGE 01',
        name: 'Local Init & Staging',
        cmd: 'git init → git add .',
        summary: 'Developer creates or edits files in the Working Directory. Running "git add" hashes file contents into SHA-1 Blobs inside .git/objects and stages them in the Index buffer.',
        keyObjects: 'Working Directory → .git/index → Blob Objects (SHA-1)'
      },
      {
        id: 2,
        step: 'STAGE 02',
        name: 'DAG Snapshot Commit',
        cmd: 'git commit -m "feat: ..."',
        summary: 'Git writes a Tree object (mapping filenames & 100644/040000 mode bits) and an immutable Commit object pointing to the root Tree and parent Commit, advancing HEAD.',
        keyObjects: 'Tree Object → Commit Object → HEAD / refs/heads/main'
      },
      {
        id: 3,
        step: 'STAGE 03',
        name: 'Remote Sync & PR',
        cmd: 'git push / Pull Request',
        summary: 'Commits are transmitted to the GitHub repository (or personal Fork). Opening a Pull Request proposes merging the divergent branch into the upstream codebase.',
        keyObjects: 'origin/main → Fork Namespace → Pull Request Diff Review'
      },
      {
        id: 4,
        step: 'STAGE 04',
        name: 'CI/CD Actions Pipeline',
        cmd: '.github/workflows/*.yml',
        summary: 'Push or PR triggers isolated runners executing Composite Actions (step-level) or Reusable Workflows (job-level) and deploying artifacts via actions/deploy-pages@v4.',
        keyObjects: 'upload-pages-artifact → deploy-pages@v4 (pages: write)'
      },
      {
        id: 5,
        step: 'STAGE 05',
        name: 'OIDC & Security Gate',
        cmd: 'id-token: write (OIDC JWT)',
        summary: 'GITHUB_TOKEN is scoped to least-privilege. Job exchanges an ephemeral OIDC JWT (bound to sub & aud claims) with AWS/GCP STS instead of static secrets, isolating pull_request_target.',
        keyObjects: 'token.actions.githubusercontent.com → STS Ephemeral Session'
      },
      {
        id: 6,
        step: 'STAGE 06',
        name: 'Copilot Agent & MCP',
        cmd: 'tools/list → tools/call',
        summary: 'Guided by .github/copilot-instructions.md, Copilot Agent Mode plans, executes, and self-heals code while querying the GitHub MCP Server under managed-settings.json allowlists.',
        keyObjects: 'JSON-RPC 2.0 (STDIO / HTTP+SSE) → GitHub MCP Toolsets'
      }
    ];
