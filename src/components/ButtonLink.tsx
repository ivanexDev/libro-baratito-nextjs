import Link, { LinkProps } from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  className?: string;
  href: string;
  color?: "primary" | "secondary";
}

const ButtonLink = ({ label, href, className, color = "primary", ...rest }: ButtonProps & LinkProps) => {
  const defaultStyles = {
    primary: "bg-orange-primary border-orange-primary text-white btn",
    secondary: "bg-white text-orange-primary border-orange-primary btn",
  };

  const colorStyles = defaultStyles[color] || "";

  const combinedStyles = `${colorStyles} ${className || ""}`;

  return (
    <Link href={href} className={combinedStyles} {...rest}>
      {label}
    </Link>
  );
};

export default ButtonLink;