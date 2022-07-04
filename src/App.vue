<template>
    <div id="nav">
        <router-link to="/"> Home </router-link>
        <router-link to="/about"> About </router-link> |
        <select v-model="$store.state.lang">
            <option label="简体中文">zh-hans</option>
            <option label="English">en</option>
        </select>
    </div>
    <router-view />
</template>

<script>
export default {
    mounted(){
        // Use Chinese if the browser is in Chinese
        if(/^zh\b/.test(navigator.language)){
            this.$store.state.lang = 'zh-hans';
        }
        else {
            this.$store.state.lang = 'en';
        }
    }
};
</script>

<style>
body {
    margin: 0px;
    padding: 0px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #646e77;
    background: #1e2a36;
    min-width: 100vw;
    min-height: 100vh;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #8f9396;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
a {
    text-decoration: none;
    color: #13ffeb;
}
p {
    color: #64ff8d;
    font-weight: bold;
}

label {
    color: #64ff8d;
    font-weight: bold;
}

h1,
h2 {
    margin: 0px 0px 0px 0px;
    color: #64ff8d;
    text-align: left;
    border-bottom: solid;
}

h3,
h4,
h5 {
    margin: 1rem 0px 0px 0px;
    color: #64ff8d;
    text-align: left;
    border-left: solid;
    padding-left: 0.5rem;
}
</style>
