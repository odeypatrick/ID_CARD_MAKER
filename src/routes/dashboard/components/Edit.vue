<template>
  <div class="edit-page">
      <form>
          <h1 class="head">Edit Employee Record</h1>
        <div>
            <div class="error" v-if="error">
                <span class="err-text">
                    {{ error }}
                </span>
                <span @click="error = ''" class="close">
                    &times;
                </span>
            </div>
          <div class="msg" v-if="msg">  
              <span>{{ msg }}</span>
              <span class="close" @click="msg = ''">&times;</span>
          </div>
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
                <label>Department</label>
                <div>
                    <input type="text" placeholder="Department" v-model="info.department">
                </div>
            </div>
            <div>
                <label>Rank</label>
                <div>
                    <input type="text" placeholder="Rank" v-model="info.role">
                </div>
            </div>
            <div>
                <label>Picture</label>
                <div>
                    <input type="file" ref="file">
                </div>
            </div>
            <div>
                <label>Signature</label>
                <div>
                    <input type="file" ref="signature">
                </div>
            </div>
            <div>
                <label>Expiry Date</label>
                <div>
                    <input type="text" placeholder="07/23" v-model="info.expiryDate">
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
                department: "",
                role: "",
                expiryDate: "",
                prevImg: "",
                prevSig: "",
                signature: "",
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
            this.info.department = res.data.department
            this.info.role = res.data.role
            this.info.expiryDate = res.data.expiryDate
            this.info.prevImg = res.data.picture,
            this.info.prevSig = res.data.signature
        })
        .catch(err => this.error = err)
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return
            this.info.image = files[0]
            // this.createImage(files[0])
        },
        onFileChange2(e) {
            const files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return
            this.info.signature = files[0]
            // this.createImage2(files[0])
        },
        editInfo() {
            const formData = new FormData();
            formData.append("name", this.info.name)
            formData.append("cardId", this.info.cardId)
            formData.append("department", this.info.department)
            formData.append("role", this.info.role)
            formData.append("expiryDate", this.info.expiryDate)
            formData.append("prevImg", this.info.prevImg)
            formData.append("prevSig", this.info.prevSig)
            formData.append("image", this.info.image)
            formData.append("signature", this.info.signature)
            axios.put(`https://nameless-basin-94170.herokuapp.com/api/card/${this.info.id}`, formData)
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