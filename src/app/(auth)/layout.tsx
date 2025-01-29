import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background-pattern flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md min-w-[600px] min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
