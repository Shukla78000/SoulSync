import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/horoscope", async (req, res) => {
    const { sign } = req.body;

    try {
        const response = await axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch horoscope data" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
