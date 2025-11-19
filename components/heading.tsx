import React from "react";

const Heading = ({
  title,
  className,
  as,
}: {
  title: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  const Element = as || "h2" as keyof React.JSX.IntrinsicElements;
  return (
    <div className="flex gap-2 items-center ">
      <div className="bg-primary p-2" />
      <Element className={`text-xl font-bold uppercase ${className}`}>{title}</Element>
    </div>
  );
};
export default Heading;