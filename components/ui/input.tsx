import * as React from "react";
import { cn } from "@/lib/utils";

// Define interface for Input props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Forward ref for the input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

// Set displayName for React DevTools
Input.displayName = "Input";

export { Input };
