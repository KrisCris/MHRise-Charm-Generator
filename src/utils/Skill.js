import { zh_hans } from './lang/zh-hans.js'
import { zh_hant } from './lang/zh-hant.js'
import { en } from './lang/en.js'
export default class Skill {
    static names = {
        'zh-hans': zh_hans,
        'zh-hant': zh_hant,
        'en': en
    }
    id;
    rare;
    maxLvl;
    selected;

    getName(lang){
        return Skill.names[lang][this.id];
    }

    constructor(id, rare, lvl1, lvl2) {
        this.id = id;
        this.rare = rare;
        this.maxLvl = [lvl1, lvl2];
        this.selected = false;
    }

}