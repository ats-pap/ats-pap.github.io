import { F, FA } from "./utils/Utils";

export type InventoryList = {
    // Table-body with all rows of the list
    table: HTMLTableSectionElement,
    // Display for the amount of unlocked elements
    unlockedDisplay: HTMLSpanElement
    // Display for the amount of element
    amountDisplay: HTMLSpanElement
}
export type ActiveHealth = {
    // Base, armor and damage of and to the player
    base: HTMLInputElement,
    armor: HTMLInputElement,
    damage: HTMLInputElement,

    // Display for the calculated health
    display: HTMLSpanElement
}
export type SkillTable = {
    // Table with all rows of the skills
    values: HTMLTableSectionElement,
    // Display for the combined calcualted extra-points per category
    categoryPoints: HTMLSpanElement,

    // How many mind-flashes the category has left
    mindflashesLeft: HTMLInputElement,
    // How many mindflashes the category has
    mindflashesTotal: HTMLSpanElement
}

export type CharacterBindings = {
    portrait: {
        // File-chooser-input
        helperInput: HTMLInputElement,
        // Where the selected portrait will be displayed
        display: HTMLDivElement
    },
    name: HTMLInputElement,
    gender: HTMLInputElement,
    age: HTMLInputElement,
    body: HTMLInputElement,
    religion: HTMLInputElement,
    job: HTMLInputElement,
    family: HTMLInputElement
}

export type SkillTableKey = keyof SkillTableCollection;
export type SkillTableCollection = {
    act: SkillTable,
    science: SkillTable
    social: SkillTable
}

export type SkillBindings = {
    // Category-tables
    tables: SkillTableCollection

    // Point display
    points: {
        allowed: HTMLInputElement,
        spent: HTMLSpanElement
    }
}
export type InventoryBindings = {
    itemList: InventoryList,
    weaponsList: InventoryList
}
export type ActiveBindings = {
    effectList: HTMLDivElement,
    iDeleteSelectItem: HTMLElement,
    iShoot: HTMLElement,
    selectedItem: HTMLInputElement,
    ammunition: HTMLInputElement,

    notes: HTMLTextAreaElement,

    health: ActiveHealth
}

export type PopupBindings = {
    overlay: HTMLDivElement,

    popups: {
        sources: HTMLDivElement
    }
}

export type ToolboxBinding = {
    upload: HTMLDivElement,
    download: HTMLDivElement,
    sources: HTMLDivElement,
    importHelper: HTMLInputElement
}

export type UiBindings = {
    inventory: InventoryBindings,
    skills: SkillBindings,
    active: ActiveBindings,
    character: CharacterBindings,

    popup: PopupBindings,

    toolbox: ToolboxBinding
}

// Contains the bindings to the ui-form
var uiBindings: UiBindings;

// Returns the character-bindings
function getCharacterBindings() : CharacterBindings{
    // Gets the sheet
    var sheet = F(".sheet.character");

    // Gets the portrait-base
    var portBase = F(".portrait",sheet);

    return {
        portrait: {
            display: F("div",portBase),
            helperInput: F("input",portBase),
        },
        age: F("#character-age", sheet),
        body: F("#character-body", sheet),
        family: F("#character-family", sheet),
        gender: F("#character-gender", sheet),
        job: F("#character-job", sheet),
        name: F("#character-name", sheet),
        religion: F("#character-religion", sheet)
    }
}

// Returns the skill-point bindings
function getSkillPointBindings(){
    // Gets the base
    var base = F("#skills-points");

    return {
        allowed: F<HTMLInputElement>("input",base),
        spent: F<HTMLSpanElement>("span",base),
    }
}

// Returns the skill-bindings for a single skill-category
function getSkillTableBindings(skill: string) : SkillTable{
    // Gets the head
    var head = F<HTMLTableElement>(`#skills${skill}Head`);

    // Gets the parent elements of the category-value- and mindflash- displays
    var [pointsBase, mindflashBase] = F<HTMLTableRowElement>(".values", head).children as any as HTMLTableCellElement[];

    // Gets the category-points display
    var catPointsDisplay = F<HTMLSpanElement>("span", pointsBase);

    // Gets the mind-flash displays
    var mindflashesTotal = F<HTMLSpanElement>("span.autocalc", mindflashBase);
    var mindflashesLeft = F<HTMLInputElement>("input", mindflashBase);

    return {
        categoryPoints: catPointsDisplay,
        mindflashesLeft: mindflashesLeft,
        mindflashesTotal: mindflashesTotal,
        values: F<HTMLTableSectionElement>(`#skills${skill}`)
    }
}

// Returns the bindings for the health of the active sheet
function getActiveHealthBindings() : ActiveHealth{
    // Gets the general sheet
    var sheet = F(".sheet.active");

    return {
        armor: F<HTMLInputElement>("input", F(".armor", sheet)),
        base: F<HTMLInputElement>("input", F(".health", sheet)),
        damage: F<HTMLInputElement>("input", F(".damage", sheet)),

        display: F<HTMLSpanElement>("span", F(".health-left", sheet))
    }
}

// Returns an inventory-list-item from the given list-name
function getInventoryList(listName: string) : InventoryList{

    // Gets the display-base
    var dpBase = FA<HTMLSpanElement>("span",F(`#inv-${listName}-display`));

    return {
        table: F(`#inv-${listName}`),
        amountDisplay: dpBase[1],
        unlockedDisplay: dpBase[0]
    }
}

// Returns the toolbox-bindings
function getToolboxBindings() : ToolboxBinding{

    // Gets the toolbox-base
    var base = F(".toolbox");

    return {
        download: F(".download", base),
        sources: F(".sources", base),
        upload: F(".upload", base),
        importHelper: F(".uploadHelper")
    }
}

// Grabs the ui-bindings
export function initUiBindings(){
    // Grabs the ui-bindings
    uiBindings = {

        inventory: {
            itemList: getInventoryList("items"),
            weaponsList: getInventoryList("weapons")
        },

        active: {
            effectList: F("#act-effect-list"),
            selectedItem: F("#act-selected-item"),
            iDeleteSelectItem: F("#act-del-selected-item"),
            ammunition: F("#act-ammunition"),
            iShoot: F("#act-shoot"),

            notes: F("textarea", F(".sheet.active")),

            health: getActiveHealthBindings()
        },

        skills: {
            tables: {
                act: getSkillTableBindings("Act"),
                science: getSkillTableBindings("Science"),
                social: getSkillTableBindings("Social"),
            },

            points: getSkillPointBindings()
        },

        character: getCharacterBindings(),

        popup: {
            overlay: F(".overlay-base"),
            popups: {
                sources: F(".overlay.sources")
            }
        },

        toolbox: getToolboxBindings()
    };
}

export function getUiBindings() : UiBindings{
    return uiBindings;
}