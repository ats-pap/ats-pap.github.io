import { Popup } from "./PopupSystem";
import { Serializer } from "./serialisation/Serializer";
import { SheetActive } from "./sheets/SheetActive";
import { SheetCharacter } from "./sheets/SheetCharacter";
import { SheetInventory } from "./sheets/SheetInventory";
import { SheetSkills } from "./sheets/SheetSkills";
import { Toolbox } from "./Toolbox";
import { initUiBindings } from "./UiBindings";
import { GrowInputs } from "./utils/GrowInput";
import { StrongInputValidator } from "./utils/StrongInputValidator";

function onStart(){
    // Performs some preinits for general ui-stuff
    GrowInputs.onPreInit();
    StrongInputValidator.preInit();

    // Grabs the ui-bindings
    initUiBindings();

    // Inits some systems
    Popup.init();
    Toolbox.init();

    // Inits all sheets
    SheetInventory.init();
    SheetSkills.init();
    SheetActive.init();
    SheetCharacter.init();
}

window.onload=onStart;
