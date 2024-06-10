"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import failedImage from "@/assets/FailedImage.png";
import { cn } from "@/lib/utils";

interface ImagesProps {
  src: string;
  width: number;
  height: number;
  alt: string | undefined;
  ImageWidth?: number | "full";
  Imageheight?: number | "full";
  className?: string;
  onclick?: () => void;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const Images: React.FC<ImagesProps> = ({
  src,
  width,
  height,
  alt,
  onclick,
  className,
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);
  return (
    <Image
      onClick={onclick}
      src={imgSrc}
      width={width}
      height={height}
      alt={alt || "logo iamge"}
      onLoad={(result) => {
        if (result.currentTarget.src !== failedImage.src) {
          setImgSrc(src);
        }
      }}
      onError={() => {
        console.log("error occured");
        setImgSrc(failedImage);
      }}
      className={cn(
        "select-none hover:scale-105 cursor-pointer transition-transform duration-150 ease-in ",
        className
      )}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(failedImage.src)}`}
    />
  );
};

export default Images;
