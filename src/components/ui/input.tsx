import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  label?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, loading, type, label, defaultValue, error, ...props }, ref) => {
    if (loading) return <Skeleton className="w-[200px] h-3" />;
    return (
      <div className="flex flex-col">
        {label && (
          <Label htmlFor={label} className="font-spline">
            {label}
          </Label>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          className={cn(
            "w-full rounded-none border font-inter bg-[#F9FAFC] px-5 py-3 text-black outline-none transition active:border-black disabled:cursor-default text-base border-[#D0D5DD] disabled:bg-white focus:border-black",
            {
              "border-red-500": error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
