/**
 * City Voting - Vanilla JavaScript Implementation
 * Converted from React component
 */

(function () {
    'use strict';

    // Configuration
    const DATA_URLS = {
        cities: './data/cities.json',
        admin1: './data/admin1.json',
        admin2: './data/admin2.json',
    };

    // Get API base URL from environment or use empty string
    // You can set this in city-voting.html before loading this script:
    // <script>window.API_BASE_URL = 'https://your-api-url.com';</script>
    const API_BASE_URL = window.API_BASE_URL || '';

    const MAX_SUGGESTIONS = 12;

    // State
    let cities = [];
    let query = '';
    let originalQuery = ''; // Keep original query for suggestions
    let selectedCity = null;
    let loading = true;
    let error = '';
    let submissionStatus = null;
    let isSubmitting = false;
    let uid = null;
    let validatingToken = true;

    // DOM Elements
    const cityInput = document.getElementById('city-input');
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('city-voting-form');
    const suggestionsList = document.getElementById('suggestions-list');
    const validatingTokenStatus = document.getElementById('validating-token-status');
    const loadingStatus = document.getElementById('loading-status');
    const errorStatus = document.getElementById('error-status');
    const noMatchesStatus = document.getElementById('no-matches-status');
    const selectCityStatus = document.getElementById('select-city-status');
    const submissionStatusEl = document.getElementById('submission-status');

    // Initialize Intl.DisplayNames for country names
    const regionDisplayNames =
        typeof Intl !== 'undefined' && Intl.DisplayNames
            ? new Intl.DisplayNames(['en'], { type: 'region' })
            : null;

    // Utility Functions
    function stripDiacritics(value = '') {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function normalizeText(value = '') {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function getCountryName(countryCode) {
        if (!countryCode) return '';
        if (!regionDisplayNames) return countryCode;
        try {
            return regionDisplayNames.of(countryCode) ?? countryCode;
        } catch (error) {
            console.warn('Unable to resolve country name for', countryCode, error);
            return countryCode;
        }
    }

    // Token Validation - Check if already validated on landing page, otherwise validate here
    async function verifyToken() {
        validatingToken = true;
        updateUI();

        try {
            // First, check if token was already validated on landing page
            const preValidatedShortId = localStorage.getItem('votingUserShortId');
            const token = localStorage.getItem('votingToken');

            if (preValidatedShortId && token) {
                // Token was already validated on landing page
                console.log('Using pre-validated token from landing page. User short_id:', preValidatedShortId);
                uid = preValidatedShortId;
                error = '';
                validatingToken = false;
                updateUI();
                return;
            }

            // If not pre-validated, try to get token from URL or localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('token') || token;

            if (!urlToken) {
                console.log('No token found in URL or localStorage');
                error = 'No voting token found. Please use a valid voting link with a token parameter.';
                validatingToken = false;
                updateUI();
                return;
            }

            console.log('Validating token with backend (not pre-validated)...', `${API_BASE_URL}/validateUserToken?token=${encodeURIComponent(urlToken).substring(0, 20)}...`);

            // Call validateUserToken API - token goes in query parameter (as backend expects req.query.token)
            const response = await fetch(
                `${API_BASE_URL}/validateUserToken?token=${encodeURIComponent(urlToken)}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Token validation response status:', response.status);
            const data = await response.json();
            console.log('Token validation response:', data);

            // Backend returns:
            // - 200: { valid: true, user_short_id: "..." }
            // - 400: { valid: false, message: "Token is required" } or { valid: false, message: "Invalid or expired token" }
            if (data.valid && data.user_short_id) {
                const shortId = data.user_short_id;
                uid = shortId; // Store the shortid for later use in submitVote
                localStorage.setItem('votingToken', urlToken);
                localStorage.setItem('votingUserShortId', shortId);
                console.log('Token validated successfully. User short_id:', shortId);
                error = '';
            } else {
                // Use backend error message if available
                // Backend can return: "Invalid or expired token" or "Token is required"
                const backendMessage = data.message || '';
                if (backendMessage.toLowerCase().includes('expired')) {
                    error = 'Your voting token has expired. Please use a fresh voting link.';
                } else if (backendMessage.toLowerCase().includes('invalid')) {
                    error = 'Invalid voting token. Please use a valid voting link.';
                } else {
                    error = backendMessage || 'Invalid or expired token. Please use a valid voting link.';
                }
                console.warn('Token validation failed:', error);
                // Clear invalid tokens
                localStorage.removeItem('votingToken');
                localStorage.removeItem('votingUserShortId');
                // Don't set uid, but allow user to still interact with the page
                // They'll see the error when they try to submit
            }
        } catch (tokenError) {
            console.error('Token validation error:', tokenError);
            error =
                tokenError instanceof Error
                    ? tokenError.message
                    : 'Unable to verify token. Please try again.';
            // Clear tokens on error
            localStorage.removeItem('votingToken');
            localStorage.removeItem('votingUserShortId');
        } finally {
            validatingToken = false;
            updateUI();
        }
    }

    // Load Cities Data - Optimized for large files
    async function loadCities() {
        loading = true;
        error = '';
        updateUI();

        try {
            console.log('Loading cities data...');
            // Update status to show we're fetching
            loadingStatus.textContent = 'Fetching city data...';
            loadingStatus.style.display = 'block';

            const [citiesResponse, admin1Response, admin2Response] = await Promise.all([
                fetch(DATA_URLS.cities),
                fetch(DATA_URLS.admin1),
                fetch(DATA_URLS.admin2),
            ]);

            if (!citiesResponse.ok) {
                throw new Error(`Unable to fetch cities (${citiesResponse.status})`);
            }

            if (!admin1Response.ok) {
                throw new Error(`Unable to fetch admin1 metadata (${admin1Response.status})`);
            }

            if (!admin2Response.ok) {
                throw new Error(`Unable to fetch admin2 metadata (${admin2Response.status})`);
            }

            // Update status to show we're parsing
            loadingStatus.textContent = 'Parsing data...';
            updateUI();

            const [citiesPayload, admin1Payload, admin2Payload] = await Promise.all([
                citiesResponse.json(),
                admin1Response.json(),
                admin2Response.json(),
            ]);

            // Update status to show we're processing
            loadingStatus.textContent = 'Processing cities... (this may take a moment)';
            updateUI();

            // Process in chunks to avoid blocking the UI
            const admin1Lookup = admin1Payload.reduce((map, entry) => {
                map[entry.code] = entry.name;
                return map;
            }, {});

            const admin2Lookup = admin2Payload.reduce((map, entry) => {
                map[entry.code] = entry.name;
                return map;
            }, {});

            // Process cities in chunks to keep UI responsive
            const CHUNK_SIZE = 1000;
            const normalized = [];
            const totalCities = citiesPayload.length;

            for (let i = 0; i < citiesPayload.length; i += CHUNK_SIZE) {
                const chunk = citiesPayload.slice(i, i + CHUNK_SIZE);

                const chunkNormalized = chunk.map((city, chunkIndex) => {
                    const index = i + chunkIndex;
                    const displayName =
                        city.country === 'IN' ? stripDiacritics(city.name) : city.name;

                    const admin1Code = city.admin1 ? `${city.country}.${city.admin1}` : '';
                    const admin2Code =
                        city.admin2 && city.admin1
                            ? `${city.country}.${city.admin1}.${city.admin2}`
                            : '';

                    const admin1Name = admin1Code ? admin1Lookup[admin1Code] ?? '' : '';
                    const admin2Name = admin2Code ? admin2Lookup[admin2Code] ?? '' : '';

                    const countryName = getCountryName(city.country);

                    const locationParts = [
                        admin2Name,
                        admin1Name,
                        countryName || city.country,
                    ].filter(Boolean);

                    const locationLabel = locationParts.join(', ');

                    return {
                        ...city,
                        displayName,
                        id: `${city.name}-${city.lat}-${city.lng}-${index}`,
                        searchableName: normalizeText(displayName),
                        searchableLocation: normalizeText(locationLabel),
                        admin1Name,
                        admin2Name,
                        countryName: countryName || city.country,
                        locationLabel,
                    };
                });

                normalized.push(...chunkNormalized);

                // Update progress every chunk
                if (i % (CHUNK_SIZE * 5) === 0 || i + CHUNK_SIZE >= totalCities) {
                    const progress = Math.min(100, Math.round(((i + CHUNK_SIZE) / totalCities) * 100));
                    loadingStatus.textContent = `Processing cities... ${progress}%`;
                    updateUI();

                    // Yield to browser to keep UI responsive
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }

            cities = normalized;
            loading = false;
            console.log(`Cities loaded successfully! Total cities: ${cities.length}`);
            updateUI();
        } catch (fetchError) {
            console.error('Error loading cities:', fetchError);
            error =
                fetchError instanceof Error
                    ? fetchError.message
                    : 'Something went wrong while loading cities.';
            loading = false;
            updateUI();
        }
    }

    // Get Suggestions - Prioritized: city names starting with query, then containing, then location matches
    function getSuggestions(searchQuery = null) {
        const queryToUse = searchQuery !== null ? searchQuery : query;
        if (!queryToUse) {
            return [];
        }

        const normalizedQuery = normalizeText(queryToUse);
        const nameStartsWith = []; // Cities whose names START with the query (highest priority)
        const nameContains = [];   // Cities whose names CONTAIN the query (but don't start with it)
        const locationMatches = [];  // Cities where query appears in location/country fields

        for (let i = 0; i < cities.length; i += 1) {
            const city = cities[i];
            const nameMatches = city.searchableName.includes(normalizedQuery);
            const locationMatchesQuery = city.searchableLocation.includes(normalizedQuery);

            // Priority 1: City name starts with query
            if (city.searchableName.startsWith(normalizedQuery)) {
                nameStartsWith.push(city);
            }
            // Priority 2: City name contains query (but doesn't start with it)
            else if (nameMatches) {
                nameContains.push(city);
            }
            // Priority 3: Query appears in location/country fields only
            else if (locationMatchesQuery) {
                locationMatches.push(city);
            }
        }

        // Combine results in priority order, up to MAX_SUGGESTIONS
        const matches = [];

        // Add name starts with matches first
        for (let i = 0; i < nameStartsWith.length && matches.length < MAX_SUGGESTIONS; i++) {
            matches.push(nameStartsWith[i]);
        }

        // Then add name contains matches
        for (let i = 0; i < nameContains.length && matches.length < MAX_SUGGESTIONS; i++) {
            matches.push(nameContains[i]);
        }

        // Finally add location matches
        for (let i = 0; i < locationMatches.length && matches.length < MAX_SUGGESTIONS; i++) {
            matches.push(locationMatches[i]);
        }

        return matches;
    }

    // Handle Query Change
    function handleQueryChange(event) {
        const value = event.target.value;
        query = value;
        originalQuery = value; // Store original query for suggestions
        selectedCity = null;
        submissionStatus = null;
        updateUI();
    }

    // Handle Suggestion Click
    function handleSuggestionClick(city) {
        selectedCity = city;
        // Update input field to show selected city name for user feedback
        query = city.displayName;
        // But keep originalQuery for suggestions filtering - use originalQuery if it exists
        submissionStatus = null;
        updateUI();
    }

    // Handle Form Submit
    async function handleSubmit(event) {
        event.preventDefault();
        submissionStatus = null;
        updateUI();

        if (!selectedCity) {
            submissionStatus = {
                type: 'error',
                message: 'Please select a city from the suggestions above before submitting.',
            };
            updateUI();
            return;
        }

        if (!uid) {
            submissionStatus = {
                type: 'error',
                message: 'Invalid user. Please come through the Game',
            };
            updateUI();
            return;
        }

        const cityName = selectedCity.displayName.trim();

        if (!cityName) {
            submissionStatus = { type: 'error', message: 'Please pick a city first.' };
            updateUI();
            return;
        }

        isSubmitting = true;
        updateUI();

        try {
            // Backend expects: POST /submitVote/:shortid with { city: "City Name" }
            // uid contains the shortid from token validation
            console.log('Submitting vote to backend...', `${API_BASE_URL}/submitVote/${uid}`, { city: cityName });

            const response = await fetch(`${API_BASE_URL}/submitVote/${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: cityName }),
            });

            console.log('Submit vote response status:', response.status);
            const data = await response.json();
            console.log('Submit vote response:', data);

            if (!response.ok) {
                // Backend returns { error: "..." } or { message: "..." } on error
                const errorMessage =
                    data.error || data.message || `Request failed (${response.status})`;
                throw new Error(errorMessage);
            }

            // Backend returns { message: "Vote received!" } on success
            submissionStatus = {
                type: 'success',
                message: data.message || `Vote received for "${cityName}"!`,
            };
        } catch (submitError) {
            submissionStatus = {
                type: 'error',
                message:
                    submitError instanceof Error
                        ? submitError.message
                        : 'Unable to submit your vote. Please try again.',
            };
        } finally {
            isSubmitting = false;
            updateUI();
        }
    }

    // Update UI
    function updateUI() {
        // Update input and button states
        // Enable input once cities are loaded (allow typing even without token for testing)
        // In production, you might want: cityInput.disabled = validatingToken || !uid || (loading && cities.length === 0);
        cityInput.disabled = validatingToken || (loading && cities.length === 0);
        // Allow submit button to be enabled even without uid - we'll show error on submit
        submitBtn.disabled =
            isSubmitting || !selectedCity || validatingToken || (loading && cities.length === 0);

        // Log state for debugging
        if (cityInput.disabled) {
            console.log('Input disabled - validatingToken:', validatingToken, 'loading:', loading, 'cities.length:', cities.length, 'uid:', uid);
        }

        // Update button text
        submitBtn.textContent = isSubmitting ? 'Sending…' : 'Submit';

        // Update status messages
        validatingTokenStatus.style.display = validatingToken ? 'block' : 'none';
        loadingStatus.style.display =
            loading && !validatingToken ? 'block' : 'none';
        errorStatus.style.display =
            error && !loading && !validatingToken ? 'block' : 'none';
        errorStatus.textContent = error;

        // Update suggestions - use originalQuery if available, otherwise use current query
        // This allows suggestions to remain visible even after selecting a city
        const queryForSuggestions = originalQuery || query;
        const suggestions = getSuggestions(queryForSuggestions);
        const normalizedQuery = normalizeText(queryForSuggestions);

        if (suggestions.length === 0 && normalizedQuery && !loading && !error) {
            noMatchesStatus.style.display = 'block';
            noMatchesStatus.textContent = `No matches for "${query}". Try another spelling.`;
        } else {
            noMatchesStatus.style.display = 'none';
        }

        // Show "select city" message only if suggestions exist but no city is selected
        if (suggestions.length > 0 && !selectedCity && normalizedQuery) {
            selectCityStatus.style.display = 'block';
        } else {
            selectCityStatus.style.display = 'none';
        }

        // Render suggestions - always show if there are suggestions, even if a city is selected
        if (suggestions.length > 0 && normalizedQuery) {
            suggestionsList.style.display = 'block';
            suggestionsList.innerHTML = suggestions
                .map((city) => {
                    const isActive = selectedCity?.id === city.id;
                    return `
                        <li>
                            <button
                                type="button"
                                class="suggestion ${isActive ? 'active' : ''}"
                                data-city-id="${city.id}"
                            >
                                <span>${escapeHtml(city.displayName)}</span>
                                <span class="meta">${escapeHtml(city.locationLabel)}</span>
                            </button>
                        </li>
                    `;
                })
                .join('');

            // Add click handlers to suggestions
            suggestionsList.querySelectorAll('.suggestion').forEach((button) => {
                button.addEventListener('click', () => {
                    const cityId = button.getAttribute('data-city-id');
                    const city = suggestions.find((c) => c.id === cityId);
                    if (city) {
                        handleSuggestionClick(city);
                    }
                });
            });
        } else {
            suggestionsList.style.display = 'none';
        }

        // Update submission status
        if (submissionStatus) {
            submissionStatusEl.style.display = 'block';
            submissionStatusEl.className = `status ${submissionStatus.type === 'success' ? 'success' : 'error'
                }`;
            submissionStatusEl.textContent = submissionStatus.message;
        } else {
            submissionStatusEl.style.display = 'none';
        }
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize
    async function init() {
        // Add event listeners
        cityInput.addEventListener('input', handleQueryChange);
        form.addEventListener('submit', handleSubmit);

        // Verify token and load cities
        try {
            await verifyToken();
            // Load cities even if there's a token error (for testing)
            // In production, you might want to keep: if (!error) { await loadCities(); }
            await loadCities();
        } catch (initError) {
            console.error('Initialization error:', initError);
            error = error || 'Failed to initialize. Please refresh the page.';
            loading = false;
            updateUI();
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

