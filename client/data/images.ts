export interface Image {
  id: string;
  src: string;
  caption?: string;
  category: "bride" | "groom" | "reception" | "ceremony" | "details";
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  value: string;
}

export const categories: Category[] = [
  { id: "all", name: "All Photos", value: "all" },
  { id: "bride", name: "Bride", value: "bride" },
  { id: "groom", name: "Groom", value: "groom" },
  { id: "ceremony", name: "Ceremony", value: "ceremony" },
  { id: "reception", name: "Reception", value: "reception" },
  { id: "details", name: "Details", value: "details" },
];

export const images: Image[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=900&fit=crop",
    caption: "Beautiful bride in her stunning wedding gown",
    category: "bride",
    alt: "Bride getting ready",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1506748686214-e9b7d7490020?w=800&h=600&fit=crop",
    caption: "Groom looking sharp in his tuxedo",
    category: "groom",
    alt: "Groom portrait",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop",
    caption: "Bride's intricate lace details",
    category: "details",
    alt: "Wedding dress details",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    caption: "Exchanging vows under the arch",
    category: "ceremony",
    alt: "Ceremony moment",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1514888286974-6c03bf1a64d2?w=800&h=700&fit=crop",
    caption: "Reception celebration and dancing",
    category: "reception",
    alt: "Reception dance floor",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=900&fit=crop",
    caption: "First kiss as married couple",
    category: "ceremony",
    alt: "First kiss",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop",
    caption: "Beautiful wedding rings on display",
    category: "details",
    alt: "Wedding rings",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1514888286974-6c03bf1a64d2?w=800&h=900&fit=crop",
    caption: "Bride and groom walking down the aisle",
    category: "ceremony",
    alt: "Walking down aisle",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1506748686214-e9b7d7490020?w=800&h=1000&fit=crop",
    caption: "Romantic bride and groom portrait",
    category: "bride",
    alt: "Couple portrait",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=700&fit=crop",
    caption: "Bouquet of beautiful flowers",
    category: "details",
    alt: "Wedding bouquet",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1514888286974-6c03bf1a64d2?w=800&h=1100&fit=crop",
    caption: "Reception dinner setup",
    category: "reception",
    alt: "Dinner reception",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=1000&fit=crop",
    caption: "Groom's handsome look",
    category: "groom",
    alt: "Groom close-up",
  },
];

export interface CoupleInfo {
  brideName: string;
  groomName: string;
  story: string;
  wedding_date: string;
  venue: string;
  ceremony_time: string;
  reception_time: string;
}

export const coupleInfo: CoupleInfo = {
  brideName: "Sarah",
  groomName: "James",
  story:
    "Sarah and James met in college during a study group. What started as late-night study sessions turned into late-night coffee dates. After four years of laughter, adventures, and unforgettable memories, James proposed under the stars at their favorite beach. Now, they're excited to celebrate their love surrounded by family and friends.",
  wedding_date: "June 15, 2024",
  venue: "The Grand Ballroom, Downtown",
  ceremony_time: "3:00 PM",
  reception_time: "5:00 PM",
};

export interface AdminImage extends Image {
  uploadDate: string;
}

// Sample admin uploaded images (with dates)
export const adminImages: AdminImage[] = images.map((img) => ({
  ...img,
  uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
}));
