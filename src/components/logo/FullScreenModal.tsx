/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";

interface FullScreenModalProps {
  setFullScreen: (value: boolean) => void;
  domain: string;
  name: string;
  Token: string;
}

const FullScreenModal: FC<FullScreenModalProps> = ({
  Token,
  domain,
  name,
  setFullScreen,
}) => {
  return (
    <div
      className="fixed inset-0 w-full bg-sky-800 bg-opacity-35"
      onClick={() => {
        setFullScreen(false);
      }}
    >
      <img
        src={`https://img.logo.dev/${domain}?token=${Token}&size=500`}
        alt={name}
        className="w-full h-full z-30 object-contain"
      />
    </div>
  );
};

export default FullScreenModal;
