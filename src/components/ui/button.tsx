import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-500/20",
        outline:
          "border border-slate-300 text-[#4A7FA7] hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
        secondary:
          "bg-[#B3CFE5] text-[#0A1931] hover:bg-[#B3CFE5]/80 dark:bg-slate-800 dark:text-[#B3CFE5] dark:hover:bg-slate-700 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        download:
          "bg-slate-100 text-[#4A7FA7] hover:bg-[#4A7FA7] hover:text-white dark:bg-[#B3CFE5]/10 dark:text-[#B3CFE5] dark:hover:bg-[#B3CFE5] dark:hover:text-[#0A1931] shadow-sm transition-all duration-200",
        print:
          "border border-[#B3CFE5] text-[#0A1931] hover:bg-[#B3CFE5] dark:border-slate-800 dark:text-[#F6FAFD] dark:hover:bg-slate-700 shadow-sm transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
