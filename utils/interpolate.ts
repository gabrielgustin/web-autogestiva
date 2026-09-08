export const interpolate = (progress: number, start: number, end: number, initialValue: number, finalValue: number) => {
  if (progress <= start) return initialValue
  if (progress >= end) return finalValue
  const rangeProgress = (progress - start) / (end - start)
  return initialValue * (1 - rangeProgress) + finalValue * rangeProgress
}
