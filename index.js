const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

const client = new Client({
    database: "examen_iulie",
    user: "alex",
    password: "alexu",
    host: "localhost",
    port: 5432
});

client.connect();

app.use(express.static(path.join(__dirname, 'resurse')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Servește pagina principală
app.get('/', (req, res) => {
    res.render('echipe');
});

// Ruta `/echipe` care returnează datele echipelor în funcție de rating-ul minim
app.get('/echipe', async (req, res) => {
    const r_min = parseFloat(req.query.r_min) || 0;
    try {
        const { rows } = await client.query('SELECT * FROM echipe WHERE rating > $1', [r_min]);
        res.render('echipe', { echipe: rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Pornirea serverului pe portul specificat
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Gestionarea închiderii serverului prin Ctrl+C
process.on('SIGINT', () => {
    client.end(() => {
        console.log('Client disconnected');
        process.exit();
    });
});
