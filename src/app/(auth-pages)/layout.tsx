import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background-pattern h-full w-full flex justify-center items-center">
      <div className="bg-white w-[500px] p-8 rounded-lg">
      {children}
      </div>
    </div>
  );
}
