"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "./types";

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  showPasswordToggle = false,
  className,
  disabled = false,
  required = false,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-1", className)}>
          <FormLabel className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="-ml-1 text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              )}
              <Input
                {...field}
                type={isPasswordField && showPassword ? "text" : type}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "h-12 text-base transition-colors duration-200",
                  "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                  fieldState.error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500",
                  Icon && "pl-10",
                  isPasswordField && showPasswordToggle && "pr-12",
                  !Icon && isPasswordField && showPasswordToggle && "pr-12",
                  !Icon && !(isPasswordField && showPasswordToggle) && "px-4"
                )}
              />
              {isPasswordField && showPasswordToggle && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className="-mt-1 text-sm" />
        </FormItem>
      )}
    />
  );
}
