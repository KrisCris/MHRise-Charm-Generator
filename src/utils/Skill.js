import { skills_name as chs } from './lang/zh-hans.js'
import { skills_name as en } from './lang/en.js'
export default class Skill {
    static names = {
        'zh-hans': chs,
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