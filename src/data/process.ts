export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Understand',
    description:
      'Understand business requirements, user expectations, and technical requirements before implementation.',
  },
  {
    title: 'Architecture',
    description:
      'Plan application structure, reusable components, API communication, and database integration.',
  },
  {
    title: 'Develop',
    description:
      'Implement mobile, frontend, and backend features with maintainable code and reusable architecture.',
  },
  {
    title: 'Integrate & Deliver',
    description:
      'Integrate APIs, test application workflows, resolve issues, and prepare releases and deployments.',
  },
];
