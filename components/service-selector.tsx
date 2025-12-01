"use client";
import { Service } from "@/app/generated/prisma";
import { useState } from "react";

interface ServiceSelectorProps {
  services: any[];
  onServiceChange?: (serviceId: string) => void;
}

const ServiceSelector = ({
  services,
  onServiceChange,
}: ServiceSelectorProps) => {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    onServiceChange?.(serviceId);
  };

  return (
    <div className="col-span-1 ">
      <label htmlFor="service" className="block text-sm font-medium text-white">
        Service
      </label>
      <select
        id="service"
        name="service"
        value={selectedService}
        onChange={handleServiceChange}
        className="mt-1 block bg-white w-full p-2 py-[0.6rem] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      >
        <option disabled>Select a Service</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceSelector;
