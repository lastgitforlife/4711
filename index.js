let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let jsonQC = require('./jsonQuickCommand');
let expressHbs = require('express-handlebars');
let artistFile = "test.txt";
let artists = [];
jsonQC.readFile(artistFile).then(data => artists = data);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine(
    'hbs',
    expressHbs({
        layoutDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/Lab2/lab2.html', (req, res) => {
    res.sendFile(path.join(__dirname, "Lab2", "lab2.html"));
});

app.get('/Lab3/lab3.html', (req, res) => {
    res.sendFile(path.join(__dirname, "Lab3", "lab3.html"));
});

app.get('/Lab4/Lab4.html', (req, res) => {
    res.sendFile(path.join(__dirname, "Lab4", "Lab4.html"));
});

app.get('/Lab5/Lab5.html', (req, res) => {
    // res.sendFile(path.join(__dirname, "Lab5", "lab5.html"));
    res.render('home', {pageTitle: 'Home Page', heading: 'Welcome', artists: artists});
});

app.post('/newArtist', (req, res) => {
    try{
        let newArtist = {"name": req.body.name, "desc": req.body.description, "img" : req.body.image, "id": Math.random()};
        jsonQC.addFile(artistFile, newArtist);
        let data = jsonQC.readFile(artistFile);
        data.then(data => artists.push(newArtist)).catch(e => console.log(e));
    }catch(e){
        console.log(e);
    }
    res.redirect(301, 'Lab5/Lab5.html');
});

app.post('/search', (req, res) => {
        let searchTerms = req.body.name;
        artists = [];
        console.log(searchTerms);
        let data = jsonQC.readFile(artistFile);
        data.then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.toLowerCase().includes(searchTerms.toLowerCase())) {
                    artists.push(data[i]);
                }
            }
            res.redirect(301, "Lab5/Lab5.html");
        }).catch(e => {
            console.log(e);
            res.redirect(301, "Lab5/Lab5.html");
        });
});

app.post('/delete', (req, res) =>{
    let id = req.body.id;
    for(let i = 0; i < artists.length; i++){
        if(artists[i].id.toString() === id){
            jsonQC.deleteObject(artistFile, artists[i]);
            artists.splice(i, 1);
            break;
        }
    }
    res.redirect(301, "Lab5/Lab5.html");
});

app.listen(process.env.PORT || 3000);