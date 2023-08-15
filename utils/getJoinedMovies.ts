import { JoinedMovie, SwapiMovie } from "@/interfaces/movie"
import { Repo } from "@/repo"

export const getJoinedMovie = async (swapiMovie: SwapiMovie): Promise<JoinedMovie> => {
    const omdbapiMovie = await Repo.Omdbapi.movies.fetch(swapiMovie.title)
    const joinedMovie: JoinedMovie = { swapi: swapiMovie, omdbapi: omdbapiMovie, }
    return joinedMovie
}