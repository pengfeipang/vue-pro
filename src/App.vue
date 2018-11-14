<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Login/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  background:#ddd;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
