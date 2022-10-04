import { Popup } from "./PopupSystem";
import { Serializer } from "./serialisation/Serializer";
import { getUiBindings } from "./UiBindings"

// Event: When the import-button get's clicked
function onImportFileUpload(evt: any){
    var file = evt.target.files[0];
    if (!file)
        return false;

    var reader = new FileReader();
    reader.onload = onFileRead;
    reader.readAsText(file);

    // Reset
    evt.target.value = "";
    return false;
}

// Event: When the user-selected file has been read
function onFileRead(evt: any){
    try{
        // Gets the content
        var cont = evt.target.result;

        // Tries to import it
        var error = Serializer.deserialize(JSON.parse(cont))
            
        if(error !== true){
            alert("Datei ist invalid/corrupted.");
            console.log(error);            
        }
    }catch(e){
        console.log(e);        
        alert("Fehler beim einlesen der Datei. Vmtl. invalides JSON.");
    }
}

// Event: When the export-button get's clicked
async function onExportClicked(){
    // Exports
    var data = await Serializer.serialize();

    // Creates the file
    var file = new Blob([JSON.stringify(data)],{
        endings: "native",
        type: "text/json"
    });

    // Generates the filename
    var filename = (data.character.name.trim().length <= 0 ? "" : data.character.name+"'s") + " Charakterbogen.json"

    // Creates an element to download the element
    var a = document.createElement("a");
    var url = a.href = URL.createObjectURL(file);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Initalizes the toolbox
function init(){

    var { download, sources, upload, importHelper } = getUiBindings().toolbox;

    // Binds the events
    sources.addEventListener("click", Popup.showSources);
    upload.addEventListener("click",()=>importHelper.click());
    download.addEventListener("click", onExportClicked);
    importHelper.addEventListener("change", onImportFileUpload);
}

export const Toolbox = {
    init
}