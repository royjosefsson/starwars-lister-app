export interface SwapiMovie {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: string[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
  created: Date,
  edited: Date,
  url: string
}

interface Rating {
  Source: string,
  Value: string
}

export interface OmdbapiMovie {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: Rating[],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type: string,
  DVD: string,
  BoxOffice: string,
  Production: string,
  Website: string,
  Response: string
}

export interface JoinedMovie {
  swapi: SwapiMovie
  omdbapi: OmdbapiMovie
}