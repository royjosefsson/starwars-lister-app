import { JoinedMovie } from "@/interfaces/movie"

const addHighlight = (match: string) => {
  return `<span class="highlight">${match}</span>`
}

export const withHighlightedWords = (searchPhraseRegex: RegExp) => (movie: JoinedMovie): JoinedMovie => ({
  ...movie,
  swapi: {
    ...movie.swapi,
    title: movie.swapi.title.replace(searchPhraseRegex, addHighlight),
    opening_crawl: movie.swapi.opening_crawl.replace(searchPhraseRegex, addHighlight),
    director: movie.swapi.director.replace(searchPhraseRegex, addHighlight),
  }
})
