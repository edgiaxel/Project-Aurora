import { create } from 'zustand';
import type { Project, Task, Milestone, TaskStatus, MilestoneStatus } from '../types';
import { initialProjectData } from '../data/mockData';

const STORAGE_KEY = 'project_aurora_state_v1';

interface ProjectState {
  project: Project;
  activePrototype: 'selector' | 'c' | 'd' | 'e';
  selectedMemberId: string | null;
  selectedTaskId: string | null;
  selectedArtifactId: string | null;
  activePanel: string | null;

  // Actions
  setActivePrototype: (proto: 'selector' | 'c' | 'd' | 'e') => void;
  selectMember: (id: string | null) => void;
  selectTask: (id: string | null) => void;
  selectArtifact: (id: string | null) => void;
  setActivePanel: (panel: string | null) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  assignTask: (taskId: string, memberId: string) => void;
  updateMilestoneStatus: (milestoneId: string, status: MilestoneStatus) => void;
  resetToDefault: () => void;
}

const loadPersistedProject = (): Project => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Project;
    }
  } catch (err) {
    console.warn('Failed to parse localStorage project data, falling back to initial data.', err);
  }
  return initialProjectData;
};

const saveProject = (project: Project) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  } catch (err) {
    console.warn('Failed to save project data to localStorage', err);
  }
};

const calculateProgress = (tasks: Task[], milestones: Milestone[]): number => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const taskWeight = (completedTasks / tasks.length) * 60;
  const milestoneWeight = (completedMilestones / milestones.length) * 40;
  return Math.round(taskWeight + milestoneWeight);
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: loadPersistedProject(),
  activePrototype: 'selector',
  selectedMemberId: null,
  selectedTaskId: null,
  selectedArtifactId: null,
  activePanel: null,

  setActivePrototype: (proto) => set({ activePrototype: proto }),
  selectMember: (id) => set({ selectedMemberId: id }),
  selectTask: (id) => set({ selectedTaskId: id }),
  selectArtifact: (id) => set({ selectedArtifactId: id }),
  setActivePanel: (panel) => set({ activePanel: panel }),

  updateTaskStatus: (taskId, status) => {
    const { project } = get();
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    const updatedProgress = calculateProgress(updatedTasks, project.milestones);
    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      overallProgress: updatedProgress,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'task_completed' as const,
          actorId: 'member-1',
          timestamp: 'Just now',
          description: `updated task status to ${status.replace('_', ' ')}`,
          targetId: taskId
        },
        ...project.activities
      ]
    };

    saveProject(updatedProject);
    set({ project: updatedProject });
  },

  assignTask: (taskId, memberId) => {
    const { project } = get();
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, assignedMemberId: memberId } : task
    );
    const updatedProject = {
      ...project,
      tasks: updatedTasks
    };
    saveProject(updatedProject);
    set({ project: updatedProject });
  },

  updateMilestoneStatus: (milestoneId, status) => {
    const { project } = get();
    const updatedMilestones = project.milestones.map(ms =>
      ms.id === milestoneId ? { ...ms, status } : ms
    );
    const updatedProgress = calculateProgress(project.tasks, updatedMilestones);
    const updatedProject = {
      ...project,
      milestones: updatedMilestones,
      overallProgress: updatedProgress,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'milestone_unlocked' as const,
          actorId: 'member-1',
          timestamp: 'Just now',
          description: `updated milestone status to ${status.replace('_', ' ')}`,
          targetId: milestoneId
        },
        ...project.activities
      ]
    };

    saveProject(updatedProject);
    set({ project: updatedProject });
  },

  resetToDefault: () => {
    saveProject(initialProjectData);
    set({
      project: initialProjectData,
      selectedMemberId: null,
      selectedTaskId: null,
      selectedArtifactId: null,
      activePanel: null
    });
  }
}));
