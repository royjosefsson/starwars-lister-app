import { Layout } from "@/components/layout"
import { MoviesResult } from "@/components/moviesResult"
import { REVALIDATE } from "@/data/site-settings"
import { SortBy } from "@/enums/sortBy"
import { JoinedMovie } from "@/interfaces/movie"
import { Repo } from "@/repo"
import { addHighlight } from "@/utils/addHighlight"
import { ChangeEvent, useState } from "react"

let timeout: NodeJS.Timeout

interface HomeProps {
  movies: JoinedMovie[]
  defaultSortOrder: number[]
}

const Home = ({ movies, defaultSortOrder }: HomeProps) => {
  const [allMovies, setAllMovies] = useState<JoinedMovie[]>(movies)
  const [selectedMovie, setSelectedMovie] = useState<JoinedMovie | null>(null)

  const onSearch = (searchPhrase: string) => {
    const filterRegex = new RegExp(searchPhrase, 'i')
    const searchPhraseRegex = new RegExp(searchPhrase, 'ig')
    const filteredMovies = movies.filter(x => filterRegex.test(`${x.swapi.title} ${x.swapi.opening_crawl} ${x.swapi.director}`))
    const withHighlight = filteredMovies.map(x => ({
      ...x,
      swapi: {
        ...x.swapi,
        title: x.swapi.title.replace(searchPhraseRegex, addHighlight(searchPhrase)),
        opening_crawl: x.swapi.opening_crawl.replace(searchPhraseRegex, addHighlight(searchPhrase)),
        director: x.swapi.director.replace(searchPhraseRegex, addHighlight(searchPhrase)),
      }
    }))
    setAllMovies(withHighlight)
  }

  const handleOnSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchPhrase = e.target.value

    if (searchPhrase.length < 2) {
      setAllMovies(movies)
      return
    }

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      onSearch(searchPhrase)
    }, 250);
  }

  const handleOnMovieChange = (movie: JoinedMovie) => {
    setSelectedMovie(movie)
  }

  const handleOnSorterOrderChange = (sortOption: SortBy) => {
    if (sortOption === SortBy.episode) {
      return setAllMovies([...allMovies].sort((a, b) => a.swapi.episode_id - b.swapi.episode_id))
    }

    if (sortOption === SortBy.title) {
      return setAllMovies([...allMovies].sort((a, b) => {
        const aTitle = a.swapi.title.split(" - ")[1].toLowerCase()
        const bTitle = b.swapi.title.split(" - ")[1].toLowerCase()
        return aTitle.localeCompare(bTitle)
      }));
    }

    if (sortOption === SortBy.rating) {
      return setAllMovies([...allMovies].sort((a, b) => Number(b.omdbapi.imdbRating) - Number(a.omdbapi.imdbRating)));
    }

    if (sortOption === SortBy.year) {
      return setAllMovies([...allMovies].sort((a, b) => new Date(b.swapi.release_date).getTime() - new Date(a.swapi.release_date).getTime()));
    }

    return setAllMovies([...allMovies].sort((a, b) => defaultSortOrder.indexOf(a.swapi.episode_id) - defaultSortOrder.indexOf(b.swapi.episode_id)))
  }

  return (
    <Layout
      onSorterOrderChange={handleOnSorterOrderChange}
      onSearchInputChange={handleOnSearchInputChange}
      seo={{
        title: selectedMovie?.swapi.title || "Home",
        description: selectedMovie?.swapi.opening_crawl || "List of your favorite movies!"
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
