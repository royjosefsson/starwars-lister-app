import { Layout } from "@/components/layout"
import { MoviesResult } from "@/components/moviesResult"
import { REVALIDATE } from "@/data/site-settings"
import { SortBy } from "@/enums/sortBy"
import { JoinedMovie } from "@/interfaces/movie"
import { Repo } from "@/repo"
import { withHighlightedWords } from "@/utils/withHighlightedWords"
import { sort } from "@/utils/sort"
import { ChangeEvent, useState } from "react"

let timeout: NodeJS.Timeout

interface HomeProps {
  movies: JoinedMovie[]
  defaultSortOrder: number[]
}

const Home = ({ movies, defaultSortOrder }: HomeProps) => {
  const [allMovies, setAllMovies] = useState<JoinedMovie[]>(movies)
  const [selectedMovie, setSelectedMovie] = useState<JoinedMovie | undefined>(undefined)

  const onSearch = (searchPhrase: string) => {
    const filterRegex = new RegExp(searchPhrase, 'i')
    const searchPhraseRegex = new RegExp(searchPhrase, 'ig')
    const moviesWithHighlightedWords = movies.map(withHighlightedWords(searchPhraseRegex))
    const filteredMovies = moviesWithHighlightedWords.filter(x => filterRegex.test(`${x.swapi.title} ${x.swapi.opening_crawl} ${x.swapi.director}`))
    setAllMovies(filteredMovies)

    const selectedMovieWithHighlightedWords = moviesWithHighlightedWords.find(x => x.swapi.episode_id === selectedMovie?.swapi.episode_id)
    setSelectedMovie(selectedMovieWithHighlightedWords)
  }

  const handleOnSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchPhrase = e.target.value

    clearTimeout(timeout)

    if (searchPhrase.length < 2) {
      setAllMovies(movies)
      setSelectedMovie(movies.find(x => x.swapi.episode_id === selectedMovie?.swapi.episode_id))
      return
    }

    timeout = setTimeout(() => {
      onSearch(searchPhrase)
    }, 250);
  }

  const handleOnMovieChange = (movie: JoinedMovie) => {
    setSelectedMovie(movie)
  }

  const handleOnSorterOrderChange = (sortOption: SortBy) => {
    if (sortOption === SortBy.episode) {
      return setAllMovies([...allMovies].sort(sort.byEpisode))
    }

    if (sortOption === SortBy.title) {
      return setAllMovies([...allMovies].sort(sort.byTitle));
    }

    if (sortOption === SortBy.rating) {
      return setAllMovies([...allMovies].sort(sort.byRating));
    }

    if (sortOption === SortBy.year) {
      return setAllMovies([...allMovies].sort(sort.byYear));
    }

    return setAllMovies([...allMovies].sort(sort.byDefault(defaultSortOrder)))
  }

  return (
    <Layout
      onSorterOrderChange={handleOnSorterOrderChange}
      onSearchInputChange={handleOnSearchInputChange}
      seo={{
        title: selectedMovie?.swapi.title || "Home",
        description: `${selectedMovie?.swapi.opening_crawl.slice(0, 160)}...` || "List of your favorite movies!"
      }}
    >
      <MoviesResult
        allMovies={allMovies}
        selectedMovie={selectedMovie}
        onMovieChange={handleOnMovieChange}
      />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const movies = await Repo.joinedMovies.movies.fetch()

  const defaultSortOrder = movies.map(x => x.swapi.episode_id)
  return {
    props: { movies, defaultSortOrder },
    revalidate: REVALIDATE,
  }
}

export default Home
