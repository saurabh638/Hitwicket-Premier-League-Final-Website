# City Voting Page Setup Guide

This guide will help you set up the city voting page with all necessary components.

## Files Created

1. **city-voting.html** - The main voting page
2. **assets/js/city-voting.js** - Vanilla JavaScript implementation (converted from React)
3. **assets/css/city-voting.css** - Styling for the voting page
4. **data/** - Directory for JSON data files

## Setup Steps

### 1. Add JSON Data Files

You need to add three JSON files to the `data/` directory:

- `data/cities.json` - List of cities with coordinates
- `data/admin1.json` - Administrative level 1 metadata (states/provinces)
- `data/admin2.json` - Administrative level 2 metadata (counties/districts)

**If you already have these files from your React project:**
- Simply copy them from your React project's `public/` folder to the `data/` folder in this project
- Make sure they have the exact filenames: `cities.json`, `admin1.json`, `admin2.json`

**If you don't have these files:**
- See `data/README.md` for instructions on how to obtain or generate them

### 2. Configure API Base URL

Open `city-voting.html` and find the script tag near the bottom (around line 145):

```html
<script>
    // Set your API base URL here
    window.API_BASE_URL = ''; // Update this with your actual API URL
</script>
```

Update `window.API_BASE_URL` with your backend API URL:

- **If your API is on the same domain:** Leave it as empty string `''`
- **If your API is on a different domain:** Set it to your API URL, e.g., `'https://api.example.com'` or `'http://localhost:3000'`

### 3. Test the Page

1. Start a local server (the JSON files need to be served via HTTP, not file://)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

2. Open `http://localhost:8000/city-voting.html?token=YOUR_TOKEN` in your browser
   - Replace `YOUR_TOKEN` with a valid voting token from your backend

3. The page should:
   - Validate the token
   - Load the cities data
   - Allow you to search and select a city
   - Submit the vote to your backend

## How It Works

1. **Token Validation**: The page reads the `token` query parameter from the URL (or from localStorage) and validates it with your backend at `/validateUserToken`

2. **City Loading**: Once validated, it loads the three JSON files to get city data

3. **Search**: As users type, it filters cities and shows suggestions

4. **Selection**: Users click on a suggestion to select a city

5. **Submission**: When submitted, it sends the vote to `/submitVote/{user_short_id}` endpoint

## API Endpoints Expected

The code expects these backend endpoints:

1. **POST** `/validateUserToken?token={token}`
   - Returns: `{ valid: true, user_short_id: "..." }` or `{ valid: false }`

2. **POST** `/submitVote/{user_short_id}`
   - Body: `{ city: "City Name" }`
   - Returns: `{ message: "Success message" }` or error object

## Troubleshooting

### JSON files not loading
- Make sure you're running a local server (not opening the file directly)
- Check that the files are in the `data/` directory with correct names
- Check browser console for CORS or 404 errors

### API calls failing
- Verify `API_BASE_URL` is set correctly in `city-voting.html`
- Check browser console for network errors
- Ensure your backend CORS settings allow requests from your domain

### Token validation failing
- Make sure you're passing the token in the URL: `?token=YOUR_TOKEN`
- Check that your backend `/validateUserToken` endpoint is working
- Verify the token format matches what your backend expects

## Integration with Existing Site

The city voting page is already integrated:
- Navigation links in `index.html` point to `city-voting.html`
- All "Vote" buttons link to the voting page
- The page uses the same header and footer as the main site

## Notes

- The code is converted from React to vanilla JavaScript, maintaining the same functionality
- All state management is handled with plain JavaScript variables
- The UI updates are done through direct DOM manipulation
- The styling matches the existing HPL website theme

