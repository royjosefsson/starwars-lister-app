import { JoinedMovie } from "@/interfaces/movie"

const addHighlight = (string: string) => {
  return `<span class="highlight">${string}</span>`
}

export const withHighlightedWords = (regex: RegExp) => (searchPhrase: string) => (movie: JoinedMovie) => ({
  ...movie,
  swapi: {
    ...movie.swapi,
    title: movie.swapi.title.replace(regex, addHighlight(searchPhrase)),
    opening_crawl: movie.swapi.opening_crawl.replace(regex, addHighlight(searchPhrase)),
    director: movie.swapi.director.replace(regex, addHighlight(searchPhrase)),
  }
})