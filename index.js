let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

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
        let name = req.body.name;
        let desc = req.body.description;
        let img = req.body.image;
        console.log(name);
        console.log(desc);
        console.log(img);
        fs.writeFile("test.txt", name, function(err){if(err)throw err;});
    }catch(e){
        console.log(e);
    }
    res.redirect(301, 'Lab5/Lab5.html');
});

app.post('/search', (req, res) => {

});

app.listen(3000, () => console.log("Server ready"));