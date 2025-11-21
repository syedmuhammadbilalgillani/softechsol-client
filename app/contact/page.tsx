import ContactForm from "@/components/contact-form";
import Heading from "@/components/heading";
import LocationIcon from "@/components/svgs/location";
import { fetchCategoriesWithServices } from "@/lib/apis";
import logger from "@/lib/logger";
import Image from "next/image";

const ContactUsPage = async () => {
  const categories = await fetchCategoriesWithServices();
  logger.info(categories, "categories");
  return (
    <>
      <header
        className="relative min-h-[85vh] max-h-[90vh] h-[85vh] flex items-end"
        style={{
          backgroundImage: "url('/home_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="banner"
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-[#001E3A]/80 " />

        <div className="relative flex flex-col justify-between items-center w-full gap-[9dvh] z-10 px-4 md:px-8 text-white mb-10">
          <section
            aria-labelledby="contact-us-title"
            className="space-y-3 self-start"
          >
            <h1 id="contact-us-title" className="sr-only">
              Contact Us - SoftechSol
            </h1>
            <Heading
              as="div"
              title="Unlock Your Potential"
              //   className=""
            />
            <h2 className="text-4xl md:text-5xl font-semibold">Get in Touch</h2>
            <p className="text-lg md:text-xl">
              We'd love to hear from you. Get in touch with us for inquiries,
              support, or collaborations.
            </p>
          </section>
          <section className="items-center">
            <div
              aria-labelledby="office-locations"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
            >
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="bg-primary rounded-full p-2 w-fit">
                  <LocationIcon />
                </div>
                <h3 className="text-xl font-semibold text-black">
                  Main Office
                </h3>
                <address className="text-gray-500">
                  123 Main St, Anytown, USA
                  <br />
                  <a
                    href="mailto:info@softechsol.com"
                    className="text-primary hover:underline"
                  >
                    info@softechsol.com
                  </a>
                </address>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="bg-primary rounded-full p-2 w-fit">
                  <LocationIcon />
                </div>
                <h3 className="text-xl font-semibold text-black">
                  Regional Office
                </h3>
                <address className="text-gray-500">
                  456 Elm St, Somecity, USA
                  <br />
                  <a
                    href="mailto:support@softechsol.com"
                    className="text-primary hover:underline"
                  >
                    support@softechsol.com
                  </a>
                </address>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="bg-primary rounded-full p-2 w-fit">
                  <LocationIcon />
                </div>

                <h3 className="text-xl font-semibold text-black">
                  Sales Office
                </h3>
                <address className="text-gray-500">
                  789 Oak St, Yourcity, USA
                  <br />
                  <a
                    href="mailto:sales@softechsol.com"
                    className="text-primary hover:underline"
                  >
                    sales@softechsol.com
                  </a>
                </address>
              </div>
            </div>
          </section>
        </div>
      </header>
      <section className="bg-gray-300 py-10">
        <div className="bg-white grid grid-cols-2 main p-10 rounded-xl gap-10 place-items-center">
          <div className="bg-darkblue rounded-xl p-5">
            <ContactForm services={categories} />
          </div>
          <div className="space-y-2">
            <Heading title="Contact Us" />

            <p className="text-">
              We'd love to hear from you. Get in touch with us for inquiries,
              support, or collaborations.
            </p>
            <Image
              src={`/contact.jpg`}
              alt="Contact Us"
              width={500}
              height={500}
              className="rounded-xl shadow-xl h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
