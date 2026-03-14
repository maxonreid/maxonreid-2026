export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  category: string;
  published: boolean;
}

export const articles: Article[] = [
  {
    id: 11,
    slug: 'teaching-web-development-china-yango-university',
    title: 'Teaching Web Development in China @ Yango University',
    excerpt:
      'How teaching HTML, CSS, and JavaScript fundamentals in Fuzhou, China taught me to be a better developer. Lessons on cross-cultural education, communication, and why strong fundamentals matter more than frameworks.',
    date: 'Mar 14, 2026',
    readTime: '6 min',
    tags: ['Teaching', 'Career', 'Web Development', 'Education', 'China'],
    image: '/images/articles/yango-university-china/students-coding.jpeg',
    category: 'experience',
    published: true,
  },
  {
    id: 10,
    slug: 'how-i-built-orderbridge',
    title: 'How I Built OrderBridge: Solving the Delivery-to-POS Middleware Gap',
    excerpt:
      'Building an OAuth 2.0 middleware system that automatically bridges DoorDash, Uber Eats, and delivery platforms to restaurant POS systems. Technical deep-dive into webhook ingestion, schema translation, and real-time order sync.',
    date: 'Mar 11, 2026',
    readTime: '9 min',
    tags: ['Integration', 'Node.js', 'OAuth 2.0', 'API', 'Middleware', 'Restaurant Tech'],
    image: '/images/projects/orderbridge/orderbridge-cover.png',
    category: 'backend',
    published: true,
  },
];
