export const convertToRoman = (number: number) => {
    const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[number];
}