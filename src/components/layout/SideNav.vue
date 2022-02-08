<template>
  <div class="sideNav">
      <div class="logo">
          <img src="../../assets/logo2.png" alt="Logo" width="100">
      </div>

      <div class="add-new">
          <button @click="$router.push('/newcard')">
              Add Card <i class="fa fa-plus"></i>
          </button>
      </div>

      <div class="links">
          <router-link to="/" active-class="active" exact><i class="fa fa-laptop"></i> Dashboard</router-link>
          <router-link to="/history" active-class="active" exact><i class="fa fa-book"></i> Records</router-link>
          <router-link to="/settings" active-class="active" exact><i class="fa fa-cog"></i> Settings</router-link>
      </div>

      <a class="developer" href="#" target="_blank" @click.prevent="openLink">
          powered by <span class="x">X</span>pert <span class="blue">Developers</span>
      </a>
  </div>
</template>

<script>
// import * as electron from 'electron'

export default {
    methods: {
        openLink(){
            require('electron').shell.openExternal("http://www.google.com")
            // window.open("https://odeydev.netlify.app/");
        }
    }
}
</script>

<style scoped>
    .sideNav {
        background-color: #01171f;
        min-height: 100vh;
        color: #ffffff;
        box-shadow: 0 0 6px 5px #ccc;
        position: relative;
    }

    .sideNav > div {
        padding: 20% 0;
        overflow: hidden
    }

    .sideNav .add-new, .sideNav .logo {
        text-align: center;
        font-size: 20px;
        color: green;
    }

    .add-new button {
        padding: 10px 20px;
        border: none;
        font-size: 15px;
        background-color: #008f29;
        color: #fff;
        font-weight: bold;
        border-radius: 3px;
        font-size: 12px;
        text-transform: uppercase;
        font-family: inherit;
        cursor: pointer;
    }

    .links a {
        display: block;
        padding: 15px;
        text-decoration: none;
        color: #ffffff;
        border-bottom: 1px solid #0b1d22;
    }

    .links a:hover {
        background-color: #032537;
        font-weight: bold;
    }

    .x {
        font-size: 24px;
        font-weight: bold;
    }

    .developer {
        font-size: 11px;
        text-align: center;
        position: absolute;
        bottom: 20px;
        color: #fff;
        text-decoration: none;
        left: 20px;
        display: block;
    }

    .blue {
        color: #ffd23e;
    }

    .active {
        background-color:#032537;
    }

    .fa-book, .fa-laptop, .fa-cog {
        margin-right: 4px;
    }
</style>