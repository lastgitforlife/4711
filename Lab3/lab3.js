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
        inputSubmit.setAttribute("type", "button");
        inputSubmit.setAttribute("value", "Add");
        inputSubmit.setAttribute("onClick", "newArtist()");
        form.appendChild(inputName);
        form.appendChild(inputDesc);
        form.appendChild(inputImg);
        form.appendChild(inputSubmit);
        document.getElementById("DirectoryOutput").appendChild(form);
    }
}

function newArtist() {
    try{
        let name = document.getElementById("AAF-name").value;
        let desc = document.getElementById("AAF-desc").value;
        let img = document.getElementById("AAF-img").value;
        addArtist();
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
        deleteBtn.addEventListener("click", f => {artistDiv.remove()});
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

function deleteParent(id){
    let idb = document.getElementById(id);
    console.log(dib);
}
//
// <div class="Artist">
//     <img src="https://randomuser.me/api/portraits/med/women/2.jpg"  alt="Artist woman 2"/>
//     <div class="ArtistInfo">
//          <h3>Kim</h3>
//          <p>Looking for art</p>
//             <button></button>
//     </div>
// </div>