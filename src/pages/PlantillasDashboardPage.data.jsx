/* eslint-disable react-refresh/only-export-components */
export const TrendingUp = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
export const Users = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
export const Globe = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
export const Activity = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
export const ArrowUpRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);
export const Download = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);
export const Box = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" x2="12" y1="22.08" y2="12" />
  </svg>
);

export const DASHBOARD_TEMPLATES = [
  {
    id: 1,
    title: 'FinTech Pro',
    category: 'Finance',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    size: 'large', // spans 2 cols, 2 rows
    downloads: '2.4k',
    price: '$49',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 2,
    title: 'SaaS Analytics',
    category: 'Business',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    size: 'medium', // spans 1 col, 1 row
    downloads: '1.8k',
    price: '$29',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 3,
    title: 'Users Flow',
    category: 'Traffic',
    image: null, // Plantilla widget
    icon: <Users className="h-10 w-10" />,
    size: 'small',
    downloads: '850',
    price: 'Free',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 4,
    title: 'Revenue',
    category: 'Sales',
    image: null,
    icon: <TrendingUp className="h-10 w-10" />,
    size: 'small',
    downloads: '3.1k',
    price: '$19',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 5,
    title: 'E-Commerce Admin',
    category: 'Retail',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop',
    size: 'wide', // spans 2 cols, 1 row
    downloads: '5.2k',
    price: '$59',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  {
    id: 6,
    title: 'Server Status',
    category: 'DevOps',
    image: null,
    icon: <Activity className="h-10 w-10" />,
    size: 'small',
    downloads: '900',
    price: 'Free',
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    id: 7,
    title: 'Global Reach',
    category: 'Maps',
    image: null,
    icon: <Globe className="h-10 w-10" />,
    size: 'small',
    downloads: '1.2k',
    price: '$25',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
];
