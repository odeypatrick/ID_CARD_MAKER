<template>
  <div class="edit-page">
      <form>
          <h1 class="head">Edit Vendor Record</h1>
          <div class="error" v-if="error">
              <span>{{ error }}</span>
              <span class="close" @click="error = ''">&times;</span>
          </div>
          <div class="msg" v-if="msg">
              <span>{{ msg }}</span>
              <span class="close" @click="msg = ''">&times;</span>
          </div>
        <div>
            <div>
                <label>Name</label>
                <div>
                    <input type="text" placeholder="Name" v-model="info.name">
                </div>
            </div>
            <div>
                <label>Card No/ID</label>   
                <div>
                    <input type="text" placeholder="Card ID" v-model="info.cardId">
                </div>
            </div>
            <div>
                <label>Company</label>
                <div>
                    <input type="text" placeholder="Company name..." v-model="info.companyName">
                </div>
            </div>
            <div>
                <label>Picture</label>
                <div>
                    <input type="file" ref="file">
                </div>
            </div>
        </div>
        <div>
            <button @click.prevent="editInfo">
                Edit Record
            </button>
        </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            info: {
                id: "",
                name: "",
                cardId: "",
                companyName: "",
                prevImg: "",
                image: ""
            },
            msg: "",
            error: ""
        }
    },
    created(){
        axios.get(`https://nameless-basin-94170.herokuapp.com/api/record/${this.$route.params.id}`)
        .then(res => {
            this.info.id = res.data._id
            this.info.name = res.data.name
            this.info.cardId = res.data.cardId
            this.info.companyName = res.data.companyName
            this.info.prevImg = res.data.image
        })
    },
    methods: {
        editInfo() {
            const formData = new FormData();
            formData.append("name", this.info.name)
            formData.append("cardId", this.info.cardId)
            formData.append("companyName", this.info.companyName)
            formData.append("prevImg", this.info.prevImg)
            formData.append("image", this.info.image)
            axios.put(`https://nameless-basin-94170.herokuapp.com/api/card/${this.info.id}/vendor`, formData)
            .then(() => {
                this.msg = "Info Updated",
                setTimeout(() => {
                    this.$router.push('/')
                },1500)
            })
            .catch(err => {
                console.log(err)
                this.error = err
            })
        }
    }
}
</script>

<style scoped>
    .edit-page {
        padding: 2em;
    }

    form {
        background-color: #fff;
        padding: 2rem 4rem;
        box-shadow: 0 0 6px 0 #ccc;
        border-radius: 10px;
    }

    form h1 {
        padding-bottom: 3rem;
        font-size: 2rem;
        text-align: center;
    }

    form > div {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1em;
    }

    form > div:nth-child(3) {
        text-align: center;
        margin-top: 10px;
        width: 100%;
    }

    form button {
        width: 200px;
        background-color: #145e6f;
        color: #fff;
    }

    form button:hover {
        background-color: #1d879e;
        transition: 0.4s ease-in-out;
    }

    form input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
        font-family: inherit;
        font-size: 15px;
    }

    form label {
        font-weight:bold;
    }
</style>