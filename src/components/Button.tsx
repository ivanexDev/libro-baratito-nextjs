import React from "react";

interface ButtonProps {
  label: string;
  style?: string;
  onClick?: () => void;
  color?: "primary" | "secondary";
}

const Button = ({ label, onClick, style, color = "primary" }: ButtonProps) => {
  const defaultStyles = {
    primary: "bg-orange-primary border-orange-primary text-white btn",
    secondary: "bg-white text-orange-primary border-orange-primary btn",
  };
  const styles = `${defaultStyles[color]} ${style}`;

  return (
    <button className={styles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
