let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');
const expressHbs = require('express-handlebars');

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // middleware

// parse application/json
app.use(bodyParser.json()); // middleware

let peopleRoutes = require('./routes/peoples');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
    res.render('home', { pageTitle: 'People App', heading: 'Welcome to People App'});
});

app.use(peopleRoutes);

app.listen(4000, () => console.log('Server ready @ port 4000'));

// app.set('view engine', 'hbs');
// app.set('views', 'views');
//
// app.get('/', (req, res) => {
//     res.render('home', {pageTitle: 'Home Page', heading: 'Welcome', artists: artists});
// });
//
// app.post('/newArtist', (req, res) => {
//     try{
//         let newArtist = {"name": req.body.name, "desc": req.body.description, "img" : req.body.image, "id": Math.random()};
//         jsonQC.addFile(artistFile, newArtist);
//         let data = jsonQC.readFile(artistFile);
//         data.then(data => artists.push(newArtist)).catch(e => console.log(e));
//     }catch(e){
//         console.log(e);
//     }
//     res.redirect(301, '/');
// });
//
// app.post('/search', (req, res) => {
//         let searchTerms = req.body.name;
//         artists = [];
//         console.log(searchTerms);
//         let data = jsonQC.readFile(artistFile);
//         data.then(data => {
//             for (let i = 0; i < data.length; i++) {
//                 if (data[i].name.toLowerCase().includes(searchTerms.toLowerCase())) {
//                     artists.push(data[i]);
//                 }
//             }
//             res.redirect(301, "/");
//         }).catch(e => {
//             console.log(e);
//             res.redirect(301, "/");
//         });
// });
//
// app.post('/delete', (req, res) =>{
//     let id = req.body.id;
//     for(let i = 0; i < artists.length; i++){
//         if(artists[i].id.toString() === id){
//             jsonQC.deleteObject(artistFile, artists[i]);
//             artists.splice(i, 1);
//             break;
//         }
//     }
//     res.redirect(301, "/");
// });
//
// app.listen(process.env.PORT || 3000);