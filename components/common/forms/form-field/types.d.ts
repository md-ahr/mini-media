import { LucideIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  icon?: LucideIcon;
  showPasswordToggle?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export type { FormFieldProps };
