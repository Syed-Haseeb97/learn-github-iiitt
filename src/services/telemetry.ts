import type { StudentIdentity } from '../types';

export interface ProgressStats {
  verifiedQuizzesCount: number;
  totalQuizzesCount: number;
  completedTasksCount: number;
  totalTasksCount: number;
  curriculumPercentage: number;
}

export interface TelemetryEvent {
  type:
    | 'registration'
    | 'profile_update'
    | 'visit'
    | 'navigation'
    | 'phase_select'
    | 'quiz_verified'
    | 'task_completed'
    | 'curriculum_completed';
  description: string;
  details?: string;
  timestamp: string;
}

interface QueuedItem {
  identity: StudentIdentity | null;
  event: TelemetryEvent;
  stats: ProgressStats;
}

let eventBuffer: QueuedItem[] = [];
let bufferTimeout: ReturnType<typeof setTimeout> | null = null;

// Format current time in IST (Indian Standard Time - UTC+5:30)
function getFormattedIST(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

// Convert department id to readable label
function formatDepartment(dept?: string): string {
  switch (dept) {
    case 'cse':
      return 'Computer Science & Engineering (CSE)';
    case 'ece':
      return 'Electronics & Communication (ECE)';
    case 'vlsi_other':
      return 'VLSI / Core Engineering';
    default:
      return 'IIIT Trichy';
  }
}

async function postToEndpoint(body: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok;
  } catch {
    // Graceful offline fallback
    return false;
  }
}

function buildDiscordPayload(
  identity: StudentIdentity | null,
  event: TelemetryEvent,
  stats: ProgressStats
): Record<string, unknown> {
  const istTime = getFormattedIST(new Date(event.timestamp));
  const githubUser = identity?.githubUsername ? identity.githubUsername.replace(/^@/, '') : null;
  const studentName = identity?.name || 'Anonymous Student';
  const dept = formatDepartment(identity?.department);

  let color = 2845872; // Blue (#2B6CB0)
  let title = event.description;

  if (event.type === 'registration') {
    color = 1928018; // Forest green (#1D6B52)
    title = `🎓 New Student Registered: ${studentName}`;
  } else if (event.type === 'profile_update') {
    color = 8803853; // Amber (#86560D)
    title = `📝 Student Profile Updated: ${studentName}`;
  } else if (event.type === 'curriculum_completed') {
    color = 15844367; // Gold (#F1C40F)
    title = `🏆 100% Curriculum Completed by ${studentName}!`;
  } else if (event.type === 'quiz_verified' || event.type === 'task_completed') {
    color = 1928018; // Green
  }

  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  if (identity) {
    fields.push({
      name: 'Department',
      value: dept,
      inline: true,
    });
  }

  fields.push({
    name: 'Progress',
    value: `Quizzes: **${stats.verifiedQuizzesCount}/${stats.totalQuizzesCount}** • Challenges: **${stats.completedTasksCount}/${stats.totalTasksCount}** (${stats.curriculumPercentage}%)`,
    inline: true,
  });

  fields.push({
    name: 'Time (IST)',
    value: istTime,
    inline: true,
  });

  if (event.details) {
    fields.push({
      name: 'Details',
      value: event.details,
      inline: false,
    });
  }

  return {
    username: 'IIIT Trichy Devs Bot',
    avatar_url: 'https://avatars.githubusercontent.com/u/353610431?v=4',
    embeds: [
      {
        title,
        description: event.description,
        color,
        author: githubUser
          ? {
              name: `${studentName} (@${githubUser})`,
              url: `https://github.com/${githubUser}`,
              icon_url: `https://github.com/${githubUser}.png`,
            }
          : {
              name: studentName,
            },
        fields,
        footer: {
          text: 'IIIT Trichy Devs • Learn GitHub v2.0 Platform',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

function flushBufferedEvents(): void {
  if (bufferTimeout) {
    clearTimeout(bufferTimeout);
    bufferTimeout = null;
  }

  if (eventBuffer.length === 0) return;

  const currentBatch = [...eventBuffer];
  eventBuffer = [];

  // Group events by identity (usually single active tab, but ensures clean organization)
  const lastItem = currentBatch[currentBatch.length - 1];
  const identity = lastItem.identity;
  const stats = lastItem.stats;
  const githubUser = identity?.githubUsername ? identity.githubUsername.replace(/^@/, '') : null;
  const studentName = identity?.name || 'Anonymous Student';
  const dept = formatDepartment(identity?.department);

  const timelineBullets = currentBatch.map((item) => {
    const timeStr = new Date(item.event.timestamp).toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    return `• \`[${timeStr}]\` ${item.event.description}${item.event.details ? ` (${item.event.details})` : ''}`;
  });

  // Keep within Discord embed description limit (4096 chars)
  const descriptionText =
    timelineBullets.length === 1
      ? timelineBullets[0]
      : `**Activity Timeline (${timelineBullets.length} actions in 10s window):**\n${timelineBullets.slice(0, 15).join('\n')}${timelineBullets.length > 15 ? `\n...and ${timelineBullets.length - 15} more actions` : ''}`;

  const payload = {
    username: 'IIIT Trichy Devs Bot',
    avatar_url: 'https://avatars.githubusercontent.com/u/353610431?v=4',
    embeds: [
      {
        title: `⚡ Student Activity: ${studentName}`,
        description: descriptionText,
        color: 2845872, // Blue
        author: githubUser
          ? {
              name: `${studentName} (@${githubUser})`,
              url: `https://github.com/${githubUser}`,
              icon_url: `https://github.com/${githubUser}.png`,
            }
          : {
              name: studentName,
            },
        fields: [
          {
            name: 'Department',
            value: dept,
            inline: true,
          },
          {
            name: 'Progress',
            value: `Quizzes: **${stats.verifiedQuizzesCount}/${stats.totalQuizzesCount}** • Challenges: **${stats.completedTasksCount}/${stats.totalTasksCount}** (${stats.curriculumPercentage}%)`,
            inline: true,
          },
          {
            name: 'Time (IST)',
            value: getFormattedIST(),
            inline: true,
          },
        ],
        footer: {
          text: 'IIIT Trichy Devs • Activity Buffer (10s)',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  postToEndpoint(payload);
}

// Window unload handler to flush any remaining events
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && eventBuffer.length > 0) {
      flushBufferedEvents();
    }
  });

  window.addEventListener('beforeunload', () => {
    if (eventBuffer.length > 0) {
      flushBufferedEvents();
    }
  });
}

export const telemetry = {
  // Immediate dispatch for high-priority milestones (Registration, Profile Update, 100% Completion)
  sendImmediate(
    identity: StudentIdentity,
    event: TelemetryEvent,
    stats: ProgressStats
  ): void {
    // Flush any pending events first so sequence remains chronologically clear
    flushBufferedEvents();

    const payload = buildDiscordPayload(identity, event, stats);
    postToEndpoint(payload);
  },

  // Buffered dispatch for rapid actions (Navigation, Quizzes, Challenges, Phase Switches)
  sendBuffered(
    identity: StudentIdentity | null,
    event: TelemetryEvent,
    stats: ProgressStats
  ): void {
    eventBuffer.push({ identity, event, stats });

    if (!bufferTimeout) {
      bufferTimeout = setTimeout(() => {
        flushBufferedEvents();
      }, 10000); // 10-second window as requested
    }
  },
};
