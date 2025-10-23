import { queryServices } from "@/actions/wix";
import ServiceCard from "@/components/service-card";

const ServicesCards = async () => {
  const { services } = await queryServices();
  const sortedServices = services.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-wrap gap-4">
      {sortedServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesCards;
