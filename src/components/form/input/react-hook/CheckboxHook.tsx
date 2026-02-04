import React, {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", disabled, ...props }, ref) => {
    return (
      <label
        className={`flex items-center space-x-3 group cursor-pointer ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        <div className="relative w-5 h-5">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={`w-5 h-5 peer appearance-none cursor-pointer 
              border border-gray-300 rounded-md
              checked:bg-brand-500 checked:border-transparent
              dark:border-gray-700 disabled:opacity-60
              ${className}`}
            {...props}
          />

          {/* check icon pakai peer biar tidak perlu checked prop */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {label && (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
