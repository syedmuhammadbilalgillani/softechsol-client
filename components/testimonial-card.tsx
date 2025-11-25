import React from "react";
import ImageWrapper from "./image-wrapper";

interface TestimonialCardProps {
  name: string;
  designation: string;
  description: string;
  rating: number;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  designation,
  description,
  rating,
  image,
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            ★
          </span>
        ))}
        {hasHalfStar && <span className="text-yellow-400 text-lg">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-lg">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="shrink-0 w-[350px] md:w-[400px] bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-[300px] flex flex-col justify-between">
      <div>
        <div className="mb-4">{renderStars(rating)}</div>
        <p className="text-gray-700 leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <ImageWrapper
            src={image}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
            
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
