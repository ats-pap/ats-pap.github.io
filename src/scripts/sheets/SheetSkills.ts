import { SkillItemSchema, SkillTableCollectionSchema, SkillTableSchema as SkillTableSchema } from "../serialisation/Schemas";
import { getUiBindings, SkillTableCollection, SkillTableKey } from "../UiBindings";
import { Construct, GrowingItemSupplier  } from "../utils/GrowingItems";
import { GrowInputs } from "../utils/GrowInput";
import { create as C } from "../utils/HTMLBuilder";
import { StrongInputValidator } from "../utils/StrongInputValidator";
import { getNumberFromInput, toggleClass } from "../utils/Utils";
import { recalcPointsLeft, recalcSkillTable } from "./skills/SkillCalculator";
import { deserializeSkills, serializeSkills } from "./skills/SkillSerializer";

// Placeholder elements for the columns
const PLACEHOLDERS : {[x in keyof SkillTableCollection]: string} = {
    act: "Scheiße labern...",
    science: "Quantenphysik...",
    social: "Saufen..."
}

// Container for other elements that one grow-item holds
type Container = {
    value: HTMLInputElement,
    bonusPoints: HTMLInputElement
}

type SupplierList = {
    [x in keyof SkillTableCollection]: GrowingItemSupplier<Container, SkillItemSchema>
}

// List with grow-item suppliers (Will be initalized later on)
var suppliers: SupplierList = {} as any;

// Event: When a shadow-item gets turned into a real one
function onConvertElement(catKey: SkillTableKey, constr: Construct<Container>){
    // Removes the shadow-attribute
    constr.dom.classList.remove("shadow");

    // Creates the event-handler
    var handler = ()=>{
        SheetSkills.calculateTabel(catKey)
        SheetSkills.calculatePointsLeft();
    }

    // Adds the event handlers
    constr.with!.bonusPoints.addEventListener("input", handler);
    constr.with!.value.addEventListener("input", handler);
    
    // Recalculates that skill-tree
    handler();
}

// Event: When the malus/bonus points element get's updated
function onAddPointsUpdate(evt: Event){
    // Gets the points
    var pts = getNumberFromInput(evt.target as HTMLInputElement,0);

    // Toggles the class
    toggleClass(evt.target as HTMLInputElement, pts < 0, "negative");
}

// Updates the tables with the given skill-items
function setSkillItems(tables: SkillTableCollectionSchema){
    for(var tbl in tables){
        // Gets the handler
        var handler = suppliers[tbl as SkillTableKey];
        // Reset
        handler.clear();
        // Appends the items
        for(var row of tables[tbl as SkillTableKey].items)
            handler.addElement(row as SkillItemSchema);
    }
}

// Creates a shadow-slot for the given category
function createInventorySlot(catKey: SkillTableKey, cfg?: SkillItemSchema) : Construct<Container>{
    var isShadow = cfg === undefined;

    // Creates the input
    var inp = StrongInputValidator.bindEventTo(
        C<HTMLInputElement>("input", {attr: {type: "text", value: isShadow ? "" : cfg!.name, placeholder: PLACEHOLDERS[catKey]}})
    );

    // Creates the event-handler
    var handler = ()=>{
        SheetSkills.calculateTabel(catKey);
        SheetSkills.calculatePointsLeft();
    }
    
    // Creates the value field
    var value = GrowInputs.createGrowInput({
        maxlength: "3",
        type:"number",
        min:"0",
        max:"999",
        placeholder: "0",
        value: isShadow ? "0" : cfg!.points.toString(),
    });

    
    // Creates the bonus-points field
    var bonusPoints = GrowInputs.createGrowInput({
        maxlength: "4",
        type:"number",
        value: isShadow ? "0" : cfg!.bonusPoints.toString(),
        min:"-999",
        max:"999",
        placeholder: "0"
    });

    // Appends normal events
    if(!isShadow){
        value.input.addEventListener("input", handler);
        bonusPoints.input.addEventListener("input", handler);
    }

    // Appends the style-update event
    bonusPoints.input.addEventListener("input", onAddPointsUpdate);

    return {
        input: inp,
        with: {
            value: value.input,
            bonusPoints: bonusPoints.input
        },
        dom: C("tr", {cls: "onefield"+(isShadow ? " shadow" : ""), chld: [
            C("td", {cls: "name", chld: [
                inp,
                C("div", {cls: "seperator"})
            ]}),
            C("td", {cls: "value", chld: [
                value.dom,
                C("div", {cls: "seperator"})
            ]}),
            C("td", {cls: "bon-mal", chld: [
                bonusPoints.dom,
                C("div", {cls: "seperator"})
            ]}),
            C("td", {cls: "result autocalc", chld: [
                C("span", {text:"0"})
            ]}),
            
        ]})
    }
}

// Initalizes the skills-sheet
function init(){

    var tables = getUiBindings().skills.tables;

    // Inits the handlers
    for(var key in tables){
        const keyMap = key as SkillTableKey;
        suppliers[keyMap] = new GrowingItemSupplier(tables[keyMap].values, (cfg?: SkillItemSchema)=>createInventorySlot(keyMap, cfg), {
            onConvertShadow: constr=>onConvertElement(keyMap, constr)
        });
    }

    // Binds the recalculator to the points-left input
    getUiBindings().skills.points.allowed.addEventListener("input", SheetSkills.calculatePointsLeft);

    // Performs the inital calculations
    SheetSkills.calculatePointsLeft();
    for(var key in tables)
        SheetSkills.calculateTabel(key as SkillTableKey);
}

export const SheetSkills = {
    init,

    calculatePointsLeft: recalcPointsLeft,

    calculateTabel: recalcSkillTable,

    serialize: serializeSkills,
    deserialize: deserializeSkills,

    setSkillItems
}