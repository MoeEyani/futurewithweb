import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex relative min-h-[70px]", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineSeparator.displayName = "TimelineSeparator";

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  variant?: "filled" | "outlined" | "standard";
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, color = "#4E89AE", variant = "standard", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-4 w-4 rounded-full z-10",
          {
            "border-2": variant === "outlined",
            "shadow-sm": variant === "standard",
            "animate-pulse": variant === "outlined"
          },
          className
        )}
        style={{
          backgroundColor: variant === "outlined" ? "transparent" : color,
          borderColor: variant === "outlined" ? color : undefined,
        }}
        {...props}
      />
    );
  }
);
TimelineDot.displayName = "TimelineDot";

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, color = "#e2e8f0", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-0.5 grow my-1", className)}
        style={{ backgroundColor: color }}
        {...props}
      />
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 pt-0.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
};