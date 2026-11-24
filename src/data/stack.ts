export interface StackGroup {
  title: string;
  description: string;
  tools: string[];
}

export const stack: StackGroup[] = [
  {
    title: 'Mobile Development',
    description:
      'Building cross-platform mobile applications with a focus on performance, reusable architecture, and responsive user experiences.',
    tools: ['Flutter', 'Dart', 'Android', 'Java', 'Kotlin', 'Firebase'],
  },
  {
    title: 'Frontend Development',
    description:
      'Creating responsive web interfaces and reusable UI components for modern applications.',
    tools: ['React.js', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Backend Development',
    description:
      'Developing RESTful APIs, database integrations, and backend application functionality.',
    tools: [
      'C#',
      'ASP.NET Core',
      'Entity Framework Core',
      'SQL Server',
      'REST APIs',
      'WebSockets',
    ],
  },
];
