"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />

      {children}
    </>
  );
};

export default GlobalProvider;
