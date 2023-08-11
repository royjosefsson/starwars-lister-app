import { OMDBAPI_URL, OMDBAPI_API_KEY, SWAPI_URL } from "@/data/site-settings"
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
    data: {
        fetch: async (title: string): Promise<OmdbapiMovie> => {
            const response = await fetch(`${OMDBAPI_URL}/?apikey=${OMDBAPI_API_KEY}&t=${encodeURIComponent(title)}`)
            const data: OmdbapiMovie = await response.json()
            return data
        }
    }
}

const getPromises = async (swapiMovie: SwapiMovie): Promise<JoinedMovie> => {
    const omdbapiMovie = await Omdbapi.data.fetch(swapiMovie.title)
    const joinedMovie: JoinedMovie = { swapi: swapiMovie, omdbapi: omdbapiMovie, }
    return joinedMovie
}

const joinedMovies = {
    movies: {
        fetch: async (): Promise<JoinedMovie[]> => {
            const swapiMovies = await Swapi.movies.fetch();
            const joinedMoviesData = await Promise.all(swapiMovies.map(getPromises));
            return joinedMoviesData;
        },
    },
}

const Repo = { joinedMovies }

export { Repo }