import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export function Loader({ size = "medium", text }: LoaderProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}
