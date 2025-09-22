// lib/cn.ts

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to combine Tailwind CSS classes with conditional logic.
 * It merges conflicting classes intelligently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
