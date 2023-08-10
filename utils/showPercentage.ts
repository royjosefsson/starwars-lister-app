export const showPercentage = (value: string) => {
    if (value.includes("%")) {
        return value
    }
    const [score, total] = value.split("/")
    return `${Math.round(Number(score) / Number(total) * 100)}%`
}