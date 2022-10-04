import { WeaponSchema, WeaponType } from "../../serialisation/Schemas";
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
    category: HTMLInputElement,
    damage: HTMLInputElement,
    type: HTMLElement
}

// Mappings from weapon-types to icons
var WEAPON_TYPE_ICON = {
    [WeaponType.MELEE_DULL]: "ic-policestick",
    [WeaponType.MELEE_SHARP]: "ic-sword",
    [WeaponType.ONE_HAND]: "ic-pistole",
    [WeaponType.TWO_HAND]: "ic-sniper"
}

// Reference to the grow-weapons handler
var growItemHandler: GrowingItemSupplier<Container, WeaponSchema>;

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
    SheetInventory.calculateWeapons();
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
    SheetInventory.calculateWeapons();    
}

// Event: When the equip-icon get's clicked
const onEquipClicked = (evt: Event)=>{
    // Gets the construct
    var constr: Construct<Container> = growItemHandler.getStructByInputOrDom(
        getXParent(evt.target! as HTMLElement, 3)
    );

    // Selects the item
    SheetActive.selectItem(constr.input.value);
}

// Event: When the weapon-type icon get's clicked
const onTypeIconClicked = (evt: Event) => {
    // Gets the icon
    var icon = (evt.target as HTMLElement)

    // Gets the current weapon
    var weapon = icon.dataset.weapon as WeaponType;

    // Gets the next weapon-index
    var next = Object.values(WeaponType).indexOf(weapon)+1;

    if(next >= Object.keys(WeaponType).length)
        next=0;

    // Gets the next weapon
    var nxtWeapon = Object.values(WeaponType)[next];

    // Updates the icons data value and class
    icon.dataset.weapon = nxtWeapon;
    icon.className = WEAPON_TYPE_ICON[nxtWeapon];
}

// Event: When a shadow-item gets turned into a real one
function onConvertElement(constr: Construct<Container>){
    // Removes the shadow-attribute
    constr.dom.classList.remove("shadow");

    // Adds the event-listeners to the icons
    constr.with!.iLock.addEventListener("click", onLockClicked);
    constr.with!.iEquip.addEventListener("click", onEquipClicked);
    constr.with!.iDelete.addEventListener("click", onDeleteClicked);
    constr.with!.type.addEventListener("click", onTypeIconClicked);

    // Recalculates
    SheetInventory.calculateWeapons();
}

function createInventorySlot(cfg?: WeaponSchema) : Construct<Container>{
    var isShadow = cfg === undefined;

    // Base weapon-type
    var BASE_WP = isShadow ? WeaponType.ONE_HAND : cfg!.type;

    // Creates the input
    var inp = StrongInputValidator.bindEventTo(
        C<HTMLInputElement>("input", {attr: {type: "text", value: isShadow ? "" : cfg!.name, placeholder: "Waffenname"}})
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

    var iWeapons = C("i", {
        cls: WEAPON_TYPE_ICON[BASE_WP],
        evts: {
            "click": isShadow ? undefined : onTypeIconClicked
        }
    });
    iWeapons.dataset.weapon = BASE_WP;

    // Category-selector
    var category = GrowInputs.createGrowInput({
        value: isShadow ? "Pistole" : cfg!.category
    });

    // Damage-selector
    var damage = GrowInputs.createGrowInput({
        maxlength: "20",
        value: isShadow ? "2W6" : cfg!.damage
    });

    return {
        input: inp,
        with: {
            iDelete,
            iEquip,
            iLock,
            type: iWeapons,
            category: category.input,
            damage: damage.input
        },
        dom: C("div", {cls: "onefield"+(isShadow ? " shadow" : "")+(isShadow || !cfg!.locked ? "" : " locked"), chld: [
            C("div", {cls: "icon", chld: [
                iWeapons,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "category", chld: [
                category.dom,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "name", chld: [
                inp,
                C("div", {cls: "seperator"})
            ]}),
            C("div", {cls: "damage", chld: [
                damage.dom,
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

export function getWeaponsGrowHandler(){
    return growItemHandler;
}

export function initFormWeapons(){
    // Creates the grow-items handler for the items
    growItemHandler = new GrowingItemSupplier(getUiBindings().inventory.weaponsList.table, createInventorySlot, {
        onConvertShadow: onConvertElement,
        autoDelete: false
    });
}