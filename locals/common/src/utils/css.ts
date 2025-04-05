export type LooseCSSUnit = string | number

export function cssUnit(size: LooseCSSUnit) {
  return typeof size === 'number' ? `${size}px` : size
}
