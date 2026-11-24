export type ProjectTone = 'lime' | 'mint' | 'gold' | 'olive';

export interface Project {
  slug: string;
  name: string;
  timeline: string;
  kind: string;
  description: string;
  tech: string[];
  contributions: string[];
  role: string;
  tone: ProjectTone;
  /** Module labels drawn in the preview placeholder until a screenshot is added. */
  visual: string[];
  /** Optional screenshot URL; replaces the drawn preview when set. */
  image?: string;
  link?: { href: string; label: string };
}

export const projects: Project[] = [
  {
    slug: 'mambo-mia',
    name: 'Mambo Mia',
    timeline: 'June 2024 – Present',
    kind: 'Guest · Admin',
    description:
      'A multi-platform ecosystem of 5+ applications: Guest apps for Web, Android, and iOS, an Admin web application, and a Guide mobile application.',
    tech: ['Flutter', 'React.js', 'C#', 'ASP.NET Core', 'Azure', 'Firebase', 'WebSockets', 'GitHub'],
    contributions: [
      'Developed cross-platform applications using Flutter and responsive web interfaces using React.js.',
      'Worked on backend API development using C# and ASP.NET Core to support application-specific business requirements.',
      'Designed and implemented role-based workflows for Guests, Guides, and Administrators.',
      'Integrated REST APIs and WebSocket-based communication for real-time application updates.',
    ],
    role: 'mobile · web · api · realtime',
    tone: 'lime',
    visual: ['Guest · Web', 'Guest · Android', 'Guest · iOS', 'Admin · Web', 'Guide · Mobile'],
  },
  {
    slug: 'huhoka-crm',
    name: 'HuHoKa CRM',
    timeline: 'January 2024 – June 2024',
    kind: 'Website',
    description:
      'A dynamic multi-client CRM application built with reusable, configurable modules and a configuration-driven architecture for client-specific workflows.',
    tech: ['Flutter', 'C#', 'ASP.NET Core', 'WebSockets', 'GitHub'],
    contributions: [
      'Developed the multi-client CRM application using Flutter with reusable and configurable modules.',
      'Worked on backend API development and integration using C# and ASP.NET Core.',
      'Designed a configuration-driven architecture to support client-specific workflows.',
      'Built reusable modules for lead management, tracking, and reporting.',
      'Integrated backend services and real-time communication to support dynamic CRM workflows.',
    ],
    role: 'mobile · api · integrations',
    tone: 'mint',
    visual: ['Leads', 'Tracking', 'Reporting', 'Config'],
  },
];
