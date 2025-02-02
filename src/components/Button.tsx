import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: "primary" | "secondary";
  onClick: () => void;
}

const Button = ({ label, onClick, style, color = "primary", ...rest }: ButtonProps) => {
  const defaultStyles = {
    primary: "bg-orange-primary border-orange-primary text-white btn",
    secondary: "bg-white text-orange-primary border-orange-primary btn",
  };
  const styles = `${defaultStyles[color]} ${style}`;

  return (
    <button className={styles} onClick={onClick} {...rest}>
      {label}
    </button>
  );
};

export default Button;
