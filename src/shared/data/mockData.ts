import type { Project, Member, Milestone, Task, Artifact, Activity } from '../types';

export const mockMembers: Member[] = [
  {
    id: 'member-1',
    name: 'Axel',
    role: 'Project Lead / UI Design',
    avatarUrl: '',
    avatarColor: '#38BDF8',
    initials: 'AX',
    status: 'working',
    currentActivity: 'Polishing UI component architecture'
  },
  {
    id: 'member-2',
    name: 'Jonathan',
    role: 'Development / Technical',
    avatarUrl: '',
    avatarColor: '#10B981',
    initials: 'JN',
    status: 'working',
    currentActivity: 'Integrating Phaser game scenes'
  },
  {
    id: 'member-3',
    name: 'Husnaen',
    role: 'Research / Documentation',
    avatarUrl: '',
    avatarColor: '#F59E0B',
    initials: 'HN',
    status: 'online',
    currentActivity: 'Writing academic synthesis report'
  },
  {
    id: 'member-4',
    name: 'Deffa',
    role: 'Design / Presentation',
    avatarUrl: '',
    avatarColor: '#8B5CF6',
    initials: 'DF',
    status: 'idle',
    currentActivity: 'Preparing evaluation slide deck'
  }
];

export const mockMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    order: 1,
    title: 'Project Planning',
    description: 'Establish scope, role distribution, and project repository.',
    status: 'completed',
    dueDate: '2026-09-15',
    deliverablesSummary: 'Scope document, risk analysis, project charter',
    unlockedArea: 'Research Forest'
  },
  {
    id: 'milestone-2',
    order: 2,
    title: 'Research and Requirements',
    description: 'Literature review, competitor benchmarking, and user persona definition.',
    status: 'completed',
    dueDate: '2026-10-01',
    deliverablesSummary: 'Competitor matrix, requirements specification',
    unlockedArea: 'Knowledge Bridge'
  },
  {
    id: 'milestone-3',
    order: 3,
    title: 'Design and Prototyping',
    description: 'Interactive wireframes, high-fidelity mockups, design system.',
    status: 'in_progress',
    dueDate: '2026-10-22',
    deliverablesSummary: 'Figma prototypes, UI kit, style guide',
    unlockedArea: 'Design Workshop'
  },
  {
    id: 'milestone-4',
    order: 4,
    title: 'Implementation',
    description: 'Frontend client implementation and interactive mechanics.',
    status: 'in_progress',
    dueDate: '2026-11-12',
    deliverablesSummary: 'Runnable React prototypes, Phaser integration',
    unlockedArea: 'Development Zone'
  },
  {
    id: 'milestone-5',
    order: 5,
    title: 'Testing and Evaluation',
    description: 'Comparative usability evaluation with student cohorts.',
    status: 'not_started',
    dueDate: '2026-11-26',
    deliverablesSummary: 'Usability metric logs, user feedback report',
    unlockedArea: 'Integration Hub'
  },
  {
    id: 'milestone-6',
    order: 6,
    title: 'Final Presentation',
    description: 'Academic showcase, demo reel, and final grading defense.',
    status: 'not_started',
    dueDate: '2026-12-10',
    deliverablesSummary: 'Slide deck, live demonstration, project report',
    unlockedArea: 'Final Showcase'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Research competing applications',
    description: 'Review Miro, Notion, Habitica, and Gather.town for gamified collaboration patterns.',
    assignedMemberId: 'member-3',
    deadline: '2026-09-25',
    status: 'completed',
    priority: 'high',
    milestoneId: 'milestone-2',
    tags: ['Research', 'Benchmarking'],
    xpReward: 120
  },
  {
    id: 'task-2',
    title: 'Define project requirements',
    description: 'Synthesize academic needs into functional and non-functional requirements.',
    assignedMemberId: 'member-3',
    deadline: '2026-09-28',
    status: 'completed',
    priority: 'urgent',
    milestoneId: 'milestone-2',
    tags: ['Requirements', 'Spec'],
    xpReward: 150
  },
  {
    id: 'task-3',
    title: 'Create UI wireframes',
    description: 'Draft layout concepts for dashboard, workstation studio, and world map views.',
    assignedMemberId: 'member-1',
    deadline: '2026-10-15',
    status: 'completed',
    priority: 'high',
    milestoneId: 'milestone-3',
    tags: ['Design', 'Wireframe'],
    xpReward: 200
  },
  {
    id: 'task-4',
    title: 'Develop prototype C (Questboard)',
    description: 'Build game-inspired dashboard with quest progression and milestone tracks.',
    assignedMemberId: 'member-1',
    deadline: '2026-11-08',
    status: 'in_progress',
    priority: 'high',
    milestoneId: 'milestone-4',
    tags: ['Frontend', 'Prototype C'],
    xpReward: 250
  },
  {
    id: 'task-5',
    title: 'Develop prototype D (Hybrid Studio)',
    description: 'Build 2D navigable studio with interactive workstations and HUD overlays.',
    assignedMemberId: 'member-2',
    deadline: '2026-11-10',
    status: 'in_progress',
    priority: 'urgent',
    milestoneId: 'milestone-4',
    tags: ['Phaser', 'Prototype D'],
    xpReward: 300
  },
  {
    id: 'task-6',
    title: 'Develop prototype E (Project World)',
    description: 'Build explorable world map visualizing semester milestone areas and unlocks.',
    assignedMemberId: 'member-2',
    deadline: '2026-11-12',
    status: 'in_progress',
    priority: 'high',
    milestoneId: 'milestone-4',
    tags: ['Phaser', 'Prototype E'],
    xpReward: 300
  },
  {
    id: 'task-7',
    title: 'Write project documentation',
    description: 'Compile methodology, prototype comparisons, and testing protocol.',
    assignedMemberId: 'member-3',
    deadline: '2026-11-20',
    status: 'todo',
    priority: 'medium',
    milestoneId: 'milestone-5',
    tags: ['Documentation'],
    xpReward: 140
  },
  {
    id: 'task-8',
    title: 'Prepare final presentation',
    description: 'Create slide deck and recorded walkthrough demonstrating all three prototypes.',
    assignedMemberId: 'member-4',
    deadline: '2026-12-05',
    status: 'todo',
    priority: 'high',
    milestoneId: 'milestone-6',
    tags: ['Presentation', 'Showcase'],
    xpReward: 220
  }
];

export const mockArtifacts: Artifact[] = [
  {
    id: 'artifact-1',
    title: 'Research Document: Gamified Collaboration',
    description: 'Comparative analysis of game mechanics in academic project workflows.',
    type: 'document',
    associatedMilestoneId: 'milestone-2',
    associatedTaskId: 'task-1',
    createdByMemberId: 'member-3',
    lastUpdated: '2026-09-28',
    fileSize: '2.4 MB'
  },
  {
    id: 'artifact-2',
    title: 'Reference Matrix & Benchmark Index',
    description: 'Curated list of 15 relevant interaction patterns and academic benchmarks.',
    type: 'reference',
    associatedMilestoneId: 'milestone-2',
    associatedTaskId: 'task-1',
    createdByMemberId: 'member-3',
    lastUpdated: '2026-09-30',
    url: 'https://benchmark.project-aurora.internal'
  },
  {
    id: 'artifact-3',
    title: 'UI Wireframes & Component Specs',
    description: 'High-fidelity wireframe blueprints covering 3 prototype variations.',
    type: 'wireframe',
    associatedMilestoneId: 'milestone-3',
    associatedTaskId: 'task-3',
    createdByMemberId: 'member-1',
    lastUpdated: '2026-10-18',
    fileSize: '8.1 MB'
  },
  {
    id: 'artifact-4',
    title: 'Interactive Prototype Preview',
    description: 'Live build testing Phaser canvases and Zustand state sync.',
    type: 'prototype',
    associatedMilestoneId: 'milestone-4',
    associatedTaskId: 'task-4',
    createdByMemberId: 'member-2',
    lastUpdated: '2026-11-05',
    url: 'http://localhost:5173'
  },
  {
    id: 'artifact-5',
    title: 'Presentation Slides Draft',
    description: 'Story outline and visual slides for final semester defense.',
    type: 'presentation',
    associatedMilestoneId: 'milestone-6',
    associatedTaskId: 'task-8',
    createdByMemberId: 'member-4',
    lastUpdated: '2026-11-04',
    fileSize: '14.5 MB'
  },
  {
    id: 'artifact-6',
    title: 'Project Requirements Specification',
    description: 'Finalized academic criteria, grading rubrics, and deliverables schedule.',
    type: 'document',
    associatedMilestoneId: 'milestone-2',
    associatedTaskId: 'task-2',
    createdByMemberId: 'member-3',
    lastUpdated: '2026-10-02',
    fileSize: '1.2 MB'
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'task_completed',
    actorId: 'member-1',
    timestamp: '2 hours ago',
    description: 'completed task "Create UI wireframes"',
    targetId: 'task-3'
  },
  {
    id: 'act-2',
    type: 'milestone_unlocked',
    actorId: 'member-2',
    timestamp: '5 hours ago',
    description: 'advanced milestone "Implementation" to in progress',
    targetId: 'milestone-4'
  },
  {
    id: 'act-3',
    type: 'artifact_created',
    actorId: 'member-3',
    timestamp: '1 day ago',
    description: 'uploaded artifact "Research Document: Gamified Collaboration"',
    targetId: 'artifact-1'
  },
  {
    id: 'act-4',
    type: 'member_active',
    actorId: 'member-4',
    timestamp: '1 day ago',
    description: 'updated slide outline for final presentation',
    targetId: 'artifact-5'
  }
];

export const initialProjectData: Project = {
  id: 'project-aurora',
  name: 'Project Aurora',
  code: 'AUR-2026',
  description: 'A four-member university team developing a semester-long digital product for an academic assignment.',
  overallProgress: 58,
  semester: 'Fall Semester 2026',
  teamMembers: mockMembers,
  milestones: mockMilestones,
  tasks: mockTasks,
  artifacts: mockArtifacts,
  activities: mockActivities
};
