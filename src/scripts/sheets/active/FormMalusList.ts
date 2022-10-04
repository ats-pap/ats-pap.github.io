import { MalusSchema } from "../../serialisation/Schemas";
import { getUiBindings, UiBindings } from "../../UiBindings";
import { Construct, GrowingItemSupplier } from "../../utils/GrowingItems";
import { GrowInputs } from "../../utils/GrowInput";
import { create as C } from "../../utils/HTMLBuilder";
import { getShortName, getXParent } from "../../utils/Utils";

// Container for other elements that one grow-item holds
type Container = {
    iDelete: HTMLElement
}

// Reference to the grow-items handler
var growItemHandler: GrowingItemSupplier<Container, MalusSchema>;


// Event: When the delete-icon get's clicked
const onDeleteClicked = (evt: Event)=>{
    // Gets the construct
    var constr: Construct<Container> = growItemHandler.getStructByInputOrDom(
        getXParent(evt.target! as HTMLElement, 2)
    );

    
    // Askes the user if the item shall be deleted
    var shouldDelete = confirm(`Möchtest du den Malus '${getShortName(constr.input.value, 20)}' wirklich löschen?`);
    
    if(!shouldDelete)
        return;

    // Delete the item
    growItemHandler.deleteNormalElement(constr);
    
}

// Event: When a shadow-item gets turned into a real one
function onConvertElement(constr: Construct<Container>){
    // Removes the shadow-attribute
    constr.dom.classList.remove("shadow");

    // Adds the event-listeners to the icons
    constr.with!.iDelete.addEventListener("click", onDeleteClicked);
}

function createInventorySlot(cfg?: MalusSchema) : Construct<Container>{
    // If the element is a shadow-object
    var isShadow = cfg === undefined;

    // Creates the input
    var inp =  GrowInputs.createGrowInput({
        placeholder: "Name",
        value: isShadow ? "" : cfg!.name
    });

    // Creates the icons
    var iDelete = C("i", {
        cls: "ic-delete",
        evts: {
            "click": isShadow ? undefined : onDeleteClicked
        }
    });

    return {
        input: inp.input,
        with: {
            iDelete
        },
        dom: C("div", {cls: "onefield"+(isShadow ? " shadow" : ""), chld: [
            C("div", {cls: "name", chld: [
                inp.dom,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "effect", chld: [
                C("input", { attr: {
                    placeholder: "Effekt des Malus",
                    value: isShadow ? "" : cfg!.effect
                }}),
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "delete", chld: [
                iDelete
            ]})            
        ]})
    }
}

export function getMalusGrowHandler(){
    return growItemHandler;
}

export function initFormMalus(){
    // Creates the grow-items handler for the items
    growItemHandler = new GrowingItemSupplier(getUiBindings().active.malusList, createInventorySlot, {
        onConvertShadow: onConvertElement
    });
}