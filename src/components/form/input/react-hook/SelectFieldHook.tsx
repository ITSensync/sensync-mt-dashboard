import React, { forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: boolean;
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, hint, error, disabled, ...props }, ref) => {
    let selectClasses =
      "h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 " +
      className;

    if (disabled) {
      selectClasses += " text-gray-400 border-gray-300 cursor-not-allowed";
    } else if (error) {
      selectClasses += " border-red-500";
    } else {
      selectClasses += " border-gray-300";
    }

    return (
      <div>
        <select
          ref={ref}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {children}
        </select>

        {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
