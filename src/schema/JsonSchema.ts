import { EffectType, WeaponType } from "./SchemaTypes";

// Changes/Defaults for the given json-schema
export const CHANGE_DEFAULTS = {
    "inventory.items.weight": 10,
    "inventory.weapons.weight": 10,
    "inventory.allowedWeight": 400,
    "inventory.weightMalus": 0
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
                allowedWeight: { type: "integer", minimum: 0, maximum: 99999 },
                weightMalus: { type: "integer", minimum: -9999, maximum: 9999 },
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
                            locked: { type: "boolean" },
                            weight: { type: "integer", minimum: 0, maximum: 99999 }
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
                            weight: { type: "integer", minimum: 0, maximum: 99999 }
                        }
                    }
                },
            }
        }
    }
};
