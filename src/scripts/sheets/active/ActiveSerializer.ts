import { ActiveSchema, EffectType } from "../../serialisation/Schemas";
import { getUiBindings } from "../../UiBindings";
import { F, getNumberFromInput, SHADOW_FILTER } from "../../utils/Utils";
import { SheetActive } from "../SheetActive";
import { getEffectlistGrowHandler } from "./FormEffectList";

// Serializes the health
function serializeHealth(){
    var { armor, base, damage } = getUiBindings().active.health;

    return {
        base: getNumberFromInput(base, 0),
        damage: getNumberFromInput(damage, 0),
        armor: getNumberFromInput(armor, 0),
    }
}

// Serializes the effectlist
function serializeEffectList(){
    // Serializes a single effect-row
    function serializeRow(row: HTMLDivElement){
        // Gets name, effect and type
        var name = F<HTMLInputElement>("input",F(".name",row)).value;
        var effect = F<HTMLInputElement>("input",F(".effect",row)).value;
        var type = F(".type",row).dataset.type as EffectType;

        return {
            name,
            effect,
            type
        }
    }
    
    // Gets all rows (Effects) and maps them to their required form
    return Array.from(getUiBindings().active.effectList.children)
                .filter(SHADOW_FILTER as any)
                .filter(row=>row.tagName === "DIV")
                .map(serializeRow as any);
}

// Deserializes the active-sheet
export function deserializeActive(raw: ActiveSchema){
    // Gets bindings
    var { health, notes, ammunition } = getUiBindings().active

    const setWithEvent=(inp: HTMLInputElement, base: number)=>{
        inp.valueAsNumber = base;
        inp.dispatchEvent(new Event("input"));
    }

    // Sets health values
    setWithEvent(health.armor, raw.health.armor);
    setWithEvent(health.base, raw.health.base);
    setWithEvent(health.damage, raw.health.damage);
    
    // Sets the ammunition
    ammunition.valueAsNumber = raw.ammunition;

    // Selects item
    SheetActive.selectItem(raw.item);

    // Updates notes
    notes.value = raw.notes;

    // Clears and updates effects-list
    var effectHandler = getEffectlistGrowHandler();
    effectHandler.clear();
    // Lagacy: Should be effect-list
    for(var effect of raw.maluslist)
        effectHandler.addElement(effect);
}

// Serializes the active-sheet
export function serializeActive(){

    // Gets the item-input and notes-textfield
    var {selectedItem, notes, ammunition } = getUiBindings().active;

    return {
        // Lagacy: Should be effect-list
        maluslist: serializeEffectList(),
        health: serializeHealth(),
        item: selectedItem.value,
        notes: notes.value,
        ammunition: getNumberFromInput(ammunition,0)
    }
}