import { getUiBindings } from "./UiBindings"
import { F, FA } from "./utils/Utils"

// Event: When the popup-close button is pressed
function onClose(){
    getUiBindings().popup.overlay.classList.remove("shown");
}

// Shows the sources-popup
function showSources(){
    getUiBindings().popup.overlay.classList.add("shown");
}

// Initalizes the popup-system
function init(){
    // Binds the close events
    Array.from(FA(".pop-close", getUiBindings().popup.overlay)).forEach(btn=>btn.addEventListener("click", onClose))
}

export const Popup = {
    showSources,

    init
}