<template>
  <div class="add-form">
      <h2 v-if="!showPreview"><img src="../../../assets/spinner.gif" alt="" width="20" v-if="loading"> <i class="fa fa-credit-card"></i> Employee Card</h2>
      <div class="preview-box" v-if="showPreview" >
          <Preview :info="info" v-on:closePrev="showPreview = false"/>
      </div>
      <div class="error" v-if="error">
          <span>{{ error }}</span>
          <span class="close" @click="error = ''">&times;</span>
      </div>
      <div class="msg" v-if="msg">
        {{msg }}
      </div>
      <form>
          <div>
              <div>
              <label for="name"><i class="fa fa-user"></i> Name</label>
              <div>
                  <input type="text" id="name" placeholder="Type name" v-model="info.name">
              </div>
          </div>
          <div>
              <label for="name"><i class="fa fa-user"></i> Card No/ID</label>
              <div>
                  <input type="text" id="name" placeholder="Type Card ID" v-model="info.id">
              </div>
          </div>
          <div>
              <label for="name"><i class="fa fa-school"></i> Department</label>
              <div>
                  <input type="text" id="name" placeholder="Type Department" v-model="info.department">
              </div>
          </div>
          <div>
              <label for="name"><i class="fa fa-badge"></i> Rank</label>
              <div>
                  <input type="text" id="name" placeholder="Type Role" v-model="info.role">
              </div>
          </div>
          <div>
              <label for="picture"><i class="fa fa-image"></i> Picture</label>
              <div class="select">
                  <input type="file" id="file" ref="file" @change="onFileChange">
                  <div class="img-show">
                      <img :src="info.image" alt="">
                  </div>
              </div>
          </div>
          <div>
              <label for="Signature"><i class="fa fa-pen"></i>Employee Signature</label>
              <div class="select">
                  <input type="file" id="file" ref="file" @change="onFileChange2">
                  <div class="img-show">
                      <img :src="info.signature" alt="">
                  </div>
              </div>
          </div>
          <div class="expiry-date">
              <label for="expiry-date"><i class="fa fa-clock"></i> Expiry Date</label>
              <div>
                  <input type="text" id="expiry-date" placeholder="07/23" v-model="info.expiryDate">
              </div>
          </div>
          </div>
          <div class="btns">
              <button class="save" @click.prevent="saveCard">Save 
                  
              </button>
              <button class="preview" @click.prevent="showPreview = true">Preview</button>
              <!-- <button class="print" @click.prevent="">Print</button> -->
              <!-- <button class="sv" @click.prevent="savePrint">Save & Print</button> -->
          </div>
      </form>
  </div>
</template>

<script>
import Preview from './Preview.vue'
import axios from 'axios'

export default {
    components: {
        Preview
    },
    data(){
        return {
            showPreview: false,
            info: {
                name: "",
                id: "",
                department: "",
                role: "",
                image: "",
                signature: "",
                expiryDate: ""
            },
            file: "",
            file2: "",
            error: "",
            loading: false,
            msg: ""
        }
    },
    methods: {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return
            this.file = files[0]
            this.createImage(files[0])
        },
        onFileChange2(e) {
            const files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return
            this.file2 = files[0]
            this.createImage2(files[0])
        },
        createImage(file) {
            // const image = new Image();
            const reader = new FileReader();
            const vm = this;

            reader.onload = (e) => {
                vm.info.image = e.target.result;
            };
            reader.readAsDataURL(file)
        },
        createImage2(file) {
            // const image = new Image();
            const reader = new FileReader();
            const vm = this;

            reader.onload = (e) => {
                vm.info.signature = e.target.result;
            };
            reader.readAsDataURL(file)
        },
        savePrint(){
            // Save the card and print
            this.saveCard();
            // this.printCard()
        },
        saveCard(){
            this.loading = true
            const formData = new FormData();
            formData.append("name", this.info.name)
            formData.append("cardId", this.info.id)
            formData.append("department", this.info.department)
            formData.append("role", this.info.role)
            formData.append("type", 1)
            formData.append("expiryDate", this.info.expiryDate)
            formData.append("image", this.file)
            formData.append("signature", this.file2)
            // formData.append("signature", this.file2)
            axios.post('https://nameless-basin-94170.herokuapp.com/api/card', formData)
            .then(() => {
                this.info.name = ""
                this.info.id = ""
                this.info.department = ""
                this.info.role = ""
                this.file = ""
                this.file2 = "",
                this.info.image = "",
                this.info.expiryDate = "",
                this.info.signature = ""
                this.loading = false
                this.msg = "Information Saved Successfully"
            })
            .catch(err => this.error = err)
        }
    }
}
</script>

<style scoped>
    form {
        padding: 30px;
        /* background-color: #fff; */
        border-radius: 30px;
    }

    .add-form {
        position: relative;
    }

    .preview-box {
        position: absolute;
        width: 100%;
    }

    .add-form h2 {
        text-align: center;
        padding: 20px 0;
    }

    form label {
        font-weight: bold;
    }

    form > div:first-child {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2em;
    }

    form > div {
        margin-bottom: 20px;
    }

    form input {
        padding: 10px;
        border: 2px solid #ccc;
        font-size: 15px;
        width: 100%;
        font-family: inherit;
        margin-top: 10px;
        border-radius: 5px;
    }

    div > button {
        margin-right: 10px;
    }

    .save {
        background: green;
        color: #fff;
    }

    .preview {
        background: #004280;
        color: #fff;
    }

    .print {
        background: #111;
        color: #fff;
    }

    .sv {
        background: #d59712;
        color: #fff;
    }

    .btns {
        text-align: center;
    }

    .select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #ccc;
    }

    .select input {
        /* flex: ; */
        border: none;
    }

    /* .img-show {
        flex: 1;
    } */

    .img-show img {
        width: 30px;
    }

    button:hover {
        background-color: cadetblue;
        transition: background 0.2s ease-out;
    }

    .error {
        top: 0;
        height: 50px;
        margin-left: 5px;
    }
</style>