import { getUiBindings } from "../UiBindings"
import { deserializeCharacter, serializeCharacter } from "./character/CharacterSerializer";


// Event: When the user uploads an preview-image
function onUploadPreviewImage(evt: any){
    var file = evt.target.files[0];
    
    // Reset the upload-functionality
    evt.target.value = "";

    // Ensures a file got uploaded
    if (!file)
        return false;

    // Sets the file as the preview
    if(!setPortrait(file))
        alert("Es können nur Bilder hochgeladen werden");

    return false;

}

// Updates the portrait
// Returns false if the file is in an valid format
function setPortrait(file: File){
    // Validates file-type
    if(!["image/png","image/jpeg","image/gif"].includes(file.type)){
        // Notifies the user
        return false;
    }

    // Gets the bindings
    var preview = getUiBindings().character.portrait.display;

    // Unloads any previous image (if one was loaded)
    if(preview.dataset.image !== undefined)
        URL.revokeObjectURL(preview.dataset.image);

    // Creates the new url
    preview.dataset.image = URL.createObjectURL(file);

    // Updates the portrait
    getUiBindings().character.portrait.display.setAttribute("style", "background-image: url('"+preview.dataset.image+"')");

    return true;
}

// Initalizes the character sheet
function init(){

    // Gets the portrait-elements
    var { display, helperInput } = getUiBindings().character.portrait;

    // Forwards clicks
    display.addEventListener("click", ()=>helperInput.click());

    // Appends the upload-listener
    helperInput.addEventListener("change", onUploadPreviewImage);
}

export const SheetCharacter = {
    init,
    setPortrait,

    serialize: serializeCharacter,
    deserialize: deserializeCharacter
}