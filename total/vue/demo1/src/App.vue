<template>
  <div id="app">
    <TestShepherdVue />
  </div>
</template>

<script>
import TestShepherdVue from './components/TestShepherd.vue'

export default {
  name: 'App',
  components: {
    TestShepherdVue
  }
}
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
