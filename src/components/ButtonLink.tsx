import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  style?: string;
  href: string;
  color?: "primary" | "secondary";
}

const ButtonLink = ({ label, href, style, color = "primary" }: ButtonProps) => {
  const defaultStyles = {
    primary: "bg-orange-primary border-orange-primary text-white btn",
    secondary: "bg-white text-orange-primary border-orange-primary btn",
  };
  const styles = `${defaultStyles[color]} ${style}`;

  return (
    <Link href={href} className={styles} >
      {label}
    </Link>
  );
};

export default ButtonLink;