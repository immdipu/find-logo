"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LogoFilter = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <div className="mt-10">
      <div className="flex focus-within:border-sky-700 items-center border rounded-lg  overflow-hidden border-sky-900 bg-darkblue ">
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
    </div>
  );
};

export default LogoFilter;
