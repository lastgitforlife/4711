let peopleModel = require('../models/peopleData');

exports.getAllPeople = (req,res,next) => {
    let Peoples = peopleModel.getall();
    Peoples.then( (rows, err) => {
        console.log(rows);
        res.render('peoples', { people: rows, peoplesCSS: true });
    }).catch(err =>{
        console.log("error: " + err);
    });

};

exports.getAddPeople = (req,res,next) => {
    res.render('peopleadd' ,{formsCSS: true});
};

exports.getPeople = (req,res,next) => {
    let id = req.params.id;
    let People = peopleModel.getpeople(id);
    People.then( (data, err) => {
        res.render('people', {people: data[0], peopleCSS: true});
    });
};

exports.postAddPeople = (req,res,next) => {
    let p_id = req.body.id;
    let p_name = req.body.name;
    let p_about = req.body.about;
    let p_imageURL = req.body.imageURL;

    let pOject = {
        id: p_id,
        name: p_name,
        about: p_about,
        imageURL: p_imageURL
    };

    peopleModel.add(pOject);
    res.redirect(301, '/peoples');
};