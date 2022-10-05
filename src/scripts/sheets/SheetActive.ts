import { getUiBindings } from "../UiBindings";
import { getNumberFromInput } from "../utils/Utils";
import { recalcHealth } from "./active/ActiveCalculator";
import { deserializeActive, serializeActive } from "./active/ActiveSerializer";
import { initFormEffectlist } from "./active/FormEffectList";

// Event: When the delete selected-item icon is clicked
const onSelectItemDeleteClicked=()=>{
    // Resets the field
    selectItem("");
}

// Event: When the shoot button get's clicked
const onShootButtonClicked=()=>{
    // Updates the field
    var inp = getUiBindings().active.ammunition;

    // Gets the current value
    var value = getNumberFromInput(inp, 0);

    // Checks if enought ammunition is given
    if(value <= 0){
        alert("Du hast keine Munition mehr.");
        return;
    }

    // Decreases the ammunition
    inp.valueAsNumber = value-1;
}

// Takes in the description of an item and puts than into the selected-item box
function selectItem(description: string) {
    // Gets the field
    var fld = getUiBindings().active.selectedItem;
    fld.value = description;
    fld.dispatchEvent(new Event("input"));          
}

// Binds the calulators to the items
function bindCalculators(){

    // Filters all inputs and appends the event listener
    Object.values(getUiBindings().active.health)
        .filter(obj=>obj.tagName === "INPUT")
        .forEach(inp=>inp.addEventListener("input", recalcHealth));

}

// Used to initalize the sheet
function init(){

    // Inits the effectlist-form
    initFormEffectlist();

    // Binds the delete-selected-item evemt
    getUiBindings().active.iDeleteSelectItem.addEventListener("click", onSelectItemDeleteClicked);
    getUiBindings().active.iShoot.addEventListener("click", onShootButtonClicked);

    // Binds the calculation-events
    bindCalculators();

    // Performs the first calculation
    SheetActive.calculateHealth();
}

export const SheetActive = {
    init,
    selectItem,

    calculateHealth: recalcHealth,

    serialize: serializeActive,
    deserialize: deserializeActive
}