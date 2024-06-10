/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import LogoCard from "../logo/LogoCard";
import Loader from "../ui/Loader";

const LogoFilter = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [logos, setLogos] = React.useState<Logo[] | null>(null);

  const searchLogos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://search.logo.dev/?query=${searchTerm}`
      );
      setLogos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchLogos();
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex focus-within:border-sky-700 items-center border rounded-lg  overflow-hidden border-sky-900 bg-darkblue ">
          <Search className="text-neutral-400 ml-3 size-5" />
          <Input
            type="search"
            placeholder="Search for logos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-lg bg-transparent  focus:outline-none   h-10 text-white  rounded-none border-transparent "
          />
          <Button
            type="submit"
            className=" w-fi px-2t h-10 bg-blue text-white"
            onClick={() => console.log("Search for", searchTerm)}
          >
            Search
          </Button>
        </div>
      </form>
      <section className="flex w-full flex-wrap mt-9 gap-3">
        {isLoading && (
          <div className="mt-36 w-full mx-auto ">
            <Loader />
          </div>
        )}

        {!isLoading && logos && logos?.length === 0 && (
          <p className="mt-20 text-center w-full text-base text-neutral-400">
            No logos found, try another search term
          </p>
        )}

        {!isLoading &&
          logos &&
          logos.map((logo) => <LogoCard key={logo.domain} {...logo} />)}

        {!isLoading && !logos && (
          <p className="mt-20 text-center w-full text-base text-neutral-400">
            Search for logos...
          </p>
        )}

        <a href="https://logo.dev">Logos provided by Logo.dev</a>
      </section>
    </div>
  );
};

export default LogoFilter;
