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
    id: 10,
    slug: 'how-i-built-orderbridge',
    title: 'How I Built OrderBridge: Solving the Delivery-to-POS Middleware Gap',
    excerpt:
      'A deep-dive into building an OAuth 2.0 middleware system that bridges food delivery platforms to POS systems.',
    date: 'Mar 11, 2026',
    readTime: '9 min',
    tags: ['Integration', 'Node.js', 'OAuth 2.0'],
    image: '/images/projects/orderbridge/orderbridge-cover.png',
    category: 'backend',
    published: true,
  },
];
