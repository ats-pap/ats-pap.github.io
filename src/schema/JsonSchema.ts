import { Defaults } from "@/Defaults";
import { EffectType, WeaponType } from "./SchemaTypes";

// Changes/Defaults for the given json-schema
export const CHANGE_DEFAULTS = {
    "inventory.items.weight": Defaults.Arrays.inventory.items.weight,
    "inventory.weapons.weight": Defaults.Arrays.inventory.weapons.weight,
    "inventory.allowedWeight": Defaults.Sheet.inventory.allowedWeight,
    "inventory.weightMalus": Defaults.Sheet.inventory.weightMalus,
    "active.maluslist.type": EffectType.MALUS,
    "skills.tables.magic": Defaults.Sheet.skills.tables.magic
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
            // Legacy: Deprecated, will only be used here until all files have been converted
            type: ["integer", "string"],
            minimum: 0,
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
                    points: { type: "integer" },
                    bonusPoints: { type: "integer" }
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
                // Lagacy: The name malus-list should be effect-list
                "maluslist",
                "health",
                "item",
                "notes",
                "ammunition"
            ],

            properties: {
                // Lagacy: The name malus-list should be effect-list
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
                            effect: { type: "string" },
                            type: { type: "string", enum: (Object as any).values(EffectType) }
                        }
                    }
                },
                ammunition: {
                    type: "integer"
                },
                health: {
                    type: "object",
                    properties: {
                        base: { type: "integer"},
                        damage: { type: "integer" },
                        armor: { type: "integer" },
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
                    type: "integer"
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
                allowedWeight: { type: "integer" },
                weightMalus: { type: "integer" },
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
                            amount: { type: "integer" },
                            locked: { type: "boolean" },
                            weight: { type: "integer" }
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
                            type: { type: "string", enum: (Object as any).values(WeaponType)},
                            damage: { type: "string" },
                            category: { type: "string" },
                            locked: { type: "boolean" },
                            weight: { type: "integer" }
                        }
                    }
                },
            }
        }
    }
};
