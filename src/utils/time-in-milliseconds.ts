export const getTTL = (timeInMinutes: number) => Math.floor(Date.now() / 1000) + (timeInMinutes * 60)
