import { GalleryItem, Team } from "@/app/generated/prisma";
import ImageWrapper from "./image-wrapper";
import { Linkedin } from "lucide-react";

const TeamCard = ({
  data,
}: {
  data: Team & { featured_image: GalleryItem };
}) => {
  return (
    <article className="mb-6">
      <ImageWrapper
        src={data?.featured_image?.url || ""}
        alt={data?.title || ""}
        width={500}
        isZoom={false}
        height={500}
        className="rounded-xl h-[350px] object-cover"
      />
      <div className="flex justify-between gap-5 items-center mt-2">
        <header>
          <h3 className="text-2xl font-bold">{data?.title || ""}</h3>
          <p>{data?.position || ""}</p>
        </header>
        <a
          href={data?.linkedinUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>
      </div>
    </article>
  );
};

export default TeamCard;
