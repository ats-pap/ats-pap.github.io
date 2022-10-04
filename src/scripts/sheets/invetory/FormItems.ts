import { ItemSchema } from "../../serialisation/Schemas";
import { getUiBindings, UiBindings } from "../../UiBindings";
import { Construct, GrowingItemSupplier } from "../../utils/GrowingItems";
import { GrowInputs } from "../../utils/GrowInput";
import { create as C } from "../../utils/HTMLBuilder";
import { StrongInputValidator } from "../../utils/StrongInputValidator";
import { getShortName, getXParent, toggleEventListener } from "../../utils/Utils";
import { SheetActive } from "../SheetActive";
import { SheetInventory } from "../SheetInventory";

// Container for other elements that one grow-item holds
type Container = {
    iLock: HTMLElement,
    iEquip: HTMLElement,
    iDelete: HTMLElement,
    amount: HTMLInputElement
}

// Reference to the grow-items handler
var growItemHandler: GrowingItemSupplier<Container, ItemSchema>;

// Event: When the lock-icon get's clicked
const onLockClicked =(evt: Event)=>{
    // Gets the icon
    var icon = evt.target as HTMLElement;

    // Gets the base element
    var domBase = getXParent<HTMLDivElement>(icon, 3);

    // Gets the struct
    var str: Construct<Container> = growItemHandler.getStructByInputOrDom(domBase);

    // Toggles the locked-skill
    var gotUnlocked = domBase.classList.toggle("locked");

    // Updates the icon
    icon.className = gotUnlocked ? "ic-locked" : "ic-unlocked";

    // Toggles the event listener for equiping
    toggleEventListener(str.with!.iEquip, !gotUnlocked, "click", onEquipClicked);

    // Recalculates
    SheetInventory.calculateIteams();
}

// Event: When the delete-icon get's clicked
const onDeleteClicked = (evt: Event)=>{
    // Gets the construct
    var constr: Construct<Container> = growItemHandler.getStructByInputOrDom(
        getXParent(evt.target! as HTMLElement, 3)
    );
    
    // Askes the user if the item shall be deleted
    var shouldDelete = confirm(`Möchtest du das Item '${getShortName(constr.input.value, 20)}' wirklich löschen?`);
    
    if(!shouldDelete)
        return;

    // Delete the item
    growItemHandler.deleteNormalElement(constr);

    // Recalculates
    SheetInventory.calculateIteams();    
}

// Event: When the equip-icon get's clicked
const onEquipClicked = (evt: Event)=>{
    // Gets the construct
    var constr: Construct<Container> = growItemHandler.getStructByInputOrDom(
        getXParent(evt.target! as HTMLElement, 3)
    );

    // Selects the item
    SheetActive.selectItem(constr.with!.amount.value+"x "+constr.input.value);    
}

// Event: When a shadow-item gets turned into a real one
function onConvertElement(constr: Construct<Container>){
    // Removes the shadow-attribute
    constr.dom.classList.remove("shadow");

    // Adds the event-listeners to the icons
    constr.with!.iLock.addEventListener("click", onLockClicked);
    constr.with!.iEquip.addEventListener("click", onEquipClicked);
    constr.with!.iDelete.addEventListener("click", onDeleteClicked);

    // Recalculates
    SheetInventory.calculateIteams();
}

function createInventorySlot(cfg?: ItemSchema) : Construct<Container>{
    var isShadow = cfg === undefined;

    // Creates the input
    var inp = StrongInputValidator.bindEventTo(
        C<HTMLInputElement>("input", {attr: {
            type: "text",
            placeholder: "Item",
            value: isShadow ? "" : cfg!.name
        }})
    );

    // Creates the icons
    var iLock = C("i", {
        cls: isShadow || !cfg!.locked ? "ic-unlocked" : "ic-locked",
        evts: {
            "click": isShadow ? undefined : onLockClicked
        }
    });
    var iEquip = C("i", {
        cls: "ic-equip",
        evts: {
            "click": isShadow ? undefined : onEquipClicked
        }
    });
    var iDelete = C("i", {
        cls: "ic-delete",
        evts: {
            "click": isShadow ? undefined : onDeleteClicked
        }
    });

    // Creates the amount field
    var amount = GrowInputs.createGrowInput({
        maxlength: "5",
        type:"number",
        value: isShadow ? "1" : cfg!.amount.toString(),
        min:"1",
        max:"99999",
        placeholder: "1"
    });

    return {
        input: inp,
        with: {
            iDelete,
            iEquip,
            iLock,
            amount: amount.input
        },
        dom: C("div", {cls: "onefield"+(isShadow ? " shadow" : "")+(isShadow || !cfg!.locked ? "" : " locked"), chld: [
            C("div", {cls: "amt", chld: [
                amount.dom
            ]}),
            C("div", {cls: "times", chld: [
                C("span", {text: "x"})
            ]}),
            C("div", {cls: "name", chld: [
                inp,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "actions", chld: [
                C("div", {chld: [
                    iLock,
                    iEquip,
                    iDelete,
                ]})
            ]}),
            
        ]})
    }
}

export function getItemsGrowHandler(){
    return growItemHandler;
}

export function initFormItems(){
    // Creates the grow-items handler for the items
    growItemHandler = new GrowingItemSupplier(getUiBindings().inventory.itemList.table, createInventorySlot, {
        onConvertShadow: onConvertElement
    });
}