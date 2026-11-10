export const defaultCourses = [
  {
    id: 1,
    title: 'HTML',
    desc: 'Belajar dasar HTML untuk membangun struktur website modern. HTML adalah fondasi dari setiap website. Di sini kamu akan menguasai semantic HTML, forms, multimedia, dan SEO basics.',
    video: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
    lessons: 6,
  },
  {
    id: 2,
    title: 'CSS',
    desc: 'Styling website dengan CSS modern, Flexbox, Grid, dan animasi. Buat desain yang responsif dan menarik.',
    video: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
    lessons: 6,
  },
  {
    id: 3,
    title: 'PHP',
    desc: 'Backend development dengan PHP untuk web dinamis. Belajar dari sintaks dasar hingga framework modern.',
    video: 'https://www.youtube.com/watch?v=OK_JCtrrv-c',
    lessons: 6,
  },
  {
    id: 4,
    title: 'Golang',
    desc: 'Bahasa Go untuk backend berperforma tinggi. Cocok untuk microservices dan sistem concurrent.',
    video: 'https://www.youtube.com/watch?v=YS4e4q9oBaU',
    lessons: 6,
  },
  {
    id: 5,
    title: 'JavaScript',
    desc: 'Fundamental JavaScript hingga DOM manipulation dan async programming.',
    video: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    lessons: 6,
  },
  {
    id: 6,
    title: 'React',
    desc: 'Membangun UI modern dengan React library. Hooks, state management, dan component patterns.',
    video: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    lessons: 6,
  },
];

/**
 * Setiap lesson bisa punya video sendiri.
 * Jika video kosong, pakai video course utama.
 */
export const sampleLessons = {
  HTML: [
    {
      title: 'Pengenalan HTML & Setup Environment',
      duration: '08:12',
      video: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
    },
    {
      title: 'Struktur Dasar Dokumen HTML',
      duration: '12:45',
      video: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
    },
    {
      title: 'Semantic Tags HTML5',
      duration: '15:30',
      video: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
    },
    {
      title: 'Forms & Input Elements',
      duration: '18:20',
      video: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
    },
    {
      title: 'Multimedia (Audio, Video, Canvas)',
      duration: '14:10',
      video: 'https://www.youtube.com/watch?v=jSMbG0pKqYs',
    },
    {
      title: 'Accessibility & Best Practices',
      duration: '11:55',
      video: 'https://www.youtube.com/watch?v=3f31oufqFSM',
    },
  ],
  CSS: [
    { title: 'Pengenalan CSS', duration: '10:00', video: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc' },
    { title: 'Selectors & Specificity', duration: '12:00', video: 'https://www.youtube.com/watch?v=l1mER1bV0N0' },
    { title: 'Box Model & Layout', duration: '15:00', video: 'https://www.youtube.com/watch?v=rIO5326FgPE' },
    { title: 'Flexbox', duration: '18:00', video: 'https://www.youtube.com/watch?v=JJSoEo8JSnc' },
    { title: 'CSS Grid', duration: '20:00', video: 'https://www.youtube.com/watch?v=jV8B24rSN5o' },
    { title: 'Responsive Design', duration: '14:00', video: 'https://www.youtube.com/watch?v=srvUrASNj0s' },
  ],
  default: [
    { title: 'Pengenalan & Setup', duration: '10:00', video: '' },
    { title: 'Konsep Dasar', duration: '15:30', video: '' },
    { title: 'Praktik 1', duration: '20:00', video: '' },
    { title: 'Praktik 2', duration: '18:45', video: '' },
    { title: 'Project Mini', duration: '25:00', video: '' },
    { title: 'Quiz & Review', duration: '12:00', video: '' },
  ],
};
