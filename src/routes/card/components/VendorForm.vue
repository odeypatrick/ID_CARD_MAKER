<template>
  <div class="add-form">
      <h2 v-if="!showPreview"><img src="../../../assets/spinner.gif" alt="" width="20" v-if="loading"> <i class="fa fa-credit-card"></i> Vendor Card</h2>
      <div class="preview-box" v-if="showPreview" >
          <Preview :info="info" v-on:closePrev="showPreview = false" :type="3"/>
      </div>
      <div class="msg" v-if="msg">
        {{msg }}
      </div>
      <div class="error" v-if="error">
          <span>{{ error }}</span>
          <span class="close" @click="error = ''">&times;</span>
      </div>
      <form v-if="!showPreview">
          <div>
              <div>
              <label for="name"> <i class="fa fa-user"></i> Name</label>
              <div>
                  <input type="text" id="name" placeholder="Type name" v-model="info.name">
              </div>
          </div>
          <div>
              <div>
              <label for="compnay-name"> <i class="fa fa-school"></i> Company Name</label>
              <div>
                  <input type="text" id="compnay-name" placeholder="Type Compnay name" v-model="info.companyName">
              </div>
              </div>
          </div>
          <div>
              <label for="name"><i class="fa fa-user"></i> Card No/ID</label>
              <div>
                  <input type="text" id="id" placeholder="Type Card ID" v-model="info.id">
              </div>
          </div>
          <div>
              <label for="picture"><i class="fa fa-image"></i> Picture</label>
              <div>
                  <input type="file" id="file" ref="file" @change="onFileChange">
              </div>
          </div>
          </div>
          <div class="btns">
              <button class="save" @click.prevent="saveCard">Save</button>
              <button class="preview" @click.prevent="showPreview = true">Preview</button>
              <button class="print" @click.prevent="">Print</button>
              <button class="sv" @click.prevent="">Save & Print</button>
          </div>
      </form>
  </div>
</template>

<script>
import Preview from './VendorPreview.vue'
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
                companyName: "",
                id: "",
                image: '',
                signature: ''
            },
            msg: "",
            loading: false,
            error: "",
            file: "",
            file2: ""
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
        createImage(file) {
            // const image = new Image();
            const reader = new FileReader();
            const vm = this;

            reader.onload = (e) => {
                vm.info.image = e.target.result;
            };
            reader.readAsDataURL(file)
        },
        saveCard() {
            this.loading = true
            const formData = new FormData();
            formData.append("name", this.info.name)
            formData.append("cardId", this.info.id)
            formData.append("companyName", this.info.companyName)
            formData.append("type", 3)
            formData.append("image", this.file)
            // formData.append("signature", this.file2)
            axios.post('https://nameless-basin-94170.herokuapp.com/api/card/vendor', formData)
            .then(() => {
                // console.log(res)
                this.loading = false
                this.msg = "Information saved"
                this.info.name = ""
                this.info.id = ""
                this.info.companyName = ""
                this.file = ""
                this.info.image = ""
                this.info.signature = ""
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

    .add-form h2 {
        text-align: center;
        padding: 20px 0;
    }

    form label {
        font-weight: bold;
    }

    form > div:first-child {
        display: grid;
        grid-template-columns: repeat(2, 1fr );
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

    .error {
        top: 0;
        height: 50px;
        margin-left: 5px;
    }
</style>