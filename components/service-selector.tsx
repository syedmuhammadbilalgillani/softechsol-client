"use client";
import { Service } from "@/app/generated/prisma";
import { useState } from "react";

interface ServiceSelectorProps {
  services: any[];
  onServiceChange?: (serviceId: string) => void;
}

const ServiceSelector = ({ services, onServiceChange }: ServiceSelectorProps) => {
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
        <option value="">Select a Service</option>
        {services.map((category) => (
          <optgroup key={category.id} label={category.name}>
            {category?.services && category?.services?.length > 0 ? (
              category.services.map((service: Service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))
            ) : (
              <option disabled>No services available</option>
            )}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default ServiceSelector;