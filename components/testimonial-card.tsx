import React from "react";
import {
  Clock,
  Rocket,
  MessageSquare,
  Target,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  rocket: Rocket,
  message: MessageSquare,
  target: Target,
  shield: ShieldCheck,
  users: Users,
};

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const TestimonialCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
}) => {
  const Icon = iconMap[icon] ?? Rocket;

  return (
    <div className="shrink-0 w-[350px] md:w-[400px] h-[280px] bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col gap-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;