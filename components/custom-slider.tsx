"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SalarySliderProps {
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
  label?: string;
}

export function CustomSlider({
  defaultValue = [200],
  min = 0,
  max = 300,
  step = 10,
  onValueChange,
  className,
  label
}: SalarySliderProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={cn("flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4", className)}>
      {/* Label Section */}
      <span className="min-w-fit text-base font-medium text-muted-foreground">
        {label}
      </span>

      {/* Slider Section */}
      <div className="flex flex-1 items-center gap-4">
        <Slider
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={handleValueChange}
          className="flex-1 cursor-pointer"
        />
        
        {/* Value Display Section */}
        <span className="min-w-[4rem] text-right text-base font-medium text-muted-foreground">
          ₹{value[0]}k+
        </span>
      </div>
    </div>
  );
}