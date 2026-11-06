export type MemberRole =
  | 'Project Lead / UI Design'
  | 'Development / Technical'
  | 'Research / Documentation'
  | 'Design / Presentation';

export type PresenceStatus = 'online' | 'working' | 'idle' | 'offline';

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  avatarUrl: string;
  avatarColor: string;
  initials: string;
  status: PresenceStatus;
  currentActivity?: string;
  assignedTasksCount?: number;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedMemberId: string;
  deadline: string;
  status: TaskStatus;
  priority: TaskPriority;
  milestoneId: string;
  tags?: string[];
  xpReward?: number;
}

export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed';

export interface Milestone {
  id: string;
  order: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate: string;
  deliverablesSummary: string;
  unlockedArea?: string;
}

export type ArtifactType = 'document' | 'reference' | 'wireframe' | 'prototype' | 'presentation' | 'code';

export interface Artifact {
  id: string;
  title: string;
  description: string;
  type: ArtifactType;
  associatedMilestoneId?: string;
  associatedTaskId?: string;
  createdByMemberId: string;
  lastUpdated: string;
  url?: string;
  fileSize?: string;
  thumbnailPlaceholder?: string;
}

export type ActivityType = 'task_completed' | 'milestone_unlocked' | 'artifact_created' | 'member_active';

export interface Activity {
  id: string;
  type: ActivityType;
  actorId: string;
  timestamp: string;
  description: string;
  targetId?: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  overallProgress: number;
  semester: string;
  teamMembers: Member[];
  milestones: Milestone[];
  tasks: Task[];
  artifacts: Artifact[];
  activities: Activity[];
}
