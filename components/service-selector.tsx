"use client";
import { useState } from "react";

export interface ServiceOption {
  id: string | number;
  title: string;
}

interface ServiceSelectorProps {
  services: ServiceOption[];
  onServiceChange?: (serviceId: string) => void;
  className?: string;
}

// Friendly non-tech titles for human readability
const FRIENDLY_SERVICE_LABELS: Record<string, string> = {
  "web-development": "Website or Web Application",
  "mobile-development": "Mobile App (iOS & Android)",
  "business-automation": "Automating Daily Business Tasks",
  "agentic-ai": "AI Assistant or Smart Chatbot",
  "ui-ux-design": "UI/UX & Product Design",
  "deployment-and-maintenance": "Maintenance, Hosting & Support",
};

const ServiceSelector = ({
  services,
  onServiceChange,
  className = "",
}: ServiceSelectorProps) => {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    onServiceChange?.(serviceId);
  };

  return (
    <div className={className || "col-span-1"}>
      <label
        htmlFor="service"
        className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
      >
        What do you need help with?
      </label>
      <select
        id="service"
        name="service"
        value={selectedService}
        onChange={handleServiceChange}
        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
      >
        <option value="" className="bg-white text-slate-500">
          Select an option (Optional)
        </option>
        {services.map((service) => (
          <option key={service.id} value={service.id} className="bg-white text-gray-900">
            {FRIENDLY_SERVICE_LABELS[String(service.id)] || service.title}
          </option>
        ))}
        <option value="not-sure-yet" className="bg-white text-gray-900">
          I am not sure yet (I need some advice)
        </option>
      </select>
    </div>
  );
};

export default ServiceSelector;
