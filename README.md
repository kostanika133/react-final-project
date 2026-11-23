# Grand Recipes

A React recipe app with authentication, recipe browsing, search, cooking-time filters, sorting, favorites, and recipe details.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root using `.env.example` as a template.
3. Add your RapidAPI key and host to `.env`:
   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
   REACT_APP_RAPIDAPI_HOST=tasty.p.rapidapi.com
   ```
4. Restart the development server after changing `.env`.
5. Start the app:
   ```bash
   npm start
   ```

If API credentials are not configured, the app uses the 20 recipes included in `src/data/recipesData.js` so the interface can still be explored without making API requests.

## Available scripts

- `npm start` - run the development server
- `npm test` - run tests
- `npm run build` - create a production build

## Notes

- Favorites and the recipes loaded from the API are saved in browser local storage.
- The Tasty API is requested in batches of 20. Search currently filters recipes already loaded in the browser, so it does not send an API request for every character. Use Load more to extend the recipes available to search.
- The RapidAPI key is used by the browser app. Do not commit your `.env` file or share the key publicly.
