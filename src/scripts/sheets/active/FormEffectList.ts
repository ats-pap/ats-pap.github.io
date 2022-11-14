import { EffectType, EffectSchema } from "../../serialisation/Schemas";
import { getUiBindings, UiBindings } from "../../UiBindings";
import { Construct, GrowingItemSupplier } from "../../utils/GrowingItems";
import { GrowInputs } from "../../utils/GrowInput";
import { create as C } from "../../utils/HTMLBuilder";
import { changeToNext, F, getShortName, getXParent } from "../../utils/Utils";

// Container for other elements that one grow-item holds
type Container = {
    iDelete: HTMLElement
}

// Reference to the grow-items handler
var growItemHandler: GrowingItemSupplier<Container, EffectSchema>;

// Mappings from effect-types to icons
var EFFECT_ICON : {[x in EffectType]: string} = {
    [EffectType.BONUS]: "ic-bonus",
    [EffectType.MALUS]: "ic-malus",
    [EffectType.PROPERTY]: "ic-property",
    [EffectType.MUTATION]: "ic-mutation"
}

// Mappings from effect-types to names
var EFFECT_NAMES: {[x in EffectType]: string} = {
    [EffectType.BONUS]: "Bonus",
    [EffectType.MALUS]: "Malus",
    [EffectType.PROPERTY]: "Eigenschaft",
    [EffectType.MUTATION]: "Mutation"
}

// Event: When the delete-icon get's clicked
const onDeleteClicked = (evt: Event)=>{
    // Gets the construct
    var constr: Construct<Container> = growItemHandler.getStructByInputOrDom(
        getXParent(evt.target! as HTMLElement, 2)
    );
    
    // Askes the user if the item shall be deleted
    var shouldDelete = confirm(`Möchtest du den Effekt '${getShortName(constr.input.value, 20)}' wirklich löschen?`);
    
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

// Event: When the type changes 
function onTypeChanged(value: EffectType, base: HTMLElement){
    // Gets the icon-element and text-element
    var icon = F("i", base);
    var text = F("span", base);

    // Updates the elements
    icon.className = EFFECT_ICON[value];
    text.textContent = EFFECT_NAMES[value];
}

function createInventorySlot(cfg?: EffectSchema) : Construct<Container>{
    // If the element is a shadow-object
    var isShadow = cfg === undefined;

    // Gets the type
    // Lagacy: Malus must be the default type if no type is given (From formats that didn't have effect-lists)
    var type = cfg?.type ?? EffectType.MALUS; 

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

    // Creates the type-selector
    var typeSelector = C("div", {cls: "type", chld: [
        C("i",{cls: EFFECT_ICON[type]}),
        C("span", {text: EFFECT_NAMES[type]}),
        C("div", {cls: "seperator"})
    ], evts: {
        "click": (evt: Event)=> changeToNext(EffectType, onTypeChanged, evt.currentTarget! as HTMLElement)
    }});
    typeSelector.dataset.type = type;

    return {
        input: inp.input,
        with: {
            iDelete
        },
        dom: C("div", {cls: "onefield"+(isShadow ? " shadow" : ""), chld: [
            typeSelector,
            C("div", {cls: "name", chld: [
                inp.dom,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "effect", chld: [
                C("input", { attr: {
                    placeholder: "Tatsächlicher Effekt",
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

export function getEffectlistGrowHandler(){
    return growItemHandler;
}

export function initFormEffectlist(){
    // Creates the grow-items handler for the items
    growItemHandler = new GrowingItemSupplier(getUiBindings().active.effectList, createInventorySlot, {
        onConvertShadow: onConvertElement
    });
}