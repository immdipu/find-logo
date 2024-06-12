import { API_KEY, Token } from "@/lib/const";
import React, { FC } from "react";
import FullScreenModal from "./FullScreenModal";
import Images from "../ui/Image";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface LogoCardProps extends Logo {}

const LogoCard: FC<LogoCardProps> = ({ domain, icon, name, brandId }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async () => {
    setLoading(true);
    try {
      const brand = await getIcon(brandId);
      if (!brand) {
        toast.error("Failed to Upload Logo" || "Failed to Upload Logo");
      }

      const response = await axios.post("/api/image", {
        logoUrl: brand?.logos[0].formats[0].src,
        name: brand?.name,
        domain: brand?.domain,
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

  const getIcon = async (domainId: string): Promise<Brand | null> => {
    const response = await axios.get(
      `https://api.brandfetch.io/v2/brands/${domainId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response?.data || null;
  };

  // const extractImage = async (url: string) => {
  //   const res = await fetch("https://api.extract.pics/v0/extractions", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ url: url }),
  //   });

  //   const json = await res.json();
  //   return image;
  // };

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
