export const profile = {
  name: 'Pranav Dhage',
  firstName: 'PRANAV',
  lastName: 'DHAGE',
  brand: 'PRANAV',
  domain: 'PRANAV.DEV',
  title: 'Full Stack Software Engineer',
  location: 'Pune, India',
  locationFull: 'Pune, Maharashtra, India',
  timezone: 'IST',
  timezoneId: 'Asia/Kolkata',
  focus: 'Mobile · Web · APIs',
  experience: '2+ years',
  email: 'dhagepranav30@gmail.com',
  phone: '+91 7038987047',
  phoneHref: 'tel:+917038987047',
  linkedin: 'https://www.linkedin.com/in/pranav-dhage-585b7b216/',
  github: 'https://github.com/PranavD2911',
  githubHandle: '@PranavD2911',
  resume: '/Pranav_Dhage_Resume.pdf',
  currentRole: 'Software Engineer @ CentraLogic',
  availability: 'Open to full-time roles',
  intro:
    'I build applications from interface to backend — creating scalable mobile experiences, responsive web applications, and reliable APIs.',
} as const;

export const mailto = `mailto:${profile.email}`;

export const navLinks = [
  { id: 'stack', label: 'Stack' },
  { id: 'impact', label: 'Before·After' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
] as const;

export const tickerItems = [
  'Writing code',
  'Building products',
  'Solving problems',
  'Flutter',
  'React',
  'ASP.NET Core',
];
