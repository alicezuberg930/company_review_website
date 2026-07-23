import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const getScoreClasses = (score: number) => {
  if (score > 7.5) {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200/80 border-emerald-500'
  }
  if (score > 5) {
    return 'bg-amber-50 text-amber-700 ring-amber-200/80 border-amber-500'
  }
  return 'bg-rose-50 text-rose-700 ring-rose-200/80 border-rose-500'
}

export { cn, getScoreClasses }
