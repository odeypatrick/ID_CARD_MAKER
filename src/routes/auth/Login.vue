<template>
  <div class="login-page" id="login-page">
      <div class="box">
          <div class="logo">
              <img src="../../assets/logo2.png" alt="logo" width="130">
          </div>
          <div class="form">
              <!-- <h1>Login</h1> -->
              <div class="display" v-for="(msg, index) in msgs" :key="index" v-show="msg.length > 0">
                  <p class="error" @click="deleteErr(index)">{{ msg }}</p>
              </div>
              <form @submit.prevent="loginUser">
                  <div>
                      <label for="username">Username</label>
                      <div>
                          <input type="text" id="username" placeholder="Type username...">
                      </div>
                  </div>
                  <div>
                      <label for="password">Password</label>
                      <div>
                          <input type="password" id="password" placeholder="Type password...">
                      </div>
                  </div>
                  <div>
                      <button class="btn">Login</button>
                  </div>
                  <div>
                      <p>Could not login? <router-link to="/dashboard">Contact developer</router-link></p>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data(){
        return {
            username: "",
            password: "",
            msgs: []
        }
    },
    methods: {
        loginUser(){
            axios.post('https://localhost:5000/api/login', {
                username: this.username,
                password: this.password
            })
            .then(() => {
                this.msg.push('successful')
            })
            .catch(err => {
                this.msgs.push(`[Login failed] ${err}`)
            })
        },
        deleteErr(index){
            this.msgs.splice(index, 1)
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
        /* font-weight: ; */
    }

    form button {
        width: 100%;
        background: #01ae01;
        color: #fff;
    }

    .logo {
        text-align: center;
    }

    .error {
        padding: 10px;
    }
    
    .msg {
        background-color: green;
        color: #fff;
    }

    .display {
        position: absolute;
        height: 400px;
        top: 0;
    }

    .display > p {
        margin-top: 10px;
        position: relative;
        cursor: pointer;
    }
</style>