import React from "react";

interface Props {
  text: string;
  color?: "primary" | "secondary" | "danger";
  onClickButton: () => void;
}

const Button = ({ text, color = "primary", onClickButton }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={onClickButton}
    >
      {text}
    </button>
  );
};

export default Button;
