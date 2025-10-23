import { Shop, MockTimeSlot } from "./types";

export const barberShops: Shop[] = [
  {
    id: "1",
    name: "Classic Cuts Barbershop",
    address: "123 Main St, Downtown",
    description:
      "Traditional barbershop specializing in classic cuts and hot towel shaves. A cozy atmosphere with vintage decor and skilled barbers.",
    priceRange: "$25-$45",
    rating: 4.8,
    image: "/barber-shop-1.jpg",
    nextAvailableSlots: ["6:00pm", "6:30pm"],
    services: [
      { id: "s1", name: "Haircut", price: 30, duration: 30 },
      { id: "s2", name: "Haircut & Beard Trim", price: 45, duration: 45 },
      { id: "s3", name: "Hot Towel Shave", price: 35, duration: 30 },
    ],
  },
  {
    id: "2",
    name: "Style Studio",
    address: "456 Oak Avenue, Midtown",
    description:
      "Modern salon offering contemporary cuts and styling for all hair types. Trendy atmosphere with the latest techniques.",
    priceRange: "$35-$65",
    rating: 4.9,
    image: "/barber-shop-2.jpg",
    nextAvailableSlots: ["5:30pm", "6:00pm"],
    services: [
      { id: "s4", name: "Precision Cut", price: 40, duration: 45 },
      { id: "s5", name: "Cut & Style", price: 55, duration: 60 },
      { id: "s6", name: "Beard Grooming", price: 30, duration: 30 },
    ],
  },
  {
    id: "3",
    name: "The Gentleman's Den",
    address: "789 Elm Street, Uptown",
    description:
      "Premium grooming experience with complimentary beverages and luxury amenities for the modern gentleman.",
    priceRange: "$45-$85",
    rating: 4.7,
    image: "/barber-shop-3.jpg",
    nextAvailableSlots: ["7:00pm", "7:30pm"],
    services: [
      { id: "s7", name: "Executive Cut", price: 50, duration: 45 },
      { id: "s8", name: "Royal Treatment", price: 85, duration: 90 },
      { id: "s9", name: "Beard Sculpting", price: 40, duration: 30 },
    ],
  },
  {
    id: "4",
    name: "Fresh Fade Barbers",
    address: "321 Park Boulevard, Eastside",
    description:
      "Specialized in modern fades, tapers, and urban styles. Known for precision work and creative designs.",
    priceRange: "$28-$50",
    rating: 4.6,
    image: "/barber-shop-4.jpg",
    nextAvailableSlots: ["5:00pm", "5:30pm"],
    services: [
      { id: "s10", name: "Fade Cut", price: 35, duration: 40 },
      { id: "s11", name: "Taper & Design", price: 50, duration: 60 },
      { id: "s12", name: "Quick Trim", price: 28, duration: 20 },
    ],
  },
  {
    id: "5",
    name: "Elite Barbers",
    address: "567 Broadway, Westside",
    description:
      "High-end barbershop with celebrity clientele and award-winning stylists. Premium services in a luxurious setting.",
    priceRange: "$50-$100",
    rating: 4.9,
    image: "/barber-shop-1.jpg",
    nextAvailableSlots: ["6:30pm", "7:00pm"],
    services: [
      { id: "s13", name: "Signature Cut", price: 60, duration: 50 },
      { id: "s14", name: "VIP Treatment", price: 100, duration: 90 },
      { id: "s15", name: "Beard Mastery", price: 45, duration: 40 },
    ],
  },
  {
    id: "6",
    name: "Urban Edge",
    address: "890 Pine Street, Northside",
    description:
      "Contemporary barbershop with street art decor and hip-hop culture. Perfect for modern urban styles.",
    priceRange: "$30-$55",
    rating: 4.5,
    image: "/barber-shop-2.jpg",
    nextAvailableSlots: ["5:00pm", "5:30pm"],
    services: [
      { id: "s16", name: "Urban Fade", price: 40, duration: 45 },
      { id: "s17", name: "Street Style", price: 55, duration: 60 },
      { id: "s18", name: "Quick Edge", price: 30, duration: 25 },
    ],
  },
  {
    id: "7",
    name: "Heritage Barbers",
    address: "234 Heritage Lane, Old Town",
    description:
      "Family-owned barbershop with three generations of experience. Traditional techniques meet modern comfort.",
    priceRange: "$25-$40",
    rating: 4.8,
    image: "/barber-shop-3.jpg",
    nextAvailableSlots: ["6:00pm", "6:30pm"],
    services: [
      { id: "s19", name: "Classic Cut", price: 30, duration: 35 },
      { id: "s20", name: "Family Special", price: 40, duration: 50 },
      { id: "s21", name: "Senior Discount", price: 25, duration: 30 },
    ],
  },
  {
    id: "8",
    name: "Precision Cuts",
    address: "678 Tech Drive, Innovation District",
    description:
      "Tech-savvy barbershop with online booking and digital consultations. Modern tools for perfect results.",
    priceRange: "$35-$60",
    rating: 4.7,
    image: "/barber-shop-4.jpg",
    nextAvailableSlots: ["7:00pm", "7:30pm"],
    services: [
      { id: "s22", name: "Digital Cut", price: 45, duration: 40 },
      { id: "s23", name: "Tech Style", price: 60, duration: 55 },
      { id: "s24", name: "App Booking", price: 35, duration: 30 },
    ],
  },
  {
    id: "9",
    name: "Golden Scissors",
    address: "345 Gold Street, Financial District",
    description:
      "Upscale barbershop catering to professionals and executives. Convenient location with premium services.",
    priceRange: "$40-$75",
    rating: 4.8,
    image: "/barber-shop-1.jpg",
    nextAvailableSlots: ["5:30pm", "6:00pm"],
    services: [
      { id: "s25", name: "Executive Cut", price: 50, duration: 45 },
      { id: "s26", name: "Business Style", price: 75, duration: 60 },
      { id: "s27", name: "Quick Touch-up", price: 40, duration: 25 },
    ],
  },
  {
    id: "10",
    name: "Community Cuts",
    address: "901 Community Ave, Suburbs",
    description:
      "Neighborhood barbershop focused on community and family. Affordable prices with friendly service.",
    priceRange: "$20-$35",
    rating: 4.6,
    image: "/barber-shop-2.jpg",
    nextAvailableSlots: ["6:30pm", "7:00pm"],
    services: [
      { id: "s28", name: "Community Cut", price: 25, duration: 30 },
      { id: "s29", name: "Family Package", price: 35, duration: 45 },
      { id: "s30", name: "Student Special", price: 20, duration: 25 },
    ],
  },
];

// Generate time slots for the next 7 days
export function generateMockTimeSlots(shopId: string): MockTimeSlot[] {
  const slots: MockTimeSlot[] = [];
  const today = new Date();

  // Generate slots for next 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);

    // Skip Sundays
    if (date.getDay() === 0) continue;

    // Generate hourly slots from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
      // Two 30-minute slots per hour
      for (let minute of [0, 30]) {
        if (hour === 18 && minute === 30) continue; // Don't go past 6 PM

        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const slotId = `${shopId}-${
          date.toISOString().split("T")[0]
        }-${timeString}`;

        // Randomly make some slots unavailable (30% chance)
        const available = Math.random() > 0.3;

        slots.push({
          id: slotId,
          shopId,
          date: date.toISOString().split("T")[0],
          time: timeString,
          available,
        });
      }
    }
  }

  return slots;
}

// Get all slots for a specific shop
export function getShopSlots(shopId: string): MockTimeSlot[] {
  return generateMockTimeSlots(shopId);
}

// Get a specific shop by ID
export function getShopById(id: string): Shop | undefined {
  return barberShops.find((shop) => shop.id === id);
}

// Get a specific slot by ID
export function getSlotById(
  slotId: string,
  shopId: string
): MockTimeSlot | undefined {
  const slots = getShopSlots(shopId);
  return slots.find((slot) => slot.id === slotId);
}
