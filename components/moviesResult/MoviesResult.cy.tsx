import { MoviesResult } from "@/components/moviesResult"
import { JoinedMovie } from '@/interfaces/movie';

describe('<MoviesResult />', () => {
  const mockMovie: JoinedMovie = {
    "swapi": {
      "title": "Episode IV - A New Hope",
      "episode_id": 4,
      "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25",
      "characters": [],
      "planets": [],
      "starships": [],
      "vehicles": [],
      "species": [],
      "created": new Date("2014-12-10T14:23:31.880000Z"),
      "edited": new Date("2014-12-20T19:49:45.256000Z"),
      "url": "https://swapi.dev/api/films/1/"
    },
    "omdbapi": {
      "Title": "Star Wars: Episode IV - A New Hope",
      "Year": "1977",
      "Rated": "PG",
      "Released": "25 May 1977",
      "Runtime": "121 min",
      "Genre": "Action, Adventure, Fantasy",
      "Director": "George Lucas",
      "Writer": "George Lucas",
      "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher",
      "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth ...",
      "Language": "English",
      "Country": "United States",
      "Awards": "Won 6 Oscars. 65 wins & 31 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "8.6/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "93%"
        },
        {
          "Source": "Metacritic",
          "Value": "90/100"
        }
      ],
      "Metascore": "90",
      "imdbRating": "8.6",
      "imdbVotes": "1,405,284",
      "imdbID": "tt0076759",
      "Type": "movie",
      "DVD": "10 Oct 2016",
      "BoxOffice": "$460,998,507",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    }
  };

  const handleOnMovieChange = () => {

  }

  it('renders with a selected movie', () => {
    cy.mount(
      <MoviesResult
        allMovies={[mockMovie]}
        selectedMovie={mockMovie}
        onMovieChange={handleOnMovieChange}
      />
    )

    cy.contains('Episode IV - A New Hope')
    cy.contains('George Lucas')
    cy.get('.movies-result__list .stars .stars__star:not(.stars__star--outlined)').should('have.length', 8)
    cy.contains('1977-05-25')
  })

  it('renders without a selected movie', () => {
    cy.mount(
      <MoviesResult
        allMovies={[mockMovie]}
        selectedMovie={undefined}
        onMovieChange={handleOnMovieChange}
      />
    )

    cy.contains('Select a movie!')
    cy.get('.movies-result__information__top-section__ratings__li').should(
      'not.exist'
    )
  })

  it('handles movie selection', () => {
    const onMovieChange = cy.stub().as('onMovieChange')
  
    cy.mount(
      <MoviesResult
        allMovies={[mockMovie]}
        selectedMovie={undefined}
        onMovieChange={onMovieChange}
      />
    );
  
    cy.contains('Episode IV - A New Hope').click()
  
    cy.get('@onMovieChange').should('have.been.calledOnce')
    cy.get('@onMovieChange').should('have.been.calledWith', mockMovie)
  })
})