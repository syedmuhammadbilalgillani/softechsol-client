import { cn } from "@/lib/utils";

const ArrowRight = ({ className }: { className?: string }) => {
  return (
    <svg
      width="21"
      height="22"
      className={cn("size-4 text-black", className)}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8586 3.50854L1.16797 19.8814"
        stroke="currentColor"
        strokeWidth="2.33898"
        strokeLinecap="round"
      />
      <path
        d="M4.15625 1.46256C4.15625 1.46256 16.1826 0.404688 18.0077 2.30909C19.8329 4.21349 18.8188 16.7628 18.8188 16.7628"
        stroke="currentColor"
        strokeWidth="2.33898"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
