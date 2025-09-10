export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishDate: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
  isStatic?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'luxury-chauffeur-service-benefits',
    title: 'The Ultimate Guide to Luxury Chauffeur Services: Why Premium Transportation Matters',
    excerpt: 'Discover the unparalleled benefits of professional chauffeur services and how they elevate your travel experience to new heights of comfort and sophistication.',
    content: `
      <h2>The Art of Premium Transportation</h2>
      <p>In today's fast-paced world, luxury chauffeur services represent more than just transportation – they embody a lifestyle choice that prioritizes comfort, efficiency, and prestige. Whether you're attending a business meeting, special event, or simply desire a stress-free journey, professional chauffeur services offer an unmatched level of sophistication.</p>
      
      <h3>Uncompromising Safety Standards</h3>
      <p>Our professional chauffeurs undergo rigorous training and background checks, ensuring your safety is never compromised. With defensive driving techniques and intimate knowledge of local routes, you can trust that every journey is executed with the highest safety standards.</p>
      
      <h3>Time is Your Most Valuable Asset</h3>
      <p>With a dedicated chauffeur, you can maximize productivity during travel. Transform your commute into valuable work time, make important calls, or simply relax while we handle the complexities of navigation and traffic.</p>
      
      <h3>Fleet Excellence</h3>
      <p>Our meticulously maintained fleet of luxury vehicles ensures that every journey is comfortable and stylish. From executive sedans to spacious SUVs, each vehicle is equipped with premium amenities to enhance your travel experience.</p>
      
      <h2>Making the Right Choice</h2>
      <p>Choosing a luxury chauffeur service is an investment in your time, comfort, and peace of mind. Experience the difference that professional transportation can make in your daily life.</p>
    `,
    featuredImage: '/src/assets/luxary chaffaur/front.jpg',
    publishDate: '2024-01-15',
    author: 'Royal VIP Limos Team',
    tags: ['Luxury', 'Chauffeur', 'Premium Service', 'Transportation'],
    category: 'Services',
    readTime: 5
  },
  {
    id: '2',
    slug: 'wedding-transportation-guide',
    title: 'Your Perfect Wedding Day: Choosing the Right Luxury Transportation',
    excerpt: 'Make your special day unforgettable with our comprehensive guide to selecting the perfect wedding transportation that matches your style and vision.',
    content: `
      <h2>Creating Unforgettable Moments</h2>
      <p>Your wedding day deserves nothing less than perfection, and transportation plays a crucial role in creating those magical moments. From the bride's grand entrance to the couple's romantic departure, luxury vehicles add elegance and sophistication to your celebration.</p>
      
      <h3>Choosing the Perfect Vehicle</h3>
      <p>Consider your wedding theme, guest count, and personal style when selecting your transportation. Classic stretch limousines offer timeless elegance, while modern luxury SUVs provide contemporary sophistication with ample space for bridal parties.</p>
      
      <h3>Planning Your Transportation Timeline</h3>
      <p>Coordinate with your wedding planner to ensure seamless transportation logistics. Consider travel times between venues, photo opportunities, and any special requests to make your day flow effortlessly.</p>
      
      <h3>Special Touches</h3>
      <p>Many couples choose to personalize their wedding transportation with decorations, champagne service, or special music playlists. These thoughtful details create lasting memories and enhance the overall experience.</p>
      
      <h2>Book Early for Peace of Mind</h2>
      <p>Popular wedding dates book quickly, so secure your luxury transportation well in advance. This ensures availability and allows time for any special customizations you desire.</p>
    `,
    featuredImage: '/src/assets/streatch limos/front2.jpg',
    publishDate: '2024-01-10',
    author: 'Royal VIP Limos Team',
    tags: ['Wedding', 'Luxury', 'Special Events', 'Limousine'],
    category: 'Events',
    readTime: 4
  },
  {
    id: '3',
    slug: 'corporate-travel-solutions',
    title: 'Elevate Your Corporate Image with Professional Transportation Solutions',
    excerpt: 'Discover how premium corporate transportation services can enhance your business image and provide reliable solutions for executives and clients.',
    content: `
      <h2>Professional Excellence in Motion</h2>
      <p>In the corporate world, first impressions matter immensely. Professional transportation services not only ensure punctuality and comfort but also reflect your company's commitment to excellence and attention to detail.</p>
      
      <h3>Executive Transportation</h3>
      <p>Our executive transportation services cater to C-level executives and VIP clients who demand the highest standards. With discretion, professionalism, and luxury vehicles, we ensure every journey reinforces your corporate image.</p>
      
      <h3>Airport Transfers</h3>
      <p>Streamline your business travel with reliable airport transfer services. Our chauffeurs monitor flight schedules and provide meet-and-greet services, ensuring seamless transitions for busy executives.</p>
      
      <h3>Corporate Events</h3>
      <p>From board meetings to corporate galas, our transportation services ensure your team and clients arrive in style. Coordinate group transportation for conferences, team building events, and client entertainment.</p>
      
      <h3>Account Management</h3>
      <p>Dedicated account managers work with your company to understand specific needs and preferences, providing consistent service that aligns with your corporate standards and requirements.</p>
      
      <h2>Invest in Your Corporate Image</h2>
      <p>Professional transportation is an investment in your company's reputation and your team's productivity. Experience the difference that premium corporate transportation can make.</p>
    `,
    featuredImage: '/src/assets/v class/front2.jpg',
    publishDate: '2024-01-05',
    author: 'Royal VIP Limos Team',
    tags: ['Corporate', 'Business', 'Executive', 'Professional'],
    category: 'Business',
    readTime: 6
  },
  {
    id: '4',
    slug: 'luxury-fleet-maintenance',
    title: 'Behind the Scenes: How We Maintain Our Luxury Fleet to Perfection',
    excerpt: 'Take a look at our meticulous maintenance processes that ensure every vehicle in our luxury fleet meets the highest standards of safety and elegance.',
    content: `
      <h2>Excellence in Every Detail</h2>
      <p>Maintaining a luxury fleet requires unwavering attention to detail and commitment to excellence. Our comprehensive maintenance program ensures that every vehicle meets the highest standards of safety, comfort, and aesthetic appeal.</p>
      
      <h3>Preventive Maintenance Schedule</h3>
      <p>Our vehicles undergo regular inspections and maintenance based on manufacturer recommendations and industry best practices. This proactive approach prevents issues before they occur and ensures optimal performance.</p>
      
      <h3>Interior Detailing</h3>
      <p>Each vehicle receives thorough interior cleaning and detailing after every use. From leather conditioning to carpet cleaning, we ensure that every surface meets our luxury standards.</p>
      
      <h3>Technology Updates</h3>
      <p>We regularly update vehicle technology systems, including navigation, entertainment, and communication features, to provide the latest amenities for our discerning clients.</p>
      
      <h3>Quality Assurance</h3>
      <p>Before each service, our vehicles undergo a comprehensive quality check to ensure everything from air conditioning to sound systems functions perfectly.</p>
      
      <h2>Your Comfort is Our Priority</h2>
      <p>Our commitment to fleet maintenance reflects our dedication to providing an exceptional experience for every client, every time.</p>
    `,
    featuredImage: '/src/assets/luxary chaffaur/front2.jpg',
    publishDate: '2023-12-28',
    author: 'Royal VIP Limos Team',
    tags: ['Fleet', 'Maintenance', 'Quality', 'Luxury'],
    category: 'Behind the Scenes',
    readTime: 4
  },
  {
    id: '5',
    slug: 'special-occasions-transportation',
    title: 'Celebrating Life\'s Special Moments with Luxury Transportation',
    excerpt: 'From anniversaries to graduations, discover how luxury transportation can make any special occasion more memorable and elegant.',
    content: `
      <h2>Every Moment Deserves to be Special</h2>
      <p>Life's milestone moments deserve to be celebrated in style. Whether it's an anniversary dinner, graduation ceremony, or birthday celebration, luxury transportation adds an element of sophistication that makes these occasions truly unforgettable.</p>
      
      <h3>Anniversary Celebrations</h3>
      <p>Recreate the magic of your special day with romantic transportation for anniversary celebrations. Surprise your partner with a luxury ride to a favorite restaurant or scenic destination.</p>
      
      <h3>Graduation Ceremonies</h3>
      <p>Mark academic achievements with style by arriving at graduation ceremonies in luxury vehicles. It's a perfect way to celebrate years of hard work and dedication.</p>
      
      <h3>Birthday Parties</h3>
      <p>Make milestone birthdays extra special with luxury transportation. Whether it's a sweet sixteen, 21st birthday, or golden anniversary, arrive in style and create lasting memories.</p>
      
      <h3>Date Nights</h3>
      <p>Transform an ordinary evening into an extraordinary experience with luxury transportation for date nights. Focus on each other while we handle the driving.</p>
      
      <h2>Creating Lasting Memories</h2>
      <p>Special occasions are about creating memories that last a lifetime. Let us help make your celebrations even more memorable with our luxury transportation services.</p>
    `,
    featuredImage: '/src/assets/streatch limos/front3.jpg',
    publishDate: '2023-12-20',
    author: 'Royal VIP Limos Team',
    tags: ['Special Occasions', 'Celebrations', 'Luxury', 'Memories'],
    category: 'Events',
    readTime: 3
  },
  {
    id: '6',
    slug: 'airport-transfer-guide',
    title: 'Stress-Free Airport Transfers: Your Guide to Seamless Travel',
    excerpt: 'Learn how professional airport transfer services can eliminate travel stress and ensure you arrive at your destination refreshed and on time.',
    content: `
      <h2>Travel Without the Stress</h2>
      <p>Airport transfers don't have to be stressful. With professional transportation services, you can transform the most challenging part of travel into a comfortable and relaxing experience.</p>
      
      <h3>Flight Monitoring</h3>
      <p>Our advanced flight tracking system monitors your flight status in real-time, adjusting pickup times automatically for delays or early arrivals. You'll never have to worry about missed connections.</p>
      
      <h3>Meet and Greet Service</h3>
      <p>Our professional chauffeurs provide personalized meet and greet services, helping with luggage and ensuring a smooth transition from airport to vehicle.</p>
      
      <h3>Comfortable Vehicles</h3>
      <p>Travel in comfort with spacious vehicles equipped with climate control, premium seating, and ample luggage space. Relax and unwind after your flight.</p>
      
      <h3>Local Knowledge</h3>
      <p>Our experienced chauffeurs know the best routes to avoid traffic and construction, ensuring you reach your destination efficiently and on time.</p>
      
      <h2>Start Your Journey Right</h2>
      <p>Professional airport transfers set the tone for your entire trip. Begin and end your travels with the comfort and reliability you deserve.</p>
    `,
    featuredImage: '/src/assets/v class/front3.jpg',
    publishDate: '2023-12-15',
    author: 'Royal VIP Limos Team',
    tags: ['Airport', 'Travel', 'Transportation', 'Convenience'],
    category: 'Travel',
    readTime: 4
  }
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getLatestBlogs = (count: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const getBlogsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRelatedBlogs = (currentBlogId: string, count: number = 3): BlogPost[] => {
  const currentBlog = blogPosts.find(post => post.id === currentBlogId);
  if (!currentBlog) return [];
  
  return blogPosts
    .filter(post => 
      post.id !== currentBlogId && 
      (post.category === currentBlog.category || 
       post.tags.some(tag => currentBlog.tags.includes(tag)))
    )
    .slice(0, count);
};