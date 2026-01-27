import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";
import { Card } from "./ui/card";
import { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  /**
   * The icon to display. Defaults to a generic 'FileQuestion' icon if not provided.
   * Pass in a rendered icon component, e.g., <Search className="h-12 w-12" />
   */
  icon?: ReactNode;
  /**
   * The buttons or links to render below the text.
   * Wrap multiple buttons in a Fragment (<>...</>) or a div.
   */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  // Default icon if none is provided
  const renderedIcon = icon || (
    <FileQuestion className="h-12 w-12 text-muted-foreground/80" />
  );

  return (
    <div
      className={cn(
        // min-h-[50vh] ensures it centers nicely but doesn't force full screen height if inside another container
        "flex items-center justify-center min-h-[50vh] p-6",
        className
      )}
    >
      <Card className="w-full max-w-md p-8 text-center shadow-sm border-dashed border-2">
        <div className="flex flex-col items-center gap-6">
          {/* Icon Visual Area */}
          <div className="relative">
            {/* A subtle generic color blur background */}
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl" />
            <div className="relative bg-background rounded-full p-4 ring-1 ring-border/50 shadow-sm">
              {renderedIcon}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            {description && (
              <p className="text-base text-muted-foreground max-w-sm mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons Area */}
          {action && (
            <div className="mt-2 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              {action}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}