import { OMDBAPI_URL, OMDBAPI_API_KEY, SWAPI_URL } from "@/data/site-settings"
import { JoinedMovie, OmdbapiMovie, SwapiMovie } from "@/interfaces/movie"
import { convertToRoman } from "@/utils/convertToRoman"

interface MoviesResponse {
    results: SwapiMovie[]
}

const Swapi = {
    movies: {
        fetch: async (): Promise<SwapiMovie[]> => {
            const response = await fetch(SWAPI_URL)
            const data: MoviesResponse = await response.json()
            return data.results.map(x => ({
                ...x,
                title: `Episode ${convertToRoman(x.episode_id)} - ${x.title}`
            }))
        }
    }
}

const Omdbapi = {
    data: {
        fetch: async (title: string): Promise<OmdbapiMovie> => {
            const response = await fetch(`${OMDBAPI_URL}/?apikey=${OMDBAPI_API_KEY}&t=${encodeURIComponent(title)}`)
            const data = await response.json()
            return data
        }
    }
}

const getPromises = async (swapiMovie: SwapiMovie) => {
    const omdbapiMovie = await Omdbapi.data.fetch(swapiMovie.title)
    return {
        swapi: swapiMovie,
        omdbapi: omdbapiMovie,
    }
}

const joinedMovies = {
    movies: {
        fetch: async (): Promise<JoinedMovie[]> => {
            const movies = await Swapi.movies.fetch();
            const joinedMoviesData = await Promise.all(movies.map(getPromises));
            return joinedMoviesData;
        },
    },
}

const Repo = { joinedMovies }

export { Repo }