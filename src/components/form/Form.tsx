import React, { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  action?: string | ((formData: FormData) => void | Promise<void>) | undefined;
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, action, children, className }) => {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        event.preventDefault(); // Prevent default form submission
        onSubmit(event);
      }}
      className={` ${className}`} // Default spacing between form fields
    >
      {children}
    </form>
  );
};

export default Form;
