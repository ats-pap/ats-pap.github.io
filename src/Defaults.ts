import { EffectType, WeaponType, type ActiveSchema, type CharacterSchema, type EffectSchema, type InventorySchema, type ItemSchema, type Schema, type SkillItemSchema, type SkillsSchema, type WeaponSchema } from "./schema/SchemaTypes";

export const Defaults = {

    // This contains the defaults for various array-items that are dynamically added
    Arrays:{
        active: {
            maluslist: {
                name: "",
                effect: "",
                type: EffectType.MALUS
            } as EffectSchema
        },
        skills: {
            items: {
                name: "",
                points: 0,
                bonusPoints: 0
            } as SkillItemSchema
        },

        inventory:{
            items: {
                amount: 1,
                locked: false,
                name: "",
                weight: 10
            } as ItemSchema,

            weapons: {
                category: "Pistole",
                damage: "2W6",
                locked: false,
                name: "",
                type: WeaponType.ONE_HAND,
                weight: 10
            } as WeaponSchema
        }
    },

    // This contains the defaults for all sheets
    Sheet: {
        // Character sheet
        character: {
            name: "",
            gender: "",
            age: "",
            body: "",
            religion: "",
            job: "",
            family: "",
            fraction: "",
            origin: "",
            portraitURL: undefined
        } as CharacterSchema,

        // Active sheet
        active: {
            health: {
                armor: 0,
                base: 100,
                damage: 0
            },
            ammunition: 20,
            item: "",
            notes: "",
            maluslist: [

            ]
        } as ActiveSchema,

        // Skill sheet
        skills: {
            allowedPoints: 400,
            tables: {
                act: {
                    mindflashes: 0,
                    items: [] as any
                },
                science: {
                    mindflashes: 0,
                    items: [] as any
                },
                social: {
                    mindflashes: 0,
                    items: [] as any
                },
                magic: {
                    mindflashes: 0,
                    items: [] as any
                }
            }
        } as SkillsSchema,

        // Inventory sheet
        inventory: {
            allowedWeight: 400,
            weightMalus: 0,
            items: [] as any,
            weapons: [] as any
        } as InventorySchema,
    } as Schema
}