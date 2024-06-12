import { Token } from "@/lib/const";
import React, { FC } from "react";
import FullScreenModal from "./FullScreenModal";
import Images from "../ui/Image";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface LogoCardProps extends Logo {}

const LogoCard: FC<LogoCardProps> = ({ domain, icon, name }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/image", {
        domain,
        name,
        Token,
      });

      if (response?.data?.status === "success") {
        toast.success("Logo Uploaded Successfully");
      }

      if (response?.data?.status === "error") {
        toast.error(response?.data?.message || "Failed to Upload Logo");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload Logo");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-darkblue flex flex-col p-3 rounded-lg  ">
        <Images
          src={icon}
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
          <Button
            disabled={loading}
            onClick={handleUpload}
            className="h-fit self-end text-neutral-100  bg-dodgerblue shadow-none hover:bg-lightblue duration-200 ease-linear w-full "
          >
            {loading ? "Uploading..." : "Upload"}
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
