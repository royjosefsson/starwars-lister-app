import { SwapiMovie } from "@/interfaces/movie";
import { convertToRoman } from "./convertToRoman";

export const withExtendedTitle = (x: SwapiMovie): SwapiMovie => ({
    ...x,
    title: `Episode ${convertToRoman(x.episode_id)} - ${x.title}`
})
