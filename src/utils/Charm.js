export default class Charm {
    static RARE = 269484038;
    skill1;
    skill2;
    deco;

    constructor(skill1, skill2, lv4DecoSettings = 0) {
        this.skill1 = skill1;
        this.skill2 = skill2;
        this.deco = this.maxDeco(skill1, skill2, lv4DecoSettings);
    }

    maxDeco(skill1, skill2, lv4DecoSettings) {
        if (lv4DecoSettings == 1) {
            return [4, 0, 0];
        }
        if (skill1.rare == 'S' || skill1.rare == 'A' ||
            skill2.rare == 'S' || skill2.rare == 'A') {
            return [lv4DecoSettings==2 ? 4 : 3, 1, 1];
        }
        return [lv4DecoSettings==2 ? 4 : 3, 2, 1];
    }

    toString(lang) {
        if (this.skill1 == this.skill2) return this.skill1.getName(lang) + ',' + this.skill1.maxLvl[0] + ',' + ',' + 0 + ',' + this.deco[0] + ',' + this.deco[1] + ',' + this.deco[2];
        return this.skill1.getName(lang) + ',' + this.skill1.maxLvl[0] + ',' + this.skill2.getName(lang) + ',' + this.skill2.maxLvl[1] + ',' + this.deco[0] + ',' + this.deco[1] + ',' + this.deco[2];
    }
}