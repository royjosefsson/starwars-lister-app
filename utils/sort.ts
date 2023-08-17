import { JoinedMovie } from "@/interfaces/movie"

const byEpisode = (a: JoinedMovie, b: JoinedMovie) => a.swapi.episode_id - b.swapi.episode_id

const byTitle = (a: JoinedMovie, b: JoinedMovie) => {
  const aTitle = a.swapi.title.split(" - ")[1].toLowerCase()
  const bTitle = b.swapi.title.split(" - ")[1].toLowerCase()
  return aTitle.localeCompare(bTitle)
}

const byRating = (a: JoinedMovie, b: JoinedMovie) => Number(b.omdbapi.imdbRating) - Number(a.omdbapi.imdbRating)

const byYear = (a: JoinedMovie, b: JoinedMovie) => new Date(b.swapi.release_date).getTime() - new Date(a.swapi.release_date).getTime()

const byDefault = (defaultSortOrder: number[]) => (a: JoinedMovie, b: JoinedMovie) => defaultSortOrder.indexOf(a.swapi.episode_id) - defaultSortOrder.indexOf(b.swapi.episode_id)

const sort = { byEpisode, byTitle, byRating, byYear, byDefault }

export { sort }
