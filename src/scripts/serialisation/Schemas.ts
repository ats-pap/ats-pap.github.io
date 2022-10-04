import { SkillTableCollection } from "../UiBindings";

// Weapon types
export enum WeaponType {
    MELEE_DULL = "melee_dull",
    MELEE_SHARP = "melee_sharp",
    ONE_HAND = "one_hand",
    TWO_HAND = "two_hand",
}

// Schema for a skill-table
const ACT_TABLE_SCHEMA = {
    type: "object",
    
    required: [
        "mindflashes",
        "items"
    ],

    properties: {
        mindflashes: {
            type: "integer",
            minimum: 0
        },
        items: {
            type: "array",
            items: {
                type: "object",
                required: [
                    "name",
                    "points",
                    "bonusPoints"
                ],
                properties: {
                    name: { type: "string" },
                    points: { type: "integer", minimum: 0, maximum: 999 },
                    bonusPoints: { type: "integer", minimum: -999, maximum: 999 }
                }
            }
        }
    }
}

// General json-schema
export const SCHEMA = {
    type: "object",
    required: [
        "character",
        "active",
        "skills",
        "inventory"
    ],
    properties: {
        character: {
            type: "object",
            required: [
                "name",
                "gender",
                "age",
                "body",
                "religion",
                "job",
                "family"
            ],
            properties: {
                name: { type: "string" },
                gender: { type: "string" },
                age: { type: "string" },
                body: { type: "string" },
                religion: { type: "string" },
                job: { type: "string" },
                family: { type: "string" },
                portrait: {
                    type: "string",
                    pattern: "^data:image\/(png|jp(e)?g|gif);base64,[a-zA-Z0-9\/+]+={0,2}$"
                }
            }
        },

        active: {
            type: "object",
            required: [
                "maluslist",
                "health",
                "item",
                "notes",
                "ammunition"
            ],

            properties: {
                maluslist: {
                    type: "array",
                    items: {
                        type: "object",
                        required: [
                            "name",
                            "effect"
                        ],
                        properties: {
                            name: { type: "string" },
                            effect: { type: "string" }
                        }
                    }
                },
                ammunition: {
                    type: "integer",
                    minimum: 0,
                    maximum: 99999
                },
                health: {
                    type: "object",
                    properties: {
                        base: { type: "integer", minimum: 0, maximum: 999 },
                        damage: { type: "integer", minimum: 0, maximum: 999 },
                        armor: { type: "integer", minimum: 0, maximum: 999 },
                    }
                },
                item: { type: "string" },
                notes: { type: "string" }
            }
        },

        skills: {
            type: "object",

            required: [
                "allowedPoints",
                "tables"
            ],

            properties: {
                allowedPoints: {
                    type: "integer",
                    minimum: 0,
                    maximum: 999
                },
                tables: {
                    type: "object",
                    required: [
                        "act",
                        "social",
                        "science"
                    ],
                    properties: {
                        act: ACT_TABLE_SCHEMA,
                        social: ACT_TABLE_SCHEMA,
                        science: ACT_TABLE_SCHEMA
                    }
                }
            }
        },

        inventory: {
            type: "object",

            required: [
                "items",
                "weapons"
            ],

            properties: {
                items: {
                    type: "array",

                    items: {
                        type: "object",

                        required: [
                            "name",
                            "amount",
                            "locked"
                        ],

                        properties: {
                            name: { type: "string" },
                            amount: { type: "integer", minimum: 1, maximum: 99999 },
                            locked: { type: "boolean" }
                        }
                    }
                },
                weapons: {
                    type: "array",

                    items: {
                        type: "object",

                        required: [
                            "name",
                            "type",
                            "damage",
                            "category",
                            "locked"
                        ],

                        properties: {
                            name: { type: "string" },
                            type: { type: "string", enum: ["melee_dull", "melee_sharp", "one_hand", "two_hand"] },
                            damage: { type: "string" },
                            category: { type: "string" },
                            locked: { type: "boolean" }
                        }
                    }
                },
            }
        }
    }
};

export type SkillItemSchema = {
    name: string,
    points: number,
    bonusPoints: number
}

export type SkillTableSchema = {
    mindflashes: number,
    items: SkillItemSchema[],
}

export type CharacterSchema = {
    name: string,
    gender: string,
    age: string,
    body: string,
    religion: string,
    job: string,
    family: string,
    portrait?: string
}

export type MalusSchema = {
    name: string,
    effect: string
}

export type ActiveSchema = {
    item: string,
    notes: string,
    ammunition: number,
    health: {
        base: number,
        damage: number,
        armor: number
    },
    maluslist: MalusSchema[]
}

export type SkillTableCollectionSchema = {
    [key in keyof SkillTableCollection]: SkillTableSchema
}

export type SkillsSchema = {
    allowedPoints: number,
    tables: SkillTableCollectionSchema
}

export type ItemSchema = {
    name: string,
    amount: number,
    locked: boolean
}

export type WeaponSchema = {
    name: string,
    type: WeaponType,
    damage: string,
    category: string,
    locked: boolean
}

export type InventorySchema = {
    items: ItemSchema[],
    weapons: WeaponSchema[]
};

export type Schema = {
    character: CharacterSchema,
    active: ActiveSchema,
    skills: SkillsSchema,
    inventory: InventorySchema
}