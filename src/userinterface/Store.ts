
import type { ActiveSchema, CharacterSchema, EffectSchema, InventorySchema, SkillItemSchema, SkillsSchema, SkillTableCollectionSchema, ItemSchema, WeaponSchema, OverlaySchema, OverlayType, SkillTableSchema } from "@/schema/SchemaTypes";
import { defineStore } from "pinia";

export const useStore = defineStore("base", {
    state: ()=> { return {
        
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

        // Internal app data
        app: {
            overlay: {
                current: undefined
            } as OverlaySchema
        }
    }},

    getters: {
        // Returns the function to calculate the amount of category points of a given table
        skills_get_category_points(){
            return (tbl: keyof SkillTableCollectionSchema)=>(
                Math.round(this.skills.tables[tbl].items.map(row=>row.points).reduce((a,b)=>a+b, 0) / 10)
            )
        }
    },

    actions: {
        // Adds a new item to the given skill table
        skills_registerNewItem(table: keyof SkillTableCollectionSchema, item: SkillItemSchema){
            this.skills.tables[table].items.push(item);
        },

        // Removes a item from the given skill table
        skills_removeItem(table: keyof SkillTableCollectionSchema, item: SkillItemSchema){
            this.skills.tables[table].items = this.skills.tables[table].items.filter(itm=>itm!=item);
        },


        // Adds a new item to the effect list
        active_registerEffect(item: EffectSchema){
            this.active.maluslist.push(item);
        },

        // Removes a item from the effect list
        active_removeItem(item: EffectSchema){
            this.active.maluslist = this.active.maluslist.filter(itm=>itm!=item);
        },



        // Adds a new item to the inventory
        inventory_registerItem(item: ItemSchema){
            this.inventory.items.push(item);
        },

        // Removes a item from the inventory
        inventory_removeItem(item: ItemSchema){
            this.inventory.items = this.inventory.items.filter(itm=>itm!=item);
        },


        // Adds a new item to the inventory
        inventory_registerWeapon(item: WeaponSchema){
            this.inventory.weapons.push(item);
        },

        // Removes a item from the inventory
        inventory_removeWeapon(item: WeaponSchema){
            this.inventory.weapons = this.inventory.weapons.filter(itm=>itm!=item);
        },

        overlay_open(type: OverlayType){
            this.app.overlay.current = type;
        },
        overlay_close(){
            this.app.overlay.current = undefined;
        }
    }
});