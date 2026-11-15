export interface Hotspot {
  id: number;
  badge: string;
  name: string;
  title: string;
  simpleSummary: string;
  where: string;
  whatItIs: string;
  whyItMatters: string;
  studentTip: string;
  beginnerMistake?: string;
  mockupSnippet?: string;
}

export const uiHotspotsData: Hotspot[] = [
  {
    id: 1,
    badge: '01 / REPO NAMESPACE',
    name: 'Repository Namespace',
    title: 'Owner / Repository Name (iiitt-devs / campus-hostel-portal)',
    simpleSummary: 'The unique web address and home of your project on GitHub.',
    where: 'Top-left corner of every repository page.',
    whatItIs:
      'Every project has an address formatted as username/repo-name. "iiitt-devs" is the account or college club that owns it, and "campus-hostel-portal" is the project name. Anyone with the link can visit this repository.',
    whyItMatters:
      'Just like a website domain or an email address, this namespace guarantees your project is uniquely identified worldwide.',
    studentTip:
      'When you Fork a repo, the left side changes to YOUR username (e.g. your-name/campus-hostel-portal), giving you your own safe playground.',
    beginnerMistake:
      'Renaming a repository after sharing links with professors or submitting on Google Classroom can break the link if redirects fail.',
  },
  {
    id: 2,
    badge: '02 / FORK BUTTON',
    name: 'Fork Button',
    title: 'Fork — Make Your Own Copy on GitHub',
    simpleSummary: 'Creates an identical copy of someone else’s project inside your own GitHub account.',
    where: 'Top-right corner next to Star and Watch.',
    whatItIs:
      'Clicking Fork makes an independent cloud copy of the entire repository in your account. You can freely edit, commit, and push changes to your fork without affecting or needing permission for the original project.',
    whyItMatters:
      'This is how global open-source software works! Contributors fork a project, make improvements in their fork, and then submit a Pull Request back to the original project.',
    studentTip:
      'Always Fork open-source projects or classroom starter templates before cloning to your laptop so you have full push access.',
    beginnerMistake:
      'Confusing "Fork" with "Clone". A Fork lives on github.com under your account; a Clone is downloaded to your physical computer.',
  },
  {
    id: 3,
    badge: '03 / STAR & WATCH',
    name: 'Star & Watch',
    title: 'Star (Bookmark) & Watch (Notifications)',
    simpleSummary: 'Star bookmarks and supports a repo; Watch sends you updates and activity alerts.',
    where: 'Top-right action bar next to Fork.',
    whatItIs:
      'Starring is like giving a "like" or bookmarking a repository—starred repos show up in your GitHub profile favorites list. Watching configures email or notification alerts whenever someone creates an Issue or Pull Request.',
    whyItMatters:
      'Stars show community recognition and popularity. Recruiters frequently look at how many stars high-impact open-source tools have received.',
    studentTip:
      'Star repositories you find helpful during your engineering semesters so you can find them again easily before exams and hackathons.',
    beginnerMistake:
      'Watching "All Activity" on massive repositories like React or Linux, which will flood your college inbox with hundreds of emails every single day.',
  },
  {
    id: 4,
    badge: '04 / THE CODE TAB',
    name: 'The Code Tab',
    title: 'Code Tab — The Project File Browser',
    simpleSummary: 'Shows the files, folders, latest commits, and README for your project.',
    where: 'The first tab on the main repository horizontal navigation bar.',
    whatItIs:
      'The Code tab displays your repository file tree. Below the files, it automatically renders your README.md file as a clean webpage. You can click into any file to read its contents or view its line numbers.',
    whyItMatters:
      'This is the front window of your project. Anyone who visits your GitHub link sees this page first.',
    studentTip:
      'Notice that the hidden ".git" folder is never visible in this list. GitHub stores the underlying Git database securely on its servers.',
    beginnerMistake:
      'Committing massive temporary build folders like node_modules/, target/, or __pycache__/ here instead of ignoring them in .gitignore.',
  },
  {
    id: 5,
    badge: '05 / ISSUES TAB',
    name: 'Issues Tab',
    title: 'Issues — Bug Reports & Task Tracker',
    simpleSummary: 'A built-in to-do and bug-tracking board for the project team.',
    where: 'Second tab on the repository navigation bar.',
    whatItIs:
      'Issues are discussion threads for reporting bugs, requesting new features, or tracking homework tasks. Anyone can open an Issue to describe a problem, assign teammates, and tag labels like "bug" or "good first issue".',
    whyItMatters:
      'In tech companies, developers never code without a tracked ticket or issue. It keeps everyone aligned on what needs fixing.',
    studentTip:
      'Look for issues labeled "good first issue" in open-source projects—these are beginner-friendly bugs ideal for 1st-year students to solve.',
    beginnerMistake:
      'Opening an issue with just "It doesn’t work!" without sharing screenshots, error messages, or steps to reproduce the bug.',
  },
  {
    id: 6,
    badge: '06 / PULL REQUESTS',
    name: 'Pull Requests (PR)',
    title: 'Pull Requests — Propose & Review Code Changes',
    simpleSummary: 'The place where you propose your changes to be reviewed and merged into main.',
    where: 'Third tab on the repository navigation bar.',
    whatItIs:
      'When you finish writing a new feature on a branch, you open a Pull Request. It shows a color-coded side-by-side diff (green for added lines, red for deleted lines) so teammates or professors can review your work before merging it.',
    whyItMatters:
      'Pull Requests prevent bad code from breaking the main application. They enable automated tests to run and ensure peer code reviews.',
    studentTip:
      'Always write a clear 2-sentence description in your Pull Request explaining what feature you added and which issue it solves.',
    beginnerMistake:
      'Making a single giant Pull Request with 50 unrelated files changed. Keep your PRs small and focused on one task at a time.',
  },
  {
    id: 7,
    badge: '07 / ACTIONS CI/CD',
    name: 'Actions Tab',
    title: 'GitHub Actions — Automated Testing & Build Pipelines',
    simpleSummary: 'Automated virtual machines that run tests and deploy your code on every push.',
    where: 'Fourth tab on the repository navigation bar.',
    whatItIs:
      'GitHub Actions runs automated scripts defined in ".github/workflows/*.yml". Whenever anyone pushes code or creates a Pull Request, GitHub boots up a cloud runner to compile your code, run unit tests, and deploy your site.',
    whyItMatters:
      'Continuous Integration (CI) catches bugs immediately. If a test fails, you get a red X alert before bad code ever reaches users.',
    studentTip:
      'You can use GitHub Actions to automatically host your student portfolio website on GitHub Pages completely for free!',
    beginnerMistake:
      'Hardcoding API keys or passwords inside workflow YAML files instead of using GitHub Secrets (Settings > Secrets and variables).',
  },
  {
    id: 8,
    badge: '08 / BRANCH SELECTOR',
    name: 'Branch Selector',
    title: 'Branch Switcher (main / dev / feature)',
    simpleSummary: 'Switch between parallel versions of your codebase with one click.',
    where: 'Directly above the file table on the left side.',
    whatItIs:
      'Branches allow multiple developers to work on different features simultaneously without stepping on each other’s toes. The default branch is usually "main". Clicking this dropdown lets you view other branches or create a new one.',
    whyItMatters:
      'Branching keeps experimental or unfinished code separate from the stable, working version of your application.',
    studentTip:
      'Never write code directly on the "main" branch in a team project. Always create a new branch like "feature-login" or "nav-redesign".',
    beginnerMistake:
      'Working for weeks on the wrong branch and realizing you committed all your changes to an old abandoned experiment.',
  },
  {
    id: 9,
    badge: '09 / GREEN CODE BUTTON',
    name: 'Green <> Code Button',
    title: 'The Green <> Code Button — Clone & Codespaces',
    simpleSummary: 'Get the clone link (HTTPS / SSH) to download the repo into VS Code on your laptop.',
    where: 'Green button on the right side directly above the file list.',
    whatItIs:
      'Clicking this green button opens a popup containing the HTTPS repository URL (e.g. https://github.com/iiitt-devs/portal.git). You copy this URL to run "git clone <url>" in your terminal, or click "Open with Codespaces" to edit in the cloud.',
    whyItMatters:
      'This button is how you connect the cloud GitHub repository to your local computer editor (VS Code, IntelliJ, or terminal).',
    studentTip:
      'Always use "git clone <url>" instead of "Download ZIP". Cloning keeps the hidden .git history so you can pull updates and push new commits.',
    beginnerMistake:
      'Clicking "Download ZIP" and wondering why "git push" does not work later. ZIP downloads lack the Git database entirely!',
  },
  {
    id: 10,
    badge: '10 / FOUNDATION FILES',
    name: 'README, .gitignore & LICENSE',
    title: 'Essential Root Files: README, .gitignore & LICENSE',
    simpleSummary: 'The three must-have files that make your project professional and safe.',
    where: 'Displayed in the file list and at the bottom of the repository.',
    whatItIs:
      '• README.md: The markdown document explaining what your project is and how to run it.\n• .gitignore: Tells Git which temporary files (like node_modules/ or .env passwords) to NEVER upload.\n• LICENSE: Gives legal permission for others to use your code (e.g. MIT License is completely open for everyone).',
    whyItMatters:
      'A project without a README is confusing; a project without .gitignore leaks private files; a project without a LICENSE cannot legally be used by companies.',
    studentTip:
      'When creating any new repository on GitHub, always check the boxes to add a README.md and a .gitignore for your language.',
    beginnerMistake:
      'Uploading your private API keys or database passwords because you forgot to create a .gitignore file before running "git add .".',
  },
];
