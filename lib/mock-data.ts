import { BarberShop, TimeSlot } from "./types";

export const barberShops: BarberShop[] = [
  {
    id: "1",
    name: "Classic Cuts Barbershop",
    address: "123 Main St, Downtown",
    description:
      "Traditional barbershop specializing in classic cuts and hot towel shaves",
    priceRange: "$25-$45",
    rating: 4.8,
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
      "Modern salon offering contemporary cuts and styling for all hair types",
    priceRange: "$35-$65",
    rating: 4.9,
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
    description: "Premium grooming experience with complimentary beverages",
    priceRange: "$45-$85",
    rating: 4.7,
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
    description: "Specialized in modern fades, tapers, and urban styles",
    priceRange: "$28-$50",
    rating: 4.6,
    services: [
      { id: "s10", name: "Fade Cut", price: 35, duration: 40 },
      { id: "s11", name: "Taper & Design", price: 50, duration: 60 },
      { id: "s12", name: "Quick Trim", price: 28, duration: 20 },
    ],
  },
];

// Generate time slots for the next 7 days
export function generateTimeSlots(shopId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
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
export function getShopSlots(shopId: string): TimeSlot[] {
  return generateTimeSlots(shopId);
}

// Get a specific shop by ID
export function getShopById(id: string): BarberShop | undefined {
  return barberShops.find((shop) => shop.id === id);
}

// Get a specific slot by ID
export function getSlotById(
  slotId: string,
  shopId: string
): TimeSlot | undefined {
  const slots = getShopSlots(shopId);
  return slots.find((slot) => slot.id === slotId);
}
