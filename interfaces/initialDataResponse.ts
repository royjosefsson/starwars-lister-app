import { JoinedMovie } from "./movie"

export interface InitialDataResponse {
    movies: JoinedMovie[]
    defaultSortOrder: number[]
}
