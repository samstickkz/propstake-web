import * as React from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  loading?: boolean;
  label?: string;
  error?: string;
  type?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, loading, type, label, error, ...props }, ref) => {
    if (loading) return <Skeleton className="w-[200px] h-3" />;
    return (
      <div className="flex flex-col ">
        {label && <Label htmlFor={label}>{label}</Label>}
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-md border border-[#efefef] outline-none bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 transition active:border-[#8E8FFA] focus:border-[#8E8FFA]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
