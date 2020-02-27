let fs = require('fs');

// Made by Garrett H. Tailby
// Feb 27/2020

function addFile(file, dataToAdd){
    //Adds json data to a json list to a file.
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
    // Read file and return with a JSON Object(array).
    let data = fs.readFileSync(file);
    return JSON.parse(data);
}

function deleteObject(file, object){
    // Read JSON file and delete JSON object from it.
    let data = readFile(file);
    for(let i = 0; i < data.length; i++){
        if(JSON.stringify(data[i]) === JSON.stringify(object)){
            data.splice(i, 1);
            fs.writeFile(file, JSON.stringify(data), function(err){if(err)throw err;});
            return true;
        }
    }
    return false;
}


exports.addFile = addFile;
exports.readFile = readFile;
exports.deleteObject = deleteObject;