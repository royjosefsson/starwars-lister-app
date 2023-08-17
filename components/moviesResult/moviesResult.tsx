import { JoinedMovie } from "@/interfaces/movie"
import { Stars } from "@/components/stars"
import { KeyboardEvent } from "react"
import { RenderInformationContent } from "@/components/moviesResult/components"

interface MoviesResultProps {
    allMovies: JoinedMovie[]
    selectedMovie: JoinedMovie | undefined
    onMovieChange: (movie: JoinedMovie) => void
}

const MoviesResult = ({ allMovies, selectedMovie, onMovieChange }: MoviesResultProps) => {

    const _onMovieChange = (movie: JoinedMovie) => () => {
        onMovieChange(movie)
    }

    const handleOnKeyDown = (movie: JoinedMovie) => (e: KeyboardEvent) => {
        if (e.key !== 'Enter') {
            return
        }
        onMovieChange(movie)
    }

    return (
        <div className="movies-result container">
            <main className="movies-result__content">
                <ul className="movies-result__list">
                    {allMovies.map((movie, i) => (
                        <li
                            tabIndex={i + 8}
                            onKeyDown={handleOnKeyDown(movie)}
                            key={movie.swapi.episode_id}
                            className="movies-result__list__li"
                            onClick={_onMovieChange(movie)}>
                            <div className="movies-result__list__li__content">
                                <div className="movies-result__list__li__content__left-side">
                                    <span className="movies-result__list__li__content__episode">Episode {movie.swapi.episode_id}</span>
                                    <span className="movies-result__list__li__content__title" dangerouslySetInnerHTML={{ __html: movie.swapi.title }} />
                                </div>
                                <div className="movies-result__list__li__content__right-side">
                                    <Stars amount={Math.floor(Number(movie.omdbapi.imdbRating))} />
                                    <span className="movies-result__list__li__content__year">{movie.swapi.release_date}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <RenderInformationContent selectedMovie={selectedMovie} />
            </main>
        </div>
    )
}

export default MoviesResult