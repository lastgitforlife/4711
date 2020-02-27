let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let jsonQC = require('./jsonQuickCommand');
let expressHbs = require('express-handlebars');

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
    res.sendFile(path.join(__dirname, "Lab5", "lab5.html"));
});

app.post('/newArtist', (req, res) => {
    try{
        let newArtist = {"name": req.body.name, "desc": req.body.description, "img" : req.body.image};
        jsonQC.addFile("test.txt", newArtist);
    }catch(e){
        console.log(e);
    }
    res.redirect(301, 'Lab5/Lab5.html');
});

app.post('/search', (req, res) => {
    try{
        let searchTerms = req.body.name;
        let artist = [];
        console.log(searchTerms);
        let data = jsonQC.readFile("test.txt");
        console.log(data);
    }catch(e){
        console.log(e);
    }
    res.redirect(301, "Lab5/Lab5.html");
});

app.listen(3000, () => console.log("Server ready"));