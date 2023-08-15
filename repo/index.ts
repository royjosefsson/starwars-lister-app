import { OMDBAPI_URL, OMDBAPI_API_KEY, SWAPI_URL } from "@/data/site-settings"
import { InitialDataResponse } from "@/interfaces/initialDataResponse"
import { JoinedMovie, OmdbapiMovie, SwapiMovie } from "@/interfaces/movie"
import { withExtendedTitle } from "@/utils/withExtendedTitle"

const Swapi = {
    movies: {
        fetch: async (): Promise<SwapiMovie[]> => {
            const response = await fetch(SWAPI_URL)
            const data = await response.json()
            const movies: SwapiMovie[] = data.results.map(withExtendedTitle)
            return movies
        }
    }
}

const Omdbapi = {
    movies: {
        fetch: async (title: string): Promise<OmdbapiMovie> => {
            const response = await fetch(`${OMDBAPI_URL}/?apikey=${OMDBAPI_API_KEY}&t=${encodeURIComponent(title)}`)
            const data: OmdbapiMovie = await response.json()
            return data
        }
    }
}

const getPromises = async (swapiMovie: SwapiMovie): Promise<JoinedMovie> => {
    const omdbapiMovie = await Omdbapi.movies.fetch(swapiMovie.title)
    const joinedMovie: JoinedMovie = { swapi: swapiMovie, omdbapi: omdbapiMovie, }
    return joinedMovie
}

const JoinedMovies = {
    movies: {
        fetch: async (): Promise<InitialDataResponse> => {
            const swapiMovies = await Swapi.movies.fetch();
            const movies = await Promise.all(swapiMovies.map(getPromises));

            const defaultSortOrder = movies.map(x => x.swapi.episode_id)
            return { movies, defaultSortOrder };
        },
    },
}

const Repo = { JoinedMovies }

export { Repo }