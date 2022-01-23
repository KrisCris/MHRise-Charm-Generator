<template>
    <div class="home">
        <a target="_blank" rel="noopener noreferrer" :href="'https://mhrise.wiki-db.com/sim/?hl='+$store.state.lang">配装器链接 (Armorset Search )</a>
        <div class="skillSelector">
            <button
                v-for="skill in $store.state.skills"
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
        <p v-for="(val, key) in output" :key="key"> {{val.toString(this.$store.state.lang)}} </p>
    </div>
</template>

<script>
// @ is an alias to /src
import Charm from "@/utils/Charm.js";

export default {
    name: "Home",
    data() {
        return {
            output: {},
        };
    },
    methods: {
        generateCharms() {
            this.output = {};
            for (let skill1 of this.filterSelectedSkills) {
                for (let skill2 of this.filterSelectedSkills) {
                    if (skill1 == skill2){
                        if (this.filterSelectedSkills.length != 1) continue;
                    }
                    let charm = new Charm(skill1, skill2);
                    if (this.output[charm.hashCode()] == undefined) {
                        this.output[charm.hashCode()] = charm;
                    }
                }
            }
            
            // to clipboard
            let str = "";
            for(let item in this.output){
                str += this.output[item].toString(this.$store.state.lang);
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
    },
    computed: {
        filterSelectedSkills() {
            return this.$store.state.skills.filter((skill) => skill.selected);
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
</style>
