import { API_KEY, Token } from "@/lib/const";
import React, { FC } from "react";
import FullScreenModal from "./FullScreenModal";
import Images from "../ui/Image";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import clsx from "clsx";
interface LogoCardProps extends Logo {}
const LogoCard: FC<LogoCardProps> = ({ domain, icon, name, brandId }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [staus, setStaus] = React.useState<
    "BEGIN" | "FETCHING" | "UPLOADING" | null
  >(null);
  const [download, setDownload] = React.useState(false);

  const handleUpload = async () => {
    setStaus("BEGIN");
    try {
      setStaus("FETCHING");
      const brand = await getIcon(brandId);
      if (!brand) {
        toast.error("Failed to Upload Logo" || "Failed to Upload Logo");
      }
      const file = await getImageFile(brand?.logos[0].formats[0].src!);
      const newform = new FormData();
      newform.append("file", file);
      newform.append("domain", domain);
      newform.append("name", brand?.name || "no name");

      setStaus("UPLOADING");
      const response = await axios.post("/api/image", newform, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.status === "success") {
        toast.success("Logo Uploaded Successfully");
      }

      if (response?.data?.status === "error") {
        toast.error(response?.data?.message || "Failed to Upload Logo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload Logo");
    } finally {
      setStaus(null);
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

  const getImageFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "logo.png", { type: "image/png" });
  };

  const downloadImage = async () => {
    setDownload(true);
    try {
      const brand = await getIcon(brandId);
      const file = await getImageFile(brand?.logos[0].formats[0].src!);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = "logo.png";
      a.click();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Download Logo");
    } finally {
      setDownload(false);
    }
  };

  return (
    <>
      <div className="bg-darkblue flex flex-col p-3 rounded-lg  ">
        <Images
          src={icon}
          height={150}
          alt={name}
          width={200}
          onclick={() => {
            setFullScreen(true);
          }}
        />
        <div className="w-28 pt-2">
          <h2 className="text-white text-base font-semibold">{name}</h2>
          <p className="text-neutral-400 text-sm">{domain}</p>
        </div>

        <div className="h-full flex flex-col justify-end mt-2">
          <div className="flex gap-2">
            <Button
              disabled={!!staus}
              onClick={handleUpload}
              className="h-fit self-end text-neutral-100 active:scale-90 duration-150 transition-all ease-linear  bg-dodgerblue shadow-none hover:bg-lightblue duration-200 ease-linear w-full "
            >
              {staus === "FETCHING"
                ? "Fetching..."
                : staus === "UPLOADING"
                ? "Uploading..."
                : "Upload Logo"}
            </Button>
            <Button
              title="Download"
              onClick={downloadImage}
              className=" bg-dodgerblue h-9 hover:bg-lightblue active:scale-90 duration-150 transition-all ease-linear"
            >
              <ArrowDown
                className={clsx("text-white", download ? "animate-ping" : "")}
              />
            </Button>
          </div>
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
