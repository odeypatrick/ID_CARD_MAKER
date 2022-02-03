<template>
  <div class="edit-page">
      <!-- <center>
          <h2 style="padding-bottom: 20px">Edit Record</h2>
      </center> -->
      <form>
          <h1 class="head">Edit Employee Record</h1>
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
            <button>
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
                name: "",
                cardId: "",
                department: "",
                role: "",
                expiryDate: ""
            }
        }
    },
    created(){
        axios.get(`https://nameless-basin-94170.herokuapp.com/api/record/${this.$route.params.id}`)
        .then(res => {
            this.info.name = res.data.name
            this.info.cardId = res.data.cardId
            this.info.department = res.data.department
            this.info.role = res.data.role
            this.info.expiryDate = res.data.expiryDate
        })
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