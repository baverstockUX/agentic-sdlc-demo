# Agentic SDLC Interactive Prototype

An interactive demonstration showing the transformation from Traditional to Agentic Software Development Lifecycle workflows.

## What This Demonstrates

This prototype shows a side-by-side comparison of building the same feature (user authentication) through:

- **Traditional SDLC**: Sequential handoffs between Product, Design, and Engineering
- **Agentic SDLC**: Asynchronous artifact generation with human-in-the-loop validation

## Key Features

### Interactive Walkthrough
- Click through each step to see the transformation
- Auto-advance mode for continuous playback
- Real-time timer showing time compression (~4.6x faster)

### Side-by-Side Comparison
- Traditional workflow (left): 17 sequential steps
- Agentic workflow (right): 14 parallelized steps
- Visual role indicators (Product/Design/Engineering)
- Artifact generation displays

### Educational Summary
- Shows what changes: async workflows, parallel execution, human curation
- Shows what doesn't change: politics, unclear requirements, technical debt
- Highlights the "hidden failure mode": 10x faster at building the wrong thing

## Running the Demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14+ (React, App Router, TypeScript)
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide Icons

## How It Works

The simulation demonstrates:

1. **Product Phase**:
   - Traditional: Manual research, PRD writing, review cycles
   - Agentic: Conversational capture, automated discovery, AI-generated options

2. **Design Phase**:
   - Traditional: Sketches → wireframes → mockups → reviews
   - Agentic: AI generates variations, designer curates and validates

3. **Engineering Phase**:
   - Traditional: Sequential implementation, manual testing, code review
   - Agentic: Parallel code generation, architecture-focused review, self-healing CI

## Key Takeaways

The prototype emphasizes that the real transformation is:

- From execution to curation
- From sequential to parallel
- From "can we build it?" to "should we build it?"
- Product strategy becomes the new bottleneck, not engineering capacity

## File Structure

```
/
├── app/
│   ├── page.tsx                    # Main entry point
│   └── globals.css                 # Global styles
├── components/
│   ├── WorkflowComparison.tsx      # Main orchestration component
│   ├── Timeline.tsx                # Progress indicator
│   └── RoleCard.tsx                # Step display card
└── lib/
    └── workflow-data.ts            # Scenario data and types
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
