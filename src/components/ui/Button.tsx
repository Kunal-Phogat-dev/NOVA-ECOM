import { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@/components/ui/loading/Spinner";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
          {
            "bg-accent text-accent-foreground hover:bg-accent/90": variant === "primary",
            "bg-white text-black hover:bg-white/90": variant === "secondary",
            "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent": variant === "outline",
            "hover:bg-accent/10 hover:text-accent": variant === "ghost",
            "h-9 px-4 text-xs": size === "sm",
            "h-12 px-8": size === "md",
            "h-14 px-10 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
