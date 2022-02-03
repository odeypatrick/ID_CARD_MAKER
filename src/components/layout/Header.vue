<template>
    <header>
        <div class= "container">
            <div class="main-header">
                <div class="logo">
                    <i class="fa fa-bars"></i>
                    <div class="search-box">
                        <i class="fa fa-search" style="color: #ccc"></i>
                        <input type="text" placeholder="Type a name..." v-model="search" @keyup="searchRecords">
                    </div>
                </div>

                <div class="links">
                    <nav>
                        <ul class="right">
                            <li v-if="!isAuth">
                                <router-link to="/login"><i class="fa fa-user"></i> Login</router-link>
                            </li>
                            <li class="user" v-else>
                                <img src="../../assets/noAvatar.png" alt="">
                                <span>Welcome Admin <i class="fa fa-angle-down"></i></span>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data(){
        return {
            isAuth: false,
            search: ""
        }
    },
    methods: {
         searchRecords() {
             this.$emit('search-records', this.search)
        }
    }
}
</script>

<style scoped>
    img {
        width: 100%;
    }

    header {
    padding: 10px;
    position: sticky;
    width: 100%;
    background: #ffffff;
    top:0;
    left: 0;
    color: #090909;
    box-shadow: 0 0 6px 0 #ccc;
}

.logo {
    display: flex;
    align-items: center;
}

.fa-bars {
    margin-right: 30px;
    font-size: 20px;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fa-user {
    font-size: 15px;
}

.links li {
    display: inline-block;
    list-style: none;
}

.links li a {
    padding: 10px;
    text-decoration: none;
    color: #000;
    font-size: 14px;
    /* color: #fff; */
    font-weight: bold;
    border: none;
}

.links li a:hover {
    color: #00b306;
    background: transparent   
}

.links .btn {
    background-color: #123b99;
    font-weight: bold;
    color: #fff;
    font-family: inherit;
    border-radius: 5px;
}

.user {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
}

.right {
    display: flex;
    align-items: center;
    font-size: 12px;
}

.right li {
    margin-right: 5px;
}

.search-box {
    padding: 5px 15px;
    width: 300px;
    border: 2px solid #ccc;
    font-family: inherit;
    font-size: 14px;
    border-radius: 5px;
    outline: none;
    color: #242424;
}

input[type=text] {
    border: none;
    padding: 0 10px;
    outline: none;
    width: 90%;
    color: #242424;
    font-family: inherit;
}
</style>