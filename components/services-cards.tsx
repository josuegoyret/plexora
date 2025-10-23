import { queryServices } from "@/actions/wix";
import ServiceCard from "@/components/service-card";

const ServicesCards = async () => {
  const { services } = await queryServices();

  return (
    <div className="flex flex-wrap gap-4">
      {services
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
    </div>
  );
};

export default ServicesCards;
