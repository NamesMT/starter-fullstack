import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export { cssUnit } from '@local/common'
export type { LooseCSSUnit } from '@local/common'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
