<template>
  <div id="app">
    <ConnectComponent />
    <button @click="$modal.show('connectModal')">Open modal connect</button>
  </div>
</template>

<script>
import ConnectComponent from "./components/ConnectComponent.vue";
export default {
  name: "App",
  components: {
    ConnectComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
