import { JoinedMovie } from "@/interfaces/movie"

const addHighlight = (string: string) => {
  return `<span class="highlight">${string}</span>`
}

interface withHighlightedWordsProps {
  searchPhraseRegex: RegExp
  searchPhrase: string
}

export const withHighlightedWords = ({ searchPhraseRegex, searchPhrase }: withHighlightedWordsProps) => (movie: JoinedMovie) => ({
  ...movie,
  swapi: {
    ...movie.swapi,
    title: movie.swapi.title.replace(searchPhraseRegex, addHighlight(searchPhrase)),
    opening_crawl: movie.swapi.opening_crawl.replace(searchPhraseRegex, addHighlight(searchPhrase)),
    director: movie.swapi.director.replace(searchPhraseRegex, addHighlight(searchPhrase)),
  }
})