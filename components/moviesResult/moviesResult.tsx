import { JoinedMovie } from "@/interfaces/movie"
import Image from "next/image"
import { Stars } from "@/components/stars"
import { showPercentage } from "@/utils/showPercentage"
import { KeyboardEvent } from "react"

interface MoviesResultProps {
    allMovies: JoinedMovie[]
    selectedMovie: JoinedMovie | undefined
    onMovieChange: (movie: JoinedMovie) => void
}

const MoviesResult = ({ allMovies, selectedMovie, onMovieChange }: MoviesResultProps) => {

    const _onMovieChange = (movie: JoinedMovie) => () => {
        onMovieChange(movie)
    }

    const renderInformationContent = () => {
        if (!selectedMovie) {
            return (
                <h1>Select a movie!</h1>
            )
        }

        return (
            <>
                <h1 dangerouslySetInnerHTML={{ __html: selectedMovie.swapi.title }} />
                <section className="movies-result__information__top-section">
                    <Image className="movies-result__information__top-section__image" src={selectedMovie.omdbapi.Poster} height={234} width={150} alt={selectedMovie.swapi.title} />
                    <p className="movies-result__information__top-section__opening-crawl" dangerouslySetInnerHTML={{ __html: selectedMovie.swapi.opening_crawl }} />
                </section>
                <p dangerouslySetInnerHTML={{ __html: `Directed by ${selectedMovie.swapi.director}` }} />
                <div className="movies-result__information__top-section__average-rating">
                    Average rating: <Stars amount={Math.floor(Number(selectedMovie.omdbapi.imdbRating))} />
                </div>
                <ul className="movies-result__information__top-section__ratings">
                    {selectedMovie.omdbapi.Ratings.map(x => (
                        <li
                            key={x.Source}
                            className="movies-result__information__top-section__ratings__li">
                            {x.Source} {showPercentage(x.Value)}
                        </li>
                    ))}
                </ul>
            </>
        )
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
                <article className="movies-result__information">
                    {renderInformationContent()}
                </article>
            </main>
        </div>
    )
}

export default MoviesResult