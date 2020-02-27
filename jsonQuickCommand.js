let fs = require('fs');
let util = require('util');
const readFileAsync = util.promisify(fs.readFile);

// Made by Garrett H. Tailby
// Feb 27/2020

function addFile(file, dataToAdd){
    //Adds json data to a json list to a file.
    readFileAsync(file).then(data=>{
        let jsondata = JSON.parse(data.toString());
        jsondata.push(dataToAdd);
        console.log(jsondata);
        fs.writeFile(file, JSON.stringify(jsondata), function(err){if(err)throw err;});
        return true;
    }).catch(e =>{
            console.log("No prior JSON Data, creating json Array with data.");
            fs.writeFile(file, "[" + JSON.stringify(dataToAdd) + "]", function(err){if(err)throw err;});
            return false;
        });
}

async function readFile(file){
    // Read file and return with a JSON Object(array).
    let data;
    await readFileAsync(file).then(response => data=response).catch(e=>console.log(e));
    return JSON.parse(data);
}

function deleteObject(file, object){
    // Read JSON file and delete JSON object from it.
    readFile(file).then(data => {
        for(let i = 0; i < data.length; i++){
            if(JSON.stringify(data[i]) === JSON.stringify(object)){
                data.splice(i, 1);
                fs.writeFile(file, JSON.stringify(data), function(err){if(err)throw err;});
                return true;
            }
        }
    });

    return false;
}


exports.addFile = addFile;
exports.readFile = readFile;
exports.deleteObject = deleteObject;