import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectNativeProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    containerClassName?: string
}

export const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
    ({ className, children, containerClassName, ...props }, ref) => {
        return (
            <div className={cn("relative inline-block w-full", containerClassName)}>
                <select
                    className={cn(
                        "flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-8",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
        )
    }
)
SelectNative.displayName = "SelectNative"
