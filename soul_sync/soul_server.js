import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import axios from 'axios';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const GEOCODE_API_URL = "https://api.opencagedata.com/geocode/v1/json";
const KUNDLI_API_URL = process.env.ASTROLOGY_API_URL;

// Handle favicon request to prevent 404 errors
app.get('/favicon.ico', (req, res) => res.status(204));

// Function to fetch latitude & longitude
async function getCoordinates(city, state, country) {
    try {
        const query = `${city}, ${state}, ${country}`;
        const response = await axios.get(GEOCODE_API_URL, {
            params: { q: query, key: GEOCODE_API_KEY }
        });

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { lat, lon: lng };
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
}

// Kundli API Route
app.post('/generate-kundli', async (req, res) => {
    try {
        const { name, date, time, city, state, country } = req.body;

        if (!name || !date || !time || !city || !state || !country) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const coords = await getCoordinates(city, state, country);
        if (!coords) {
            return res.status(500).json({ error: "Failed to get location coordinates" });
        }

        if (!KUNDLI_API_URL) {
            return res.status(500).json({ error: "Kundli API URL not configured" });
        }

        // Ensure API response has latitude/longitude
        if (!coords.lat || !coords.lon) {
            return res.status(500).json({ error: "Invalid coordinates received" });
        }

        const kundliResponse = await axios.post(KUNDLI_API_URL, {
            name, date, time, place: city, lat: coords.lat, lon: coords.lon, apiKey: API_KEY
        });

        res.json(kundliResponse.data);
    } catch (error) {
        console.error("Error generating Kundli:", error.message);
        res.status(500).json({ error: "Failed to generate Kundli" });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
