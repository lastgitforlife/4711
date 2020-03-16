let artistModel = require('../models/peopleData');

exports.getAllPeople = (req,res,next) => {
    let Peoples = artistModel.getall();
    Peoples.then( (rows, err) => {
        res.render('artist', { artists: rows, js: "addArtistForm.js", css: "artists.css" });
    }).catch(err =>{
        console.log("error: " + err);
    });
};

exports.getFilteredArtists = (req,res,next) => {
    let Peoples = artistModel.getall();
    Peoples.then( (rows, err) => {
        let artists = [];
        let term = req.body.name.toLowerCase();
        for(let i = 0; i < rows.length; i++){
            if(rows[i].name.toLowerCase().includes(term)){
                artists.push(rows[i])
            }
        }
        res.render('artist', { artists: artists, js: "addArtistForm.js", css: "artists.css" });
    }).catch(err =>{
        console.log("error: " + err);
    });
};

exports.postAddArtist = (req, res, next) => {
    let p_name = req.body.name;
    let p_about = req.body.description;
    let p_imageURL = req.body.image;

    let pOject = {
        name: p_name,
        about: p_about,
        imageURL: p_imageURL
    };

    artistModel.add(pOject);
    res.redirect(301, '/artist');
};

exports.postDeleteArtist = (req, res, next) =>{
    let id = req.body.id;
    let request = artistModel.delete(id);
    request.then((req, err) =>{
        res.redirect(301, '/artist');
    });
};