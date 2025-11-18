export type Role = 'product' | 'design' | 'engineering';
export type WorkflowType = 'traditional' | 'agentic';

export interface Step {
  id: string;
  role: Role;
  title: string;
  description: string;
  duration: number; // in seconds for simulation
  artifacts?: string[];
  details?: string;
}

export interface WorkflowData {
  traditional: Step[];
  agentic: Step[];
}

export const workflowScenario: WorkflowData = {
  traditional: [
    // Product Phase
    {
      id: 'trad-1',
      role: 'product',
      title: 'Initial Requirements Gathering',
      description: 'PM meets with stakeholders to understand auth needs',
      duration: 5,
      details: 'Series of meetings scheduled over 3 days. Notes scattered across email, Slack, and meeting recordings.',
    },
    {
      id: 'trad-2',
      role: 'product',
      title: 'Market Research',
      description: 'PM manually researches competitor auth solutions',
      duration: 4,
      details: 'Manually browse competitor sites, create comparison spreadsheet, read industry reports.',
    },
    {
      id: 'trad-3',
      role: 'product',
      title: 'Write PRD',
      description: 'PM writes detailed Product Requirements Document',
      duration: 6,
      artifacts: ['PRD: User Authentication System v1.0'],
      details: '15-page document with user stories, acceptance criteria, edge cases. Took 2 days to write.',
    },
    {
      id: 'trad-4',
      role: 'product',
      title: 'PRD Review & Revisions',
      description: 'Stakeholder feedback and document updates',
      duration: 3,
      artifacts: ['PRD: User Authentication System v1.3'],
      details: 'Three rounds of feedback. Document grows to 22 pages.',
    },
    // Design Phase
    {
      id: 'trad-5',
      role: 'design',
      title: 'PRD Handoff Meeting',
      description: 'Designer receives PRD and asks clarifying questions',
      duration: 2,
      details: '1-hour meeting. Designer realizes some edge cases weren\'t considered. Needs follow-up.',
    },
    {
      id: 'trad-6',
      role: 'design',
      title: 'Initial Sketches',
      description: 'Designer creates rough sketches of auth flows',
      duration: 4,
      details: 'Pen and paper, then digitized in Figma. Multiple iterations on flow logic.',
    },
    {
      id: 'trad-7',
      role: 'design',
      title: 'Low-Fidelity Wireframes',
      description: 'Convert sketches to clickable wireframes',
      duration: 5,
      artifacts: ['Wireframes: Login, Signup, Password Reset'],
      details: 'Basic layouts created. Shared with PM for feedback.',
    },
    {
      id: 'trad-8',
      role: 'design',
      title: 'High-Fidelity Mockups',
      description: 'Designer creates pixel-perfect designs',
      duration: 8,
      artifacts: ['High-Fidelity Mockups', 'Design System Updates'],
      details: 'Colors, typography, spacing. Multiple screens for different states. Design system extended with new components.',
    },
    {
      id: 'trad-9',
      role: 'design',
      title: 'Design Review',
      description: 'Stakeholder design review and iterations',
      duration: 4,
      artifacts: ['Final Mockups v2.1'],
      details: 'CEO wants different button colors. Two more iterations.',
    },
    // Engineering Phase
    {
      id: 'trad-10',
      role: 'engineering',
      title: 'Design Handoff',
      description: 'Engineer receives designs and reviews specs',
      duration: 2,
      details: 'Realizes some interactions weren\'t specified. Slack thread with designer.',
    },
    {
      id: 'trad-11',
      role: 'engineering',
      title: 'Technical Planning',
      description: 'Architect database schema and API endpoints',
      duration: 5,
      details: 'Choose auth library, plan database migrations, design API.',
    },
    {
      id: 'trad-12',
      role: 'engineering',
      title: 'Backend Implementation',
      description: 'Build authentication API and database',
      duration: 10,
      artifacts: ['Auth API Endpoints', 'User Schema'],
      details: 'JWT tokens, password hashing, session management, email verification.',
    },
    {
      id: 'trad-13',
      role: 'engineering',
      title: 'Frontend Implementation',
      description: 'Build UI components and forms',
      duration: 8,
      artifacts: ['Login Component', 'Signup Flow', 'Password Reset'],
      details: 'React components, form validation, error handling, loading states.',
    },
    {
      id: 'trad-14',
      role: 'engineering',
      title: 'Write Tests',
      description: 'Create unit and integration tests',
      duration: 6,
      details: 'Unit tests for utils, integration tests for API, e2e tests for critical flows.',
    },
    {
      id: 'trad-15',
      role: 'engineering',
      title: 'Code Review',
      description: 'PR review and addressing feedback',
      duration: 3,
      details: 'Two rounds of review. Nitpicks about variable names. One architectural concern.',
    },
    {
      id: 'trad-16',
      role: 'engineering',
      title: 'QA & Bug Fixes',
      description: 'QA testing reveals edge cases',
      duration: 5,
      artifacts: ['Bug Fixes', 'Updated Tests'],
      details: '8 bugs found. Password reset email broken in production mode. Fixed.',
    },
    {
      id: 'trad-17',
      role: 'engineering',
      title: 'Deployment',
      description: 'Deploy to production',
      duration: 2,
      artifacts: ['Production Deployment'],
      details: 'Staged rollout. Monitoring dashboards. No critical issues.',
    },
  ],
  agentic: [
    // Product Phase - Parallel & Compressed
    {
      id: 'agent-1',
      role: 'product',
      title: 'Conversational Requirements Capture',
      description: 'PM has natural conversation with AI to draft PRD',
      duration: 2,
      details: '15-minute conversation. AI asks clarifying questions, suggests edge cases PM hadn\'t considered.',
    },
    {
      id: 'agent-2',
      role: 'product',
      title: 'Automated Discovery',
      description: 'Agents run parallel competitive analysis & data pull',
      duration: 1.5,
      artifacts: ['Competitive Analysis Report', 'Usage Pattern Data', 'Security Best Practices'],
      details: 'Agents simultaneously: analyze 15 competitor auth flows, pull internal usage data, research OWASP guidelines. PM reviews in minutes, not days.',
    },
    {
      id: 'agent-3',
      role: 'product',
      title: 'Solution Exploration',
      description: 'AI generates 3 solution approaches with tradeoffs',
      duration: 1,
      artifacts: ['Option A: OAuth + Social', 'Option B: Passwordless Magic Links', 'Option C: Traditional + 2FA'],
      details: 'Each option includes: implementation complexity, security posture, user friction, cost estimate. PM chooses Option C.',
    },
    {
      id: 'agent-4',
      role: 'product',
      title: 'PRD Finalization',
      description: 'PM validates AI-generated PRD and test scenarios',
      duration: 1.5,
      artifacts: ['PRD v1.0 (AI-Generated)', 'Test Scenarios', 'Edge Cases'],
      details: 'PM focuses on strategic validation, stakeholder alignment. Document is already comprehensive.',
    },
    // Design Phase - Parallel Generation
    {
      id: 'agent-5',
      role: 'design',
      title: 'Design Variation Generation',
      description: 'AI generates 4 design variations from PRD',
      duration: 1,
      artifacts: ['Variant A: Minimal', 'Variant B: Premium', 'Variant C: Playful', 'Variant D: Enterprise'],
      details: 'Instant generation of interactive prototypes. Each variant follows design system.',
    },
    {
      id: 'agent-6',
      role: 'design',
      title: 'Automated Accessibility Audit',
      description: 'AI checks all variants for WCAG compliance',
      duration: 0.5,
      details: 'Color contrast, keyboard navigation, screen reader support. Issues flagged immediately.',
    },
    {
      id: 'agent-7',
      role: 'design',
      title: 'Component Library Integration',
      description: 'AI suggests existing components, generates new ones',
      duration: 1,
      artifacts: ['Component Mappings', 'New Components Needed'],
      details: 'Reuses 80% of existing design system. Proposes 3 new components for design system.',
    },
    {
      id: 'agent-8',
      role: 'design',
      title: 'Design Curation',
      description: 'Designer selects best elements, ensures brand coherence',
      duration: 2,
      artifacts: ['Final Design (Curated)', 'Interactive Prototype'],
      details: 'Designer becomes curator: chooses Variant B layout, Variant D form styling, custom loading states.',
    },
    // Engineering Phase - Accelerated with AI
    {
      id: 'agent-9',
      role: 'engineering',
      title: 'Implementation Options',
      description: 'AI generates 2 implementation approaches',
      duration: 0.5,
      artifacts: ['Approach A: Next-Auth', 'Approach B: Custom + Supabase'],
      details: 'Each includes: file structure, dependencies, migration plan. Engineer chooses Approach A.',
    },
    {
      id: 'agent-10',
      role: 'engineering',
      title: 'Architecture Review',
      description: 'Engineer validates AI architecture decisions',
      duration: 1.5,
      details: 'Focus on: scalability, security model, integration with existing auth. Approves with minor tweaks.',
    },
    {
      id: 'agent-11',
      role: 'engineering',
      title: 'Code Generation',
      description: 'AI implements backend & frontend simultaneously',
      duration: 2,
      artifacts: ['API Implementation', 'Frontend Components', 'Database Schema', 'Tests'],
      details: 'Parallel generation: API endpoints, React components, migration scripts, unit tests, e2e tests.',
    },
    {
      id: 'agent-12',
      role: 'engineering',
      title: 'Code Review & Refinement',
      description: 'Engineer reviews AI code, focuses on architecture',
      duration: 2,
      details: 'No "const vs let" comments. Focus on: abstraction quality, error boundaries, rate limiting strategy.',
    },
    {
      id: 'agent-13',
      role: 'engineering',
      title: 'Automated Testing & CI',
      description: 'AI-generated tests run, self-healing CI fixes issues',
      duration: 1,
      artifacts: ['Test Suite (96% coverage)', 'CI/CD Pipeline'],
      details: 'Tests pass. One flaky test auto-fixed by CI agent. Coverage report generated.',
    },
    {
      id: 'agent-14',
      role: 'engineering',
      title: 'Deployment & Monitoring',
      description: 'Automated deployment with real-time documentation',
      duration: 1,
      artifacts: ['Production Deployment', 'Live Documentation'],
      details: 'Staged rollout. Docs auto-updated. Monitoring configured. Engineer watches dashboards.',
    },
  ],
};

export const getTotalDuration = (steps: Step[]): number => {
  return steps.reduce((sum, step) => sum + step.duration, 0);
};

export const getPhaseSteps = (steps: Step[], role: Role): Step[] => {
  return steps.filter(step => step.role === role);
};

export const roleColors = {
  product: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    dark: 'bg-blue-600',
  },
  design: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    dark: 'bg-purple-600',
  },
  engineering: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    dark: 'bg-green-600',
  },
};

export const roleLabels = {
  product: 'Product',
  design: 'Design',
  engineering: 'Engineering',
};
