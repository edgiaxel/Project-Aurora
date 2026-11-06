1. The three prototypes we're building
Prototype	Core experience	What we want to evaluate
C — Questboard	Game-inspired project dashboard	Is gamification enough without a virtual world?
D — Hybrid Studio	2D interactive studio + productivity UI	Does navigating a shared workspace feel engaging and useful?
E — Project World	Project represented as an explorable map	Does spatially representing project progression create a compelling experience?

All three should support the same demo scenario:

"A university team of four is building a project for a semester-long assignment."

The shared scenario should include:
- Project overview and description.
- Four team members with avatars.
- Project milestones.
- Tasks and assignments.
- Research materials and reference links.
- A few deliverables.
- Progress states.
- A final presentation or showcase.
This ensures your group evaluates the experience, not differences in mock data.
2. Recommended technical stack
Yuuko: We should avoid overengineering the infrastructure. This is a frontend prototype, not the final production architecture.
Technology	Purpose
React	UI and component system
Vite	Development server and build
TypeScript	Type safety
Tailwind CSS	Styling
Phaser 3	2D game environment for D and E
React Router	Navigation between prototypes
Zustand	Shared application state
Lucide React	Icons
Framer Motion	UI transitions and animations
localStorage	Persist demo progress
Mock data / JSON	Projects, members, quests, tasks, artifacts

Yuusei: Socket.IO is deliberately excluded for now. Real-time multiplayer is an important feature, but it's not necessary to compare the three visual concepts tomorrow. We'll simulate teammates and presence using mock data.

Yuumi: Also, no Supabase, authentication, backend, AI, or file storage yet. Those add complexity without helping us answer the current design question.
3. Application architecture
The three prototypes should live inside one application.

React Application
│
├── Shared Components
│   ├── Avatar
│   ├── Team Members
│   ├── Task Card
│   ├── Milestone Card
│   ├── Progress Indicator
│   ├── Project Artifact
│   └── Modal / Drawer
│
├── Prototype C: Questboard
│   ├── Game Dashboard
│   ├── Mission Map
│   ├── Quest List
│   └── Project Overview
│
├── Prototype D: Hybrid Studio
│   ├── Phaser Scene
│   ├── Interactive Workstations
│   ├── Studio HUD
│   └── Productivity Panels
│
└── Prototype E: Project World
    ├── Phaser Scene
    ├── Interactive Project Areas
    ├── Progress Map
    └── Artifact Interaction



The landing page should let the user switch between C, D, and E without restarting the application.

Each prototype gets its own route:
- /prototype/c — Questboard
- /prototype/d — Hybrid Studio
- /prototype/e — Project World
A persistent navigation menu lets the user switch between designs.

# STACK 2026 — Interactive Project Studio
## Multi-Design Prototype Specification

**Project status:** Interactive frontend prototype  
**Purpose:** Compare three alternative UI/UX concepts for a game-inspired university project collaboration platform.  
**Development environment:** Antigravity IDE  
**Primary coding agent:** Greg  
**Stack:** React + Vite + TypeScript + Tailwind CSS + Phaser 3

---

## 1. Project Objective

Build one web application containing three independently navigable design prototypes for an interactive academic project workspace.

The prototypes are:

- **C — Questboard:** Game-inspired productivity dashboard.
- **D — Hybrid Studio:** Navigable 2D virtual studio with integrated productivity panels.
- **E — Project World:** Interactive map representing the structure and progression of a project.

All prototypes must use the same underlying mock project, members, tasks, milestones, and artifacts to enable meaningful comparison.

This is a design-validation prototype. It is NOT a production application.

## 2. Scope and Constraints

### In scope
- Functional navigation.
- Interactive UI elements.
- Mock project data.
- Task and milestone interactions.
- Workstation and project-area interactions.
- Modal, drawer, and panel interactions.
- Simulated activity and teammate presence.
- Local persistence of prototype changes.
- Three distinct visual and interaction approaches.

### Out of scope
- Authentication.
- Backend development.
- Real-time multiplayer synchronization.
- AI integration.
- External API integrations.
- Production file storage.
- Full document editing.
- Actual PowerPoint, PDF, DOCX, or XLSX export.
- Complex game mechanics.
- Payment or subscription systems.

## 3. Shared Demo Scenario

Project name: **Project Aurora**

Description: A four-member university team developing a semester-long digital product for an academic assignment.

### Team members

| Name | Role | Avatar |
|---|---|---|
| Axel | Project Lead / UI Design | Custom avatar |
| Jonathan | Development / Technical | Custom avatar |
| Husnaen | Research / Documentation | Custom avatar |
| Deffa | Design / Presentation | Custom avatar |

### Project milestones

1. Project Planning — Completed
2. Research and Requirements — Completed
3. Design and Prototyping — In Progress
4. Implementation — In Progress
5. Testing and Evaluation — Not Started
6. Final Presentation — Not Started

### Example tasks

- Research competing applications
- Define project requirements
- Create UI wireframes
- Develop prototype
- Write project documentation
- Prepare final presentation

Tasks should include:
- Title
- Description
- Assigned member
- Deadline
- Status
- Priority

### Example artifacts
- Research document
- Reference website
- UI wireframe
- Prototype preview
- Presentation slides
- Project requirements

All information should be stored in centralized mock data.

## 4. Prototype C — Questboard

### Concept
A conventional productivity dashboard redesigned using game-inspired visual language.

### Main interface
- Sidebar navigation.
- Project overview.
- Mission/objective map.
- Quest/task cards.
- Team members.
- Milestone progress.
- Recent activity.
- Project rewards or visual progression.

### Interactions
- Click a quest to open its details.
- Assign a quest to a team member.
- Change quest status.
- View milestone progress.
- Navigate between project sections.
- Open project artifacts.
- Complete a milestone and trigger a visual progression animation.
- View team member profiles.

### Design objective
Evaluate whether game-inspired visual progression and interaction make project management more engaging without requiring a virtual environment.

### Important
Do not make this look like a generic SaaS dashboard with a few game icons added.

## 5. Prototype D — Hybrid Studio

### Concept
A 2D navigable virtual studio combined with conventional productivity UI.

### Main interface
- Phaser-based 2D environment.
- Top-level project HUD.
- Team member avatars.
- Interactive workstations.
- Project progress display.
- Productivity panels.

### Studio areas
- Research Station
- Brainstorming Board
- Design Workshop
- Development Desk
- Meeting Area
- Presentation Corner

### Interactions
- Move the player's avatar using WASD or arrow keys.
- Click interactive workstations to open their associated UI panels.
- Click project objects to inspect artifacts.
- Show teammate avatars in the environment.
- Display simulated online/working/idle presence.
- Open task, member, and artifact panels.
- Return to the studio after closing a panel.
- Trigger visual feedback when project milestones are completed.

### UI behavior
Productivity panels should open as overlays, drawers, or floating windows above the Phaser environment.

The virtual environment should remain visible behind panels when appropriate.

### Design objective
Evaluate whether a navigable virtual studio can make project collaboration feel more engaging while retaining practical productivity functionality.

## 6. Prototype E — Project World

### Concept
A navigable interactive map where the project itself is represented as an explorable environment.

### Main interface
- Phaser-based interactive map.
- Distinct areas representing project stages.
- Project progress visualization.
- Interactive artifacts.
- Navigation between connected areas.
- Team member avatars or presence indicators.

### Project areas
- Research Forest
- Knowledge Bridge
- Design Workshop
- Development Zone
- Integration Hub
- Final Showcase

### Interactions
- Click or navigate to a project area.
- Open the corresponding workspace.
- View associated tasks and artifacts.
- Display completed and incomplete stages.
- Show connections between project stages.
- Trigger environmental changes when milestones are completed.
- Open the final showcase.

### Design objective
Evaluate whether representing a project's structure spatially provides a more intuitive and engaging overview of the project lifecycle than a conventional dashboard.

## 7. Shared UI Components

Create reusable components where appropriate.

- Avatar
- MemberProfile
- MemberList
- TaskCard
- QuestCard
- MilestoneCard
- ProgressIndicator
- ArtifactCard
- ArtifactPreview
- ProjectOverview
- ActivityFeed
- Modal
- Drawer
- Tooltip
- ToastNotification
- PrototypeSwitcher

Components may be styled differently within each prototype, but should reuse the same underlying data structures.

## 8. Shared State and Data

Use Zustand or React Context for shared state.

Suggested state:
- Current prototype.
- Current project.
- Selected member.
- Task status.
- Milestone status.
- Selected artifact.
- Open panel or modal.
- Project progress.

Store prototype changes in localStorage so changes persist during demonstrations.

Do not implement a backend.

## 9. Navigation

Create a landing page that presents the three prototypes as alternative design concepts.

Each prototype must have:
- A dedicated route.
- A visible way to return to the prototype selector.
- A consistent project identity.
- Access to shared mock data.

The application must work without page reloads when switching prototypes.

## 10. Design Quality

The application must be:
- Responsive.
- Visually polished.
- Consistent in typography and spacing.
- Interactive rather than static.
- Suitable for demonstration to teammates and judges.

Use coherent color palettes and distinct design identities for the three prototypes.

Avoid excessive animations, unnecessary decoration, and clutter.

## 11. Acceptance Criteria

The prototype is considered complete when:

1. All three prototypes are accessible from the landing page.
2. Each prototype has a clearly distinct visual design.
3. The shared project data is consistent across all three.
4. Users can navigate the interface and interact with its core features.
5. Tasks and milestones can be modified during the demo.
6. The Hybrid Studio has functional avatar movement and interactive workstations.
7. The Project World has interactive areas and visible progression.
8. The Questboard has interactive objectives and progression.
9. Changes persist through localStorage.
10. No backend or external service is required to run the prototype.
11. The application starts reliably using the documented development command.
12. No prototype contains dead buttons or nonfunctional interactions without a clear visual explanation.

## 12. Development Strategy

Implement the project in stages:

1. Initialize the application and shared design system.
2. Implement shared mock data and reusable components.
3. Implement Questboard.
4. Implement the Phaser foundation.
5. Implement Hybrid Studio.
6. Implement Project World.
7. Integrate prototype navigation.
8. Test all interactions and persistence.
9. Refine visual consistency and presentation quality.

Do not attempt to implement all three prototypes simultaneously without first establishing the shared foundation.

The final result should be a single runnable application with three alternative experiences ready for comparative demonstration.

5. Multi-agent workflow in Antigravity
Yuuko: Now, the multi-agent approach. Don't have four agents independently inventing the architecture. That's how you get three different component libraries, conflicting dependencies, and a merge disaster.

I recommend one architect, one shared foundation, three design specialists, one integration reviewer.
Agent roles
Agent	Responsibility	Files
Agent 1 — Architect	Initialize project, define architecture, shared types, routing, mock data	src/shared/, src/app/, configuration
Agent 2 — Questboard Designer	Build Prototype C	src/prototypes/questboard/
Agent 3 — Hybrid Studio Designer	Build Prototype D and Phaser studio	src/prototypes/hybrid-studio/
Agent 4 — Project World Designer	Build Prototype E and Phaser map	src/prototypes/project-world/
Agent 5 — QA / Integrator	Review functionality, visual consistency, interactions, and integration	Reviews all branches; fixes only approved conflicts

If Greg's multi-agent workflow has a coordinator, the coordinator should be Agent 1, not another independent coding agent.
Git workflow
Yes, use Git. Even for a temporary prototype.

You don't have to push to GitHub. Local Git is sufficient.

# Initialize project
git init

# Initial foundation
git add .
git commit -m "chore: initialize prototype foundation"

# Create prototype branches
git branch prototype/questboard
git branch prototype/hybrid-studio
git branch prototype/project-world



Each design agent works on its own branch.

When ready, merge them into a common integration branch:

git checkout -b integration/prototypes

git merge prototype/questboard
git merge prototype/hybrid-studio
git merge prototype/project-world
