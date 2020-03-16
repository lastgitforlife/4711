let loginModel = require("../models/loginData");

exports.login = (req, response, next) =>{
    let username = req.body.username;
    let password = req.body.password;
    try{
        let attempt = loginModel.isValid(username);
        attempt.then( res =>{
            let result = password.localeCompare(res[0].password);
            if(result === 0){
                response.redirect(301, '/artist');
            }else{
                response.render('login', {js:"failedLogin.js", css: 'login.css'});
            }
        }).catch(err =>{
            console.log(err);
            response.render('login', {js:"failedLogin.js", css: 'login.css'});
        })
    }catch(err){
        response.render('login', {js:"failedLogin.js", css: 'login.css'});
    }
};

exports.logout = (req, response, next) => {
    response.redirect(301, '/');
    res.render('login', {css: 'login.css'});
};