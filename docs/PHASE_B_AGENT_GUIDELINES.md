# Phase B — Parallel Agent Guidelines

**Project:** Project Aurora (STACK 2026)  
**Scope:** Implement Prototypes C, D, and E on the existing foundation.  
**Authority:** Follow `PROJECT.md`. Do not invent features outside that specification.

This document is the shared implementation contract for Agents C, D, E, the Main (coordinator) agent, and the QA agent.

---

## 0. Antislop (required during implementation)

User mode: **DURING (Mode 1)**. Antislop is not a post-hoc polish pass.

Agents C, D, and E must apply antislop **while building**, not after the UI is finished:

| Concern | Skill |
|---|---|
| Core filter (always) | `antislop` |
| Visual / layout / motion | `antislop-ui` |
| Contrast, focus, keyboard, states | `antislop-human` |
| Comments | `antislop-code` |

Rules that matter for this project:

- Distinct visual identity per prototype — not three reskins of the same dashboard.
- Prefer clear hierarchy and real interaction over decorative chrome, badge clusters, and generic AI UI patterns.
- No decorative or obvious comments; keep comments only when they record a non-obvious constraint.
- Shared shell chrome (`PrototypeSwitcher`, landing page) stays coherent; prototype interiors may diverge.
- Accessibility basics: focusable controls, Escape closes overlays, meaningful labels on icon-only buttons.

If a shared component needs an accessibility or API fix, request it through the Main agent — do not silently fork the component.

---

## 1. Exclusive directory ownership

| Agent | Role | Exclusive write path | Route |
|---|---|---|---|
| **Agent C** | Prototype C — Questboard | `src/prototypes/questboard/` | `/prototype/c` |
| **Agent D** | Prototype D — Hybrid Studio | `src/prototypes/hybrid-studio/` | `/prototype/d` |
| **Agent E** | Prototype E — Project World | `src/prototypes/project-world/` | `/prototype/e` |
| **Main** | Shared architecture & integration | `src/shared/`, `src/pages/`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, configs, `docs/` | — |
| **QA** | Review only unless assigned a fix | Read-only by default | — |

### Ownership rules

- An agent may create any files **inside** its exclusive directory (components, scenes, styles, local helpers).
- An agent must **not** modify another prototype agent’s files.
- An agent must **not** redefine shared types, duplicate mock data, or change global routing/styling without Main coordination.
- Entry export for each prototype remains the page component already wired in `src/App.tsx` (`PrototypeCPage`, `PrototypeDPage`, `PrototypeEPage`). Keep those exports stable or update `App.tsx` only via Main.

---

## 2. Existing shared components (reuse first)

Located under `src/shared/components/` and re-exported from `src/shared/components/index.ts`:

| Component | Purpose |
|---|---|
| `Avatar` | Member avatar / initials |
| `MemberList` | Team roster |
| `TaskCard` | Task / quest card with status updates |
| `MilestoneCard` | Milestone card with status toggle |
| `ProgressIndicator` | Overall progress bar |
| `ArtifactCard` | Artifact summary |
| `Modal` | Centered dialog (Escape + backdrop) |
| `Drawer` | Side/bottom panel overlay |
| `PrototypeSwitcher` | Persistent C/D/E/selector nav (owned by Main) |

### Listed in PROJECT.md but not yet in shared

`MemberProfile`, `QuestCard`, `ArtifactPreview`, `ProjectOverview`, `ActivityFeed`, `Tooltip`, `ToastNotification`

- Prefer composing existing components.
- Prototype-local variants may live inside the agent’s directory.
- New **shared** components require Main agent approval and land in `src/shared/components/`.

---

## 3. Shared types and data structures

Source of truth: `src/shared/types/index.ts`

| Type | Notes |
|---|---|
| `Project` | Root model: members, milestones, tasks, artifacts, activities, progress |
| `Member` | Role, avatar fields, `PresenceStatus` |
| `Task` | Status, priority, assignee, milestone link, optional XP |
| `Milestone` | Ordered stages, status, unlock area hints |
| `Artifact` | Typed deliverables / references |
| `Activity` | Feed events |

Supporting unions: `MemberRole`, `PresenceStatus`, `TaskStatus`, `TaskPriority`, `MilestoneStatus`, `ArtifactType`, `ActivityType`.

**Do not redefine these interfaces in prototype folders.** Import from `../../shared/types` (or the package-relative path you already use). Prototype-only view models are allowed if they compose shared types and stay private to the agent directory.

---

## 4. Accessing Project Aurora mock data

| Asset | Path |
|---|---|
| Seed data | `src/shared/data/mockData.ts` (`initialProjectData`, `mockMembers`, …) |
| Runtime state | `src/shared/store/useProjectStore.ts` (Zustand + `localStorage` key `project_aurora_state_v1`) |

### How to read / mutate

```ts
import { useProjectStore } from '../../shared/store/useProjectStore';

const { project, updateTaskStatus, assignTask, updateMilestoneStatus, selectTask /* … */ } =
  useProjectStore();
```

- Always bind UI to the store so C, D, and E stay consistent during demos.
- Persist via the store’s existing `saveProject` path — do not invent a second storage key or a second mock dataset.
- `resetToDefault` on the selector page restores seed data; do not break that contract.

---

## 5. Routing integration

Routes are already registered in `src/App.tsx`:

| Path | Component |
|---|---|
| `/` | `PrototypeSelectorPage` |
| `/prototype/c` | `PrototypeCPage` from `src/prototypes/questboard` |
| `/prototype/d` | `PrototypeDPage` from `src/prototypes/hybrid-studio` |
| `/prototype/e` | `PrototypeEPage` from `src/prototypes/project-world` |

Requirements:

- Keep SPA navigation (React Router) — no full reloads between prototypes.
- `PrototypeSwitcher` remains visible; do not hide or replace global nav without Main approval.
- Nested routes under a prototype path are allowed **inside** that prototype’s folder if exported cleanly; coordinate with Main before changing `App.tsx`.

---

## 6. Styling and design tokens

- Global tooling: Tailwind CSS 3 (`tailwind.config.js`, `src/index.css`).
- Shared palette tokens under `theme.extend.colors.aurora` (`bg`, `card`, `border`, `accent`, `emerald`, `amber`, `rose`, `purple`, `text`, `muted`).
- Shell background defaults to aurora dark (`#0B0F19`).

Conventions:

- Use Tailwind utility classes; avoid new CSS frameworks.
- Prototype-specific styles stay in the agent directory (co-located CSS modules or Tailwind-only is fine).
- Do not rewrite `src/index.css`, `tailwind.config.js`, or global App chrome without Main.
- Each prototype must read as a **distinct** design (Questboard ≠ Hybrid Studio ≠ Project World). Shared tokens are a base, not a mandate to look identical.
- Prefer Framer Motion for React UI motion; Phaser handles D/E scene motion. Avoid stacking both on the same element without reason.

### Phaser (D and E)

- Dependency: `phaser` (installed). Helper: `src/shared/phaser/phaserHelper.ts` (`defaultPhaserConfig`).
- Mount Phaser inside the prototype directory. Destroy game instances on unmount.
- Prefer extending the shared helper over copying config. Shared Phaser React wrappers belong under `src/shared/phaser/` via Main if more than one prototype needs them.

---

## 7. Avoiding conflicting modifications

Hard constraints:

1. **No redefining shared types.**
2. **No modifying shared routing or global styling** (`App.tsx`, `main.tsx`, `index.css`, `tailwind.config.js`, `PrototypeSwitcher`, selector page) without Main.
3. **No `package.json` / lockfile changes** without Main coordination and a concrete requirement.
4. **No duplicate mock data** — one seed, one store.
5. **No edits to another agent’s prototype directory.**
6. **Shared changes go through Main** (types, store actions, shared components, routing, deps).
7. **Distinct visual identity** per prototype; follow `PROJECT.md` acceptance criteria.
8. **Do not invent features** outside `PROJECT.md` (no auth, backend, Socket.IO, Supabase, AI, real file export, etc.).

Suggested merge hygiene:

- Prefer additive files inside the owned directory.
- Keep the public page export name stable.
- Document any Main-needed shared API in the completion report instead of drive-by edits.

---

## 8. Required testing and completion reports

Before marking a prototype ready for integration, the owning agent must:

1. Run `npm run build` successfully from repo root.
2. Smoke-check its route in `npm run dev` (`/prototype/c`, `/prototype/d`, or `/prototype/e`).
3. Verify shared store mutations (task status, milestone status, and/or assign) persist across a refresh via `localStorage`.
4. Confirm no dead controls without an explicit disabled/empty explanation (per acceptance criteria).
5. For D: avatar movement (WASD/arrows) and workstation open → panel; for E: navigable/clickable areas with progression feedback; for C: interactive quests and milestone progression.
6. Apply antislop **during** implementation (Section 0) — note what was checked in the report.

### Completion report template

```md
## Prototype [C|D|E] completion

- Route verified:
- Build: pass / fail
- Store interactions tested:
- Persistence verified:
- Distinct identity notes (palette / layout / motion):
- Antislop applied during build (skills used):
- Shared changes requested from Main (if any):
- Known gaps vs PROJECT.md:
- Files touched (paths only under ownership dir unless Main-approved):
```

QA reviews against `PROJECT.md` §11 acceptance criteria and this contract. QA does not redesign prototypes unless assigned a specific fix.

---

## Quick reference — imports

```ts
import type { Project, Task, Milestone, Member, Artifact } from '../../shared/types';
import { useProjectStore } from '../../shared/store/useProjectStore';
import {
  Avatar, MemberList, TaskCard, MilestoneCard,
  ProgressIndicator, ArtifactCard, Modal, Drawer
} from '../../shared/components';
import { defaultPhaserConfig } from '../../shared/phaser/phaserHelper';
```

---

## Out of scope for Phase B agents

- Recreating the Vite app or reinstalling the stack.
- Changing `PROJECT.md`.
- Implementing another agent’s prototype.
- Adding dependencies without Main + concrete need.
- Backend, auth, realtime multiplayer, AI, or production storage.
