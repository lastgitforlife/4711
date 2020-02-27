let fs = require('fs');

function addFile(file, dataToAdd){
    fs.readFile(file, function(err, data){
        try{
            let jsondata = JSON.parse(data);
            jsondata.push(dataToAdd);
            console.log(jsondata);
            fs.writeFile(file, JSON.stringify(jsondata), function(err){if(err)throw err;});
            return true;
        }catch(e){
            console.log("No prior JSON Data, creating json Array with data.");
            fs.writeFile(file, "[" + JSON.stringify(dataToAdd) + "]", function(err){if(err)throw err;});
            return false;
        }
    });
}

function readFile(file){
    let data = fs.readFileSync(file);
    return JSON.parse(data);
}


exports.addFile = addFile;
exports.readFile = readFile;