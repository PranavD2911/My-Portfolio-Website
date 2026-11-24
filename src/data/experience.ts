export interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  areas: string[];
}

export const jobs: Job[] = [
  {
    company: 'Centralogic',
    role: 'Software Engineer',
    period: 'January 2024 – Present',
    location: 'Pune, India',
    areas: [
      'Flutter',
      'React.js',
      'C# / ASP.NET Core APIs',
      'Entity Framework Core',
      'SQL Server',
      'REST & WebSockets',
      'End-to-end features',
    ],
  },
  {
    company: 'Nucleosys Tech Pvt. Ltd.',
    role: 'Intern',
    period: 'March 2023 – June 2023',
    location: 'Pune, India',
    areas: ['Flutter apps', 'Reusable UI components', 'Android · Java / Kotlin'],
  },
];

export const education = {
  school: 'Dr. D. Y. Patil College of Engineering and Innovation, Pune',
  degree: 'Bachelor of Engineering — Computer Science',
  period: 'October 2020 – May 2024',
  grade: 'CGPA 8.3',
};

export const certifications = [
  'AWS Certified Cloud Practitioner',
  'Microsoft Certified: Azure Fundamentals',
  'Mobile App Development with Flutter and Dart (iOS and Android)',
  'OKR Certification: Leadership and Goal Setting',
];
