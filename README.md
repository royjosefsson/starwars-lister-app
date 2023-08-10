# Star Wars Lister App

This is a Next.js app that lists Star Wars movies using data from the SWAPI [https://swapi.dev](https://swapi.dev) and movie ratings from the OMDB API [https://www.omdbapi.com](https://www.omdbapi.com).

## Getting Started:

### Prerequisites:
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation:

1. Clone the repository:
  ``` bash
  git clone git@github.com:royjosefsson/starwars-lister-app.git
  cd starwars-lister
  ```

2. Install dependencies:
``` bash
npm install
```

3. Rename .env.local.example to .env.local.

4. Request an OMDB API key from Roy. You can contact him at [roy.josefsson@gmail.com](mailto:roy.josefsson@gmail.com).

5. Open .env.local and replace **NEXT_PUBLIC_OMDBAPI_API_KEY** with the actual OMDB API key you received from Roy.

### Usage:

- Run the development server:
  ``` bash
  npm run dev
  ```
  Open http://localhost:3000 in your browser to see the app.

- To build the app for production:
  ``` bash
	npm run build
	```

- To start the production server:
  ``` bash
	npm run start
	```

### Features:

- Fetches Star Wars movie data from SWAPI.
- Retrieves movie ratings from OMDB API.
- Displays a list of Star Wars movies with their details and ratings.

### Contributing:

Contributions are welcome! If you find any issues or want to enhance the app, feel free to submit a pull request.

### Contact:

For any inquiries or assistance regarding the OMDB API key, you can contact Roy at [roy.josefsson@gmail.com](mailto:roy.josefsson@gmail.com).

### License:

This project is licensed under the MIT License - see the LICENSE file for details.
