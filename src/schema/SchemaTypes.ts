
//#region Character sheet

export type CharacterSchema = {
    name: string,
    gender: string,
    age: string,
    body: string,
    religion: string,
    job: string,
    family: string,
    portraitURL?: string,
    fraction?: string,
    origin?: string
}

//#endregion

//#region Skills sheet

export type SkillTableCollectionSchema = {
    act: SkillTableSchema,
    science: SkillTableSchema,
    social: SkillTableSchema
}

export type SkillsSchema = {
    allowedPoints: number,
    tables: SkillTableCollectionSchema
}

export type SkillTableSchema = {
    mindflashes: number,
    items: SkillItemSchema[],
}

export type SkillItemSchema = {
    name: string,
    points: number,
    bonusPoints: number
}

//#endregion

//#region Active sheet

export enum EffectType {
    MALUS = "malus",
    BONUS = "bonus",
    PROPERTY = "property",
    MUTATION = "mutation",
    ILLNESS = "illness",
    PHY_ILLNESS = "psy_illness"
}

export type EffectSchema = {
    name: string,
    effect: string,
    type: EffectType
}

export type ActiveSchemaHealth = {
    base: number,
    damage: number,
    armor: number
}

export type ActiveSchema = {
    item: string,
    notes: string,
    ammunition: number,
    health: ActiveSchemaHealth,
    // Lagacy: The name maluslist should be effect-list
    maluslist: EffectSchema[]
}

//#endregion

//#region Inventory sheet

export type ItemSchema = {
    name: string,
    amount: number,
    locked: boolean,
    weight: number
}

// Weapon types
export enum WeaponType {
    MELEE_DULL = "melee_dull",
    MELEE_SHARP = "melee_sharp",
    ONE_HAND = "one_hand",
    TWO_HAND = "two_hand",
}

export type WeaponSchema = {
    name: string,
    type: WeaponType,
    damage: string,
    category: string,
    locked: boolean,
    weight: number
}

export type InventorySchema = {
    allowedWeight: number,
    weightMalus: number,
    items: ItemSchema[],
    weapons: WeaponSchema[]
};

//#endregion


export type Schema = {
    character: CharacterSchema,
    active: ActiveSchema,
    skills: SkillsSchema,
    inventory: InventorySchema
}

export enum OverlayType {
    LICENSES
}

export type OverlaySchema = {
    current: OverlayType|undefined
}