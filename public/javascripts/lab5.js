const myStorage = window.localStorage;
let storageCount = 0;

try{ // see if there is artists int storage.
    storageCount = Number(myStorage.getItem("storageCount"));
}catch{
    console.log("No retrieved artists from storage.");
}

function addArtist(){
    try{
        let form = document.getElementById("Add-Artist-Form");
        form.remove();
    }catch{
        let form = document.createElement("FORM");
        let inputName = document.createElement("INPUT");
        let inputDesc = document.createElement("INPUT");
        let inputImg = document.createElement("INPUT");
        let inputSubmit = document.createElement("INPUT");
        form.id="Add-Artist-Form";
        form.setAttribute("method", "POST");
        inputName.id = "AAF-name";
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "Artist name");
        inputName.setAttribute("maxlength", 40);
        inputDesc.id = "AAF-desc";
        inputDesc.setAttribute("type", "text");
        inputDesc.setAttribute("placeholder", "Artist Desc");
        inputDesc.setAttribute("maxlength", 40);
        inputImg.id = "AAF-img";
        inputImg.setAttribute("type", "text");
        inputImg.setAttribute("placeholder", "Artist Img");
        inputSubmit.id = "AAF-add";
        inputSubmit.setAttribute("type", "submit");
        inputSubmit.setAttribute("value", "Add");
        // inputSubmit.setAttribute("onClick", "newArtist()");
        form.appendChild(inputName);
        form.appendChild(inputDesc);
        form.appendChild(inputImg);
        form.appendChild(inputSubmit);
        document.getElementById("DirectoryOutput").appendChild(form);
    }
}

function newArtist(name = document.getElementById("AAF-name").value,
                   desc = document.getElementById("AAF-desc").value,
                   img = document.getElementById("AAF-img").value,
                   id = 0,
                   newArtist = true) {
    try{
        if(newArtist){
            addArtist();
            storageCount++;
            myStorage.setItem("storageCount", storageCount.toString());
            myStorage.setItem("ArtistName"+storageCount, name); // Can change this to random number later.
            myStorage.setItem("ArtistDesc"+storageCount, desc); // Same here
            myStorage.setItem("ArtistImg"+storageCount, img); // And Here
            myStorage.setItem("ArtistId"+storageCount, storageCount.toString());
            id = storageCount;
        }
        let artistDiv = document.createElement("DIV");
        artistDiv.setAttribute("class", "Artist");
        let artistInfo = document.createElement("DIV");
        artistInfo.setAttribute("class", "ArtistInfo");
        let artistImg = document.createElement("IMG");
        artistImg.setAttribute("src", img);
        let artistName = document.createElement("H3");
        artistName.textContent = name;
        let artistDesc = document.createElement("P");
        artistDesc.textContent = desc;
        let deleteBtn= document.createElement("BUTTON");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", f => {persistentDataRemover(artistDiv, id)}); // persitent Data Remover also removes the item visually.
        artistDiv.appendChild(artistImg);
        artistDiv.appendChild(artistInfo);
        artistInfo.appendChild(artistName);
        artistInfo.appendChild(artistDesc);
        artistInfo.appendChild(deleteBtn);
        document.getElementById("DirectoryOutput").appendChild(artistDiv);
    }catch(e){
        console.log("Error" + e);
    }
}

function persistentDataRemover(item, id){

    myStorage.removeItem("ArtistName"+id);
    myStorage.removeItem("ArtistDesc"+id);
    myStorage.removeItem("ArtistImg"+id);
    myStorage.removeItem("ArtistId"+id);
    item.remove();
}

function persistentDataReAdder(){
    for(let i = storageCount; i > 0; i--){
        try{
            let name = myStorage.getItem("ArtistName"+i);
            if(name === null) throw "isEmpty";
            let desc = myStorage.getItem("ArtistDesc"+i);
            let img = myStorage.getItem("ArtistImg"+i);
            let id = myStorage.getItem("ArtistId"+i);
            newArtist(name, desc, img, id, false);
        }catch(e) {
            console.log(e);
        }
    }
}

function search(){ // Uses search bar to reveal relevant artists.
    let who = document.getElementById("GET-artist").value;
    console.log(who);
    let directory = document.querySelector("#DirectoryOutput");
    let child = directory.lastElementChild;
    while(child){
        directory.removeChild(child);
        child = directory.lastElementChild;
    }
    if(who === ""){
        persistentDataReAdder();
    }else{
        for(let i = storageCount; i > 0; i--){
            try{
                let name = myStorage.getItem("ArtistName"+i);
                if(isIn(who, name)){
                    let desc = myStorage.getItem("ArtistDesc"+i);
                    let img = myStorage.getItem("ArtistImg"+i);
                    let id = myStorage.getItem("ArtistId"+i);
                    newArtist(name, desc, img, id, false);
                }
            }catch{} // If it fails means no data in that memory slot.
        }
    }
}

function isIn(str1, str2){ // Checks to see if str1 is in str2.
    let charStr1 = str1.split("");
    let charStr2 = str2.split("");
    if(charStr1.length > charStr2.length) return(false);
    let lettersCorrect = 0; // How many letters from str1 found so far in a row in str2.
    for(let i = 0; i < charStr2.length; i++){
        if(charStr1[lettersCorrect].toLowerCase() === charStr2[i].toLowerCase()) lettersCorrect++;
        else lettersCorrect = 0;
        if(lettersCorrect === charStr1.length) return(true);
    }
    return(false);
}

document.onreadystatechange = () => {
    if(document.readyState === "complete"){
        persistentDataReAdder();
    }
};
