import LogoFilter from "@/components/logofilter/LogoFilter";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className=" mt-3 h-14">
        <Link href="/" className=" h-full flex items-center">
          <Image
            src={
              "https://assets-global.website-files.com/64260837197028b57235a95f/6435ec819376ef2a1ab54d93_logo-light-v-padded.svg"
            }
            alt="Ampersand"
            width={185}
            height={12}
          />
        </Link>
      </div>
      <section className="mt-10 text-lightblue">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white dark:text-gray-50">
            Download Company Logos
          </h1>
          <p className="mt-3 text-lg text-faintblue dark:text-gray-400">
            Search for and download high-quality logos for your business.
          </p>
        </div>
      </section>
      <LogoFilter />
    </div>
  );
}
