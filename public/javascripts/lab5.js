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
        form.setAttribute("action", "/newArtist");
        form.setAttribute("method", "POST");
        inputName.id = "AAF-name";
        inputName.setAttribute("name", "name");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "Artist name");
        inputName.setAttribute("maxlength", 40);
        inputDesc.id = "AAF-desc";
        inputDesc.setAttribute("name", "description");
        inputDesc.setAttribute("type", "text");
        inputDesc.setAttribute("placeholder", "Artist Desc");
        inputDesc.setAttribute("maxlength", 40);
        inputImg.id = "AAF-img";
        inputImg.setAttribute("name", "image");
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
