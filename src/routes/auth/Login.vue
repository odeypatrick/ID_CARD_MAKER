<template>
  <div class="login-page" id="login-page">
      <div class="box">
          <div class="logo">
              <img src="../../assets/logo2.png" alt="logo" width="130">
          </div>
          <div class="form">
              <!-- <h1>Login</h1> -->
              <div class="display error" v-if="$store.state.loginError">
                  <span>{{ $store.state.loginError }}</span>
                  <span class="close" @click="$store.state.loginError = ''"><i class="fa fa-times"></i></span>
              </div>
              <!-- <div class="msg" v-if="$store.state.loginSuccess">
                  {{ $store.state.loginSuccess }}
              </div> -->
              <form @submit.prevent="loginUser">
                  <div>
                      <label for="username">Username</label>
                      <div>
                          <input type="text" id="username" placeholder="Type username..." v-model="username">
                      </div>
                  </div>
                  <div>
                      <label for="password">Password</label>
                      <div>
                          <input type="password" id="password" placeholder="Type password..." v-model="password">
                      </div>
                  </div>
                  <div>
                      <button class="btn">
                          <span v-if="!$store.state.loading">Login</span>
                          <img src="../../assets/spinner.gif" alt="loader" v-if="$store.state.loading" width="15">
                      </button>
                  </div>
                  <div>
                      <p>Cannot login? <router-link to="#">Contact developer</router-link></p>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
    name: "Login",
    data(){
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        loginUser(){
            this.$store.state.loading = true
            this.$store.dispatch('login', { username: this.username, password: this.password })
        }
    }
}
</script>

<style scoped>
    .login-page {
        padding: 3em;
        height: 100vh;
    }

    /* .form {
        
    } */

    .logo {
        padding-bottom: 5em;
        
    }

    .box {
        width: 400px;
        margin: 0 auto;
        background-color: #fff;
        padding: 3em;
        border-radius: 10px;
        box-shadow: 0 0 6px 0 #ccc;
    }

    .form > h1 {
        padding-bottom: 20px;
        text-align: center;
    } 

    label {
        font-weight: bold;
    }

    form > div {
        margin-bottom: 20px;
    }

    form > div > div {
        margin-top: 5px;
    }

    form > div input{
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        border: 2px solid#ccc;
        font-family: inherit;
        outline-color: green;
        /* font-weight: ; */
    }

    form button {
        width: 100%;
        background: #01ae01;
        color: #fff;
    }

    form button:hover {
        background-color: #00da00;
    }

    .logo {
        text-align: center;
    }

    .error span:first-child {
        padding: 0 10px;
    }
    
    .msg {
        background-color: green;
        color: #fff;
        top: 0;
        margin-top: 10px;
    }


    form a {
        text-decoration: none;
        color: #821f1f;
    }

    form a:hover {
        font-weight: bold;
    }
</style>