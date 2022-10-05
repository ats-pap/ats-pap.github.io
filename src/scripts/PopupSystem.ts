import { getUiBindings } from "./UiBindings"
import { FA } from "./utils/Utils"

// Closes the popup
function close(){
    getUiBindings().popup.overlay.classList.remove("shown");
}

// Shows the sources-popup
function showSources(){
    getUiBindings().popup.overlay.classList.add("shown");
}

// Initalizes the popup-system
function init(){
    // Binds the close events
    Array.from(FA(".pop-close", getUiBindings().popup.overlay)).forEach(btn=>btn.addEventListener("click", close));

    Popup.close();
}

export const Popup = {
    showSources,

    init,
    close
}