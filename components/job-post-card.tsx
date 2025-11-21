import { Job } from "@/app/generated/prisma/client";
import ArrowRight from "./svgs/arrow-right";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const JobPostCard = ({ job, variants }: { job: Job; variants?: Variants }) => {
  if (!job) return null;

  return (
    <Link
      href={`/careers/${job?.slug}`}
      className="p-5 bg-primary/5 rounded-xl group hover:bg-primary/10 transition-colors duration-300"
    >
      <motion.div variants={variants}>
        <header>
          <h3 className="text-2xl font-bold mb-2">{job?.title}</h3>
          <p className="text-gray-600">{job?.job_type || "Not specified"}</p>
        </header>
        <div className="flex items-center justify-between gap-5 my-4">
          <div className="h-[2px] w-full bg-gray-200" />
          <div className="bg-primary rounded-full p-2 group-hover:bg-white transition-all duration-300">
            <ArrowRight className="size-4 text-white group-hover:text-black" />
          </div>
        </div>
        <footer>
          <div
            className="text-gray-700 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: job?.description || "<p>No description available</p>",
            }}
          />
        </footer>
      </motion.div>
    </Link>
  );
};

export default JobPostCard;
