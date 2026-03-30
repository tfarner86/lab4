import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;



const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
	let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index",{"image":randomImage})
});


app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    console.log(planetInfo);
    res.render('planet', {planetInfo, planetName});
});

app.get('/nasa', async (req, res) => {
        const apiKey = "9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
        const date = "2026-03-21";
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.log("NASA API error:", await response.text());
            return res.render("nasaRoute", { error: "NASA API unavailable" });
        }

        const data = await response.json();

        res.render("nasaRoute", {
            title: data.title,
            image: data.hdurl || data.url,
            explanation: data.explanation,
            date: data.date,
            copyright: data.copyright,
            error: null
        });

});


app.listen(3000, () => {
   console.log('server started');
});
