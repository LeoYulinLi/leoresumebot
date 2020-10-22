
export function sampleOne<T>(options: T[]): T {
  const index = Math.floor(Math.random() * options.length)
  return options[index]
}
