import { Token } from "@/lib/const";
import React, { FC } from "react";
import FullScreenModal from "./FullScreenModal";
import Images from "../ui/Image";
import { Button } from "../ui/button";

interface LogoCardProps extends Logo {}

const LogoCard: FC<LogoCardProps> = ({ domain, logo, name }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  return (
    <>
      <div className="bg-darkblue flex flex-col p-3 rounded-lg  ">
        <Images
          src={`https://img.logo.dev/${domain}?token=${Token}`}
          height={150}
          alt={name}
          width={150}
          onclick={() => {
            setFullScreen(true);
          }}
        />
        <div className="w-28 pt-2">
          <h2 className="text-white text-base font-semibold">{name}</h2>
          <p className="text-neutral-400 text-sm">{domain}</p>
        </div>

        <div className="h-full flex flex-col justify-end mt-2">
          <Button className="h-fit self-end text-neutral-100  bg-dodgerblue shadow-none hover:bg-lightblue duration-200 ease-linear w-full ">
            Save
          </Button>
        </div>
      </div>

      {fullScreen && (
        <FullScreenModal
          Token={Token}
          domain={domain}
          name={name}
          setFullScreen={setFullScreen}
        />
      )}
    </>
  );
};

export default LogoCard;
