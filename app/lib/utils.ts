import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper order
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 