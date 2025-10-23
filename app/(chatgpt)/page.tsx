import { barberShops } from "@/lib/mock-data";
import CarouselInlineShops from "@/components/carousel-inline-shops";

export default function Home() {
  return <CarouselInlineShops shops={barberShops} />;
}
