"use client";
import { handleClick } from "./footer";

const PrivacyBtn = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="mailto:privacy@softechsol.com"
      onClick={handleClick("privacy@softechsol.com")}
      className="text-primary hover:underline cursor-pointer relative z-10"
    >
      privacy@softechsol.com
    </a>
  );
};

export default PrivacyBtn;
