import Image from "next/image";

interface ServiceCategoryCardProps {
  name: string;
  description: string | null;
  services: Array<{
    id: number | string;
    title: string;
    [key: string]: unknown;
  }>;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

const ServiceCategoryCard = ({
  name,
  description,
  services,
  image,
}: ServiceCategoryCardProps) => {
  return (
    <div className="">
      {/* Content Section */}
      <div className="py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Header Grid */}
        <div className="grid md:grid-cols-2 place-items-start w-full  gap-8 md:gap-12">
          {/* Title and Description */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl  font-bold text-gray-900 uppercase tracking-tight leading-tight">
              {name}
            </h2>
            <p className="text-base md:text-lg  text-gray-600 leading-relaxed">
              {description || "No description available."}
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-4 md:space-y-6">
            <div className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide">
              What&apos;s Included
            </div>
            <ul className="space-y-3 list-disc ">
              {services.map((service) => (
                <li
                  key={service.id}
                  className=" text-gray-700 ml-4 text-base leading-relaxed"
                >
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Image Section */}
      {image && (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-100">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.altText || name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority={false}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryCard;
