export interface BlogData {
    id: number;
    title: string;
    author: string;
    date: string;
    category: string;
    tags?: string[];
    imageUrl: string;
    content: string;
  }
  
  export const blogPosts: BlogData[] = [
    {
      id: 1,
      title: "Unforgettable Journeys: Why a Limousine Makes Your Dubai Trip Special",
      author: "Royal VIP Limos Team",
      date: "2024-07-20",
      category: "Luxury Travel",
      tags: ["Limousine", "Dubai", "Luxury", "Travel"],
      imageUrl: "/src/assets/blog/blog-1.jpg",
      content: `
        <p>Dubai is a city of dreams, where luxury and innovation meet. To truly experience its grandeur, nothing beats traveling in a limousine. A limo ride isn't just about transportation; it's about creating unforgettable memories.</p>
        <h2>The Ultimate Comfort and Style</h2>
        <p>From the moment you step into a limousine, you are enveloped in an atmosphere of opulence. Plush leather seats, ambient lighting, and state-of-the-art entertainment systems create a cocoon of comfort. Whether you're heading to a business meeting, a glamorous event, or simply exploring the city, a limousine ensures you arrive in style.</p>
        <h2>Privacy and Professionalism</h2>
        <p>Our chauffeurs are highly trained professionals who prioritize your privacy and safety. You can relax or conduct business in a confidential environment, knowing you are in capable hands. Punctuality and impeccable service are the hallmarks of our commitment to excellence.</p>
        <h2>See Dubai's Landmarks Like Never Before</h2>
        <p>Imagine cruising past the Burj Khalifa, the Palm Jumeirah, and the Dubai Marina in a luxurious limousine. The panoramic views and unparalleled comfort make sightseeing an extraordinary experience. It's the perfect way to celebrate a special occasion or simply indulge in the best that Dubai has to to offer.</p>
        <p>At Royal VIP Limos, we are dedicated to providing a premier limousine service that exceeds your expectations. Book with us and make your Dubai journey truly special.</p>
      `,
    },
    {
      id: 2,
      title: "Choosing the Perfect Limousine for Your Event",
      author: "Royal VIP Limos Team",
      date: "2024-07-18",
      category: "Event Planning",
      tags: ["Limousine", "Events", "Wedding", "Corporate"],
      imageUrl: "/src/assets/blog/blog-2.jpg",
      content: `
        <p>Selecting the right limousine can elevate any event from ordinary to extraordinary. Whether it's a wedding, a corporate function, or a night out, the vehicle you choose sets the tone for the entire occasion.</p>
        <h2>For Weddings</h2>
        <p>A classic stretch limousine is the epitome of elegance and romance. It provides ample space for the bridal party and creates a stunning backdrop for photos. Consider a white or silver limo to complement the traditional wedding aesthetic.</p>
        <h2>For Corporate Events</h2>
        <p>For business events, a sleek and sophisticated sedan or SUV limousine is a great choice. It projects an image of professionalism and ensures your clients or partners travel in comfort and style. Features like Wi-Fi and charging ports are essential for productivity on the go.</p>
        <h2>For Parties and Celebrations</h2>
        <p>If you're planning a party, a party bus or a stretch Hummer limo can add a fun and festive element. With features like premium sound systems, mood lighting, and mini-bars, the celebration starts the moment you get on board.</p>
        <p>At Royal VIP Limos, we offer a diverse fleet to suit any event. Our team is here to help you choose the perfect limousine to make your occasion unforgettable.</p>
      `,
    },
    {
      id: 3,
      title: "The Benefits of Airport Limousine Services in Dubai",
      author: "Royal VIP Limos Team",
      date: "2024-07-15",
      category: "Travel Tips",
      tags: ["Airport Transfer", "Limousine", "Dubai", "Convenience"],
      imageUrl: "/src/assets/blog/blog-3.jpg",
      content: `
        <p>Traveling can be stressful, but it doesn't have to be. An airport limousine service offers a seamless and luxurious way to start or end your journey in Dubai.</p>
        <h2>Stress-Free Travel</h2>
        <p>Forget the hassle of navigating traffic, finding parking, or waiting for a taxi. With an airport limo service, a professional chauffeur will be waiting for you, ready to assist with your luggage and transport you to your destination in comfort.</p>
        <h2>Reliability and Punctuality</h2>
        <p>Our chauffeurs monitor your flight status to ensure timely pickups and drop-offs, even if your flight is delayed. You can count on us to be there when you need us, providing a reliable and stress-free transfer.</p>
        <h2>A Luxurious Welcome</h2>
        <p>Arriving in Dubai in a limousine sets the stage for a memorable trip. It's a perfect way to impress business clients or treat yourself to a touch of luxury after a long flight. Our vehicles are equipped with amenities to help you relax and rejuvenate.</p>
        <p>Experience the ultimate in convenience and comfort with Royal VIP Limos' airport transfer services. Book your ride today and travel with peace of mind.</p>
      `,
    },
    {
      id: 4,
      title: "Top 5 Luxury Destinations to Visit in a Limo in Dubai",
      author: "Royal VIP Limos Team",
      date: "2024-07-12",
      category: "Dubai Attractions",
      tags: ["Dubai", "Luxury", "Destinations", "Limousine"],
      imageUrl: "/src/assets/blog/blog-4.jpg",
      content: `
        <p>Dubai is home to some of the world's most luxurious destinations. Exploring them in a limousine adds an extra layer of glamour and sophistication to your experience.</p>
        <h2>1. The Burj Al Arab</h2>
        <p>Arrive at the iconic seven-star hotel in a style that matches its opulence. A limousine entrance is the perfect way to begin an evening of fine dining or high tea.</p>
        <h2>2. The Dubai Opera</h2>
        <p>For a night of culture and arts, a limousine ride to the stunning Dubai Opera is a must. It sets a tone of elegance for a memorable evening of performances.</p>
        <h2>3. Atlantis, The Palm</h2>
        <p>Make a grand entrance at this legendary resort. Whether you're visiting the Aquaventure Waterpark or dining at Nobu, a limo ensures your journey is as luxurious as your destination.</p>
        <h2>4. The Dubai Mall's Fashion Avenue</h2>
        <p>Shop at the world's most exclusive designer stores and arrive like a true VIP. A limousine service makes a day of high-end shopping even more special.</p>
        <h2>5. A Desert Safari</h2>
        <p>While the safari itself is rugged, the journey there doesn't have to be. Travel to the desert in comfort and style before embarking on your adventure.</p>
        <p>Let Royal VIP Limos take you to Dubai's most exclusive spots. Our luxury fleet is at your service to make every trip unforgettable.</p>
      `,
    },
  ];
  