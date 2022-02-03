<template>
    <div id="app" class="app">
      <div class="side-nav">
        <side-nav></side-nav>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import SideNav from './components/layout/SideNav'

export default {
  name: 'App',
  components: {
    SideNav
  },
  methods: {

  },
  created() {
    this.$router.push('/')
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  font-family: 'Lato', Arial, sans-serif;
  display: flex;
  color: #2a312a;
  /* border: 2px solid red */
}

img {
  /* width: 100%; */
}

.body {
    padding: 20px;
 }

.side-nav{
  flex: 1;
}

.view {
  flex: 5;
  background-color: #f3f3f3;
  height: 100vh;
  overflow: auto;
}

button {
  padding: 10px 20px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 3px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;
}

.error {
    background: #d63852;
    /* border: 1px solid red; */
    color: #ffff;
    /* font-weight: bold; */
    width: 300px;
    text-align: center;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    border-radius: 3px;
    align-items: center;
  }
.err-text {
   padding: 0 10px;
   font-size: 13px;
}

  .close {
    cursor: pointer;
    font-size: 18px;
    background: #0000003f;
    padding: 15px 10px;
  }

  .msg {
    width: fit-content;
    margin-left: 10px;
    background: green; 
    color: #fff;
    padding: 10px;
    position: absolute;
    /* bottom: 10px; */
    border-radius: 3px;
    align-items: center;
  }
</style>
