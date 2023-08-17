import { Stars } from "@/components/stars"
import { JoinedMovie } from "@/interfaces/movie"
import { showPercentage } from "@/utils/showPercentage"
import Image from "next/image"

interface RenderInformationContent {
    selectedMovie: JoinedMovie | undefined
}

const RenderInformationContent = ({ selectedMovie }: RenderInformationContent) => {
    if (!selectedMovie) {
        return (
            <article className="movies-result__information">
                <h1>Select a movie!</h1>
            </article>
        )
    }

    return (
        <article className="movies-result__information">
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
        </article>
    )
}

export default RenderInformationContent