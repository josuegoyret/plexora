export type Shop = {
  id: string;
  name: string;
  address: string;
  description: string;
  priceRange: string;
  rating: number;
  services: Service[];
  image: string;
  nextAvailableSlots: string[];
};

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
};

export type TimeSlot = {
  id: string;
  shopId: string;
  date: string; // ISO format
  time: string; // e.g., "09:00"
  available: boolean;
};

export type Booking = {
  id: string;
  shopId: string;
  slotId: string;
  serviceId: string;
  customerName: string;
  customerEmail: string;
  timestamp: string;
};
