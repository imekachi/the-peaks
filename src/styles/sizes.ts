export const SPACING_BASE_FACTOR = 8

export const spacing = (...factors: (number | string)[]): string =>
  factors
    .map((factor) => {
      // If it's already a string, it might contains unit, we should just return it as-is
      if (typeof factor === 'string') return factor
      // If it's a number, then multiply by base factor and attach "px" unit
      return `${factor * SPACING_BASE_FACTOR}px`
    })
    .join(' ')
