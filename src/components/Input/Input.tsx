import { forwardRef, HTMLProps } from "react";

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "value"> {
  label?: string;
  error?: { message: string };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <>
        {label ? (
          <label htmlFor={label} className="title headline white">
            {label}
          </label>
        ) : null}
        <input className="input" {...rest} ref={ref} />
        {error ? (
          <span className="title headline rose">{error.message}</span>
        ) : null}
      </>
    );
  }
);
