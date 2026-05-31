import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Fusionne des classes Tailwind (style shadcn) : clsx pour la conditionnalité,
 * tailwind-merge pour résoudre les conflits (dernière classe gagnante).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
