<template>
    <div class="home">
        <h2 style="text-align: center; border: none">
            <a
                target="_blank"
                rel="noopener noreferrer"
                :href="
                    'https://mhrise.wiki-db.com/sim/?hl=' + $store.state.lang
                "
                >配装器链接 (Go to Armorset Search)</a
            >
        </h2>
        <div>
            <p class="inline">Select Melding Type:</p>
            <select v-model="$store.state.meldingCate" class="inline">
                <!-- <option :label="getMeldingText(0)">0</option> -->
                <!-- <option :label="getMeldingText(1)">1</option> -->
                <option label="MHRise">0</option>
                <option label="MHRise SB">1</option>
            </select>
        </div>
        <div v-if="$store.state.meldingCate == 1">
            <input
                type="checkbox"
                id="lv4Deco"
                v-model="$store.state.enableLv4Deco"
            />
            <label for="lv4Deco"> Use Lv.4 Deco</label><br />
        </div>

        <div class="skillSelector">
            <button
                v-for="skill in $store.state.skills[$store.state.meldingCate]"
                :class="['skill', skill.selected]"
                :key="skill.id"
                :selected="skill.selected"
                @click="skill.selected = !skill.selected"
            >
                {{ skill.getName($store.state.lang) }}
            </button>
        </div>
        <div>
            <button class="gen" @click="generateCharms">Copy Result</button>
        </div>
        <p v-for="val in output" :key="val">
            {{ val.toString(this.$store.state.lang) }}
        </p>
    </div>
</template>

<script>
// @ is an alias to /src
import Charm from "@/utils/Charm.js";
import { meldingCates_name as zh_hans } from "../utils/lang/zh-hans.js";
import { meldingCates_name as en } from "../utils/lang/en.js";

export default {
    name: "Home",
    data() {
        return {
            output: [],
            meldingCateTexts: {
                en: en,
                "zh-hans": zh_hans,
            },
        };
    },
    methods: {
        generateCharms() {
            console.log("genCharms...");
            this.output = [];
            const loopCharms = (lv4Deco=false) => {
                for (let skill1 of this.filterSelectedSkills) {
                    for (let skill2 of this.filterSelectedSkills) {
                        if (skill1 == skill2) {
                            if (this.filterSelectedSkills.length != 1) continue;
                        }
                        if (skill1.id > skill2.id) {
                            if (
                                skill1.maxLvl[0] == skill1.maxLvl[1] &&
                                skill2.maxLvl[0] == skill2.maxLvl[1]
                            )
                                continue;
                        }
                        let charm = new Charm(
                            skill1,
                            skill2,
                            lv4Deco
                        );
                        this.output.push(charm);
                    }
                }
            }
            loopCharms();
            if (this.$store.state.enableLv4Deco) {
                loopCharms(true);
            }
            // to clipboard
            let str = "";
            for (let item of this.output) {
                str += item.toString(this.$store.state.lang);
                str += "\n";
            }
            this.updateClipboard(str);
        },

        updateClipboard(newClip) {
            let that = this;
            navigator.clipboard.writeText(newClip).then(
                function () {
                    that.successMsg = "Copied " + newClip;
                },
                function () {
                    errorMsg = "No permission to access clipboard!";
                }
            );
        },

        getMeldingText(id) {
            return this.meldingCateTexts[this.$store.state.lang][id];
        },
    },
    computed: {
        filterSelectedSkills() {
            return this.$store.state.skills[
                this.$store.state.meldingCate
            ].filter((skill) => skill.selected);
        },
    },
};
</script>
<style>
button {
    background-color: #8f9396;
    color: #1e2a36;
    border: none;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-size: auto;
    margin: 0.25rem;
    height: 2rem;
    font-size: auto;
    border-radius: 0.5rem;
}
.gen {
    background-color: #3365da;
    color: aliceblue;
    font-size: 1.3rem;
    height: 3rem;
    width: 10rem;
    border-radius: 1rem;
    margin: 0% auto;
}
.skill {
    background-color: #8f9396;
}

.skill[selected="true"] {
    background-color: #00ac64;
}

button:hover {
    filter: brightness(125%);
    transition: all 0.3s ease-in-out;
}
button:active {
    filter: brightness(80%);
    transition: all 0.1s ease-in-out;
}

.skillSelector {
    margin: 1rem;
    padding: 1rem;
    border-bottom: 1px;
    border-bottom-style: dashed;
    border-bottom-color: #8f9396;
}

.inline {
    display: inline-block;
}
</style>
