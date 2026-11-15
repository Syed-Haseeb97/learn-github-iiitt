# Contributing to Learn GitHub — IIIT Trichy Devs

Thank you for your interest in improving the Git & GitHub learning platform for IIIT Trichy! We encourage contributions from all students, whether you are fixing typos, improving explanations, adding quizzes, or introducing new campus project blueprints.

---

## Code of Conduct & Principles

1. **Strict Editorial Design**: The UI strictly follows a light-mode editorial palette (`#F5F3EE` canvas, `#FFFFFF` surfaces, `#C8C2B5` stone hairline borders, `#16181D` deep charcoal ink). Never add dark mode, heavy drop shadows, or generic unstyled boxes.
2. **No Blinking or Pulsing Elements**: Blinking/pulsing dots (`animate-pulse`, `animate-ping`) are strictly prohibited across the application. All indicators and status badges must remain completely static and calm.
3. **No Emojis in UI Text**: Use clean Lucide React icons instead of unicode emojis for consistent, high-contrast academic aesthetics.
4. **Beginner Empathy**: Explanations must be accessible to students on day one of their college journey. Always ground complex Git internal mechanics in simple analogies.

---

## Step-by-Step Contribution Workflow

### 1. Fork & Clone
1. Fork `https://github.com/Syed-Haseeb97/learn-github-iiitt` to your GitHub account.
2. Clone your personal fork locally:
   ```bash
   git clone https://github.com/<your-username>/learn-github-iiitt.git
   cd learn-github-iiitt
   ```
3. Configure the upstream remote to sync with the main community repository:
   ```bash
   git remote add upstream https://github.com/Syed-Haseeb97/learn-github-iiitt.git
   git remote -v
   ```

### 2. Create a Feature Branch
Always work on a dedicated, descriptively named branch:
```bash
git checkout -b feat/add-quiz-explanation
# or
git checkout -b fix/community-roster-link
```

### 3. Making Content Changes

All educational curriculum content lives in `src/data/`:

- **Editing or Adding a Phase (`src/data/phases.ts`)**:
  - Each phase adheres to the `Phase` interface (`id`, `code`, `shortTitle`, `title`, `subtitle`, `image`, `analogyTitle`, `analogyText`, `technicalTerms`, `sections`, `commandsTable`).
  - Keep sections modular with clear numbered headings.
  - If adding a new phase, also update `src/data/assessments.ts` to include corresponding quiz questions and terminal verification tasks.

- **Editing or Adding a Project Blueprint (`src/data/projects.ts`)**:
  - Each project adheres to `ProjectBlueprint` (`id`, `tag`, `title`, `goal`, `files`, `steps`).
  - `files` provides starter code that students can copy directly into their projects.
  - `steps` provides an actionable runbook.

- **Editing Assessments (`src/data/assessments.ts`)**:
  - Each phase has 3 multiple-choice questions with answer explanations and 1 hands-on terminal command challenge.

- **Editing the Flowchart (`src/data/flowchart.ts`)**:
  - Contains stages in the Git DAG and lifecycle pipeline.

### 4. Commit Conventions

Follow standard conventional commit specifications:

- `feat:` for new features, phases, or projects (e.g. `feat: add phase 10 open-source workflow`)
- `fix:` for bug fixes or broken links (e.g. `fix: correct community-roster link in project 02`)
- `docs:` for documentation updates (e.g. `docs: update README with local setup instructions`)
- `refactor:` for code restructurings without behavior changes
- `chore:` for dependencies, linters, or build configs

### 5. Local Verification

Before committing and pushing, always run the full verification pipeline:

```bash
# 1. Install dependencies
npm install

# 2. Run linter
npm run lint

# 3. Compile TypeScript and test production build
npm run build
```

Both `npm run lint` and `npm run build` must pass with **0 errors**.

### 6. Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push -u origin feat/your-branch-name
   ```
2. Navigate to `https://github.com/Syed-Haseeb97/learn-github-iiitt` and click **Compare & pull request**.
3. Fill out the pull request template completely, detailing:
   - Summary of changes
   - Related issue number (e.g. `Closes #12`)
   - How the changes were verified locally
4. Maintainers will review your PR. Be open to feedback and push subsequent commits to the same branch if revisions are requested.
