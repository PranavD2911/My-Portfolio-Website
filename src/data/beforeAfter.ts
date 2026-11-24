export interface Shift {
  label: string;
  before: string;
  after: string;
}

export const shifts: Shift[] = [
  {
    label: 'Workflow',
    before: 'Fragmented workflows',
    after: 'Structured development workflows',
  },
  {
    label: 'Interface',
    before: 'Repetitive UI implementation',
    after: 'Reusable application components',
  },
  {
    label: 'Services',
    before: 'Disconnected application services',
    after: 'Integrated REST APIs & real-time communication',
  },
  {
    label: 'Platforms',
    before: 'Complex integration requirements',
    after: 'Consistent cross-platform experiences',
  },
];
