import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClickButton: () => void;
}

const Alert = ({ children, onClickButton }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible " role="alert">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClickButton}
      ></button>
    </div>
  );
};

export default Alert;
