const Heading = ({ title, className }: { title: string, className?: string }) => {
  return (
    <div className="flex gap-2 items-center ">
      <div className="bg-primary p-2" />
      <h2 className={`text-xl font-bold uppercase ${className}`}>{title}</h2>
    </div>
  );
};

export default Heading;
