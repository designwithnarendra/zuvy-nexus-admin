import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg[class*='lucide-plus']]:transition-transform [&_svg[class*='lucide-plus']]:duration-200 hover:[&_svg[class*='lucide-plus']]:rotate-90 [&_svg.lucide-edit]:transition-transform [&_svg.lucide-edit]:duration-150 hover:[&_svg.lucide-edit]:scale-125 [&_svg.lucide-square-pen]:transition-transform [&_svg.lucide-square-pen]:duration-150 hover:[&_svg.lucide-square-pen]:scale-125 [&_svg.lucide-pencil]:transition-transform [&_svg.lucide-pencil]:duration-150 hover:[&_svg.lucide-pencil]:scale-125 [&_svg.lucide-trash-2]:transition-transform [&_svg.lucide-trash-2]:duration-150 hover:[&_svg.lucide-trash-2]:scale-125 [&_svg.lucide-trash]:transition-transform [&_svg.lucide-trash]:duration-150 hover:[&_svg.lucide-trash]:scale-125 hover:-translate-y-px hover:shadow-soft active:scale-[0.97] active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-mid",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-primary-light hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary-light hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        icon: "h-12 w-12",
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
