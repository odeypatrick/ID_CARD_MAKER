<template>
    <div class="preview-box">
        <div class="cards">
        <div class="front">
        <h3>Front View <input type="radio" value="card" v-model="elemId"> </h3>
        <div class="card" id="card">
            <h1 class="logo green">
              <img src="../../../assets/logo2.png" alt="" width="100">
            </h1>
            <p class="green field">Federal Ministry of Communications and Digital Economy</p>
            <p class="abbr">National Indentity Management Commission</p>
            <div class="id_number red">{{ info.id }}</div>
            <div class="image-holder">
            <img :src="info.image ? info.image : require('../../../assets/noAvatar.png')" alt="">
            </div>
            <div class="holder-name">{{ info.name }}</div>
            <!-- <div class="holder-role red" style="font-size: 12px">{{ info.role }}</div>-->
            <div class="holder-department green" style="font-size: 11px">VENDOR</div> 
            <div class="holder-department" style="font-size: 15px; margin-top: 20px">{{ info.companyName }}</div> 
        </div>
        </div>

        <div class="back">
        <h3>Back View  <input type="radio" value="card2" v-model="elemId"> </h3>
        <div class="card2" id="card2">
            <div class="cert">
            {{ back.declaration }}
            </div>
            <div class="abbr">
            {{ back.companyName }}
            </div>
            <div class="address">
            {{back.address}}
            <p>{{ back.phoneNumber }}</p>
            </div>

            <div class="found">
            If found, please kindly return to the address above or the nearest Police Station
            </div>

            <div class="signature">
              <img :src="back.signature" alt="signature">
            </div>

            <div class="boss">
            {{ back.branch }}
            </div>
            <div class="barcode-spot" v-show="info.id">
              <svg class="barcode"
                :jsbarcode-value="info.id"
                jsbarcode-width="2"
                jsbarcode-height="40"
                :jsbarcode-displayValue="false"
              ></svg>
            </div>
        </div>
        </div>
    </div>
    <div class="buttons">
        <button class="edit" @click="closeDisplay">Close <i class="fa fa-times"></i></button>
        <button class="print" @click="printID">Print <i class="fa fa-print"></i></button>
    </div>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
import * as Printjs from "print-js";
import axios from 'axios'
// import electron from 'electron'
// import * as path from 'path'
// import * as fs from 'fs'

export default {
  name: 'NewCard',
  props: {
    info: Object,
    type: String
  },
  created(){
    axios.get('https://nameless-basin-94170.herokuapp.com/api/card/structure')
        .then((res) => {
            this.back.declaration = res.data[res.data.length - 1].declaration
            this.back.companyName = res.data[res.data.length - 1].companyName
            this.back.address = res.data[res.data.length - 1].address
            this.back.phoneNumber = res.data[res.data.length - 1].phoneNumber
            this.back.branch = res.data[res.data.length - 1].branch
            this.back.signature = res.data[res.data.length - 1].signature
        })
        .catch(err => this.error = err)
  },
  data(){
    return {
      elemId: 'card',
      back: {
          declaration: "",
          companyName: "",
          address: "",
          phoneNumber: "",
          branch: "",
          signature: ""
      },
    }
  },
  mounted () {
    JsBarcode(".barcode").init();
  },
  methods: {
    printID(){
      Printjs(this.elemId, 'html')
    },
    closeDisplay() {
      this.$emit('closePrev')
    }
  }
}
</script>

<style scoped>
.preview-box {
  background: #212627;
  padding: 0 0 10px 0;
  color: rgb(255, 255, 255);
  /* border-radius: 30px; */
  height: 86vh;
}

.cards {
  /* width: 80%; */
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  text-align: center;
}

.front h3, .back h3{
  margin-bottom: 10px;
}

.cards .card, .card2 {
  height: 500px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  font-weight: bold;
  padding: 5px;
  transform: scale(0.9)
}

.card {
  text-transform: uppercase;
  color: #000;
}

.cards .front, .cards .back {
  width: 300px;
  /* margin-right: 100px; */
}

.green {
  color: green;
}

.red {
  color: red;
}

.image-holder{
  border: 3px solid green;
  width: 50%;
  margin: 0 auto;
  height: 170px;
  border-radius: 10px;
  overflow: hidden;
}

.image-holder img {
  width: 100%;
  transform: scale(1.1)
}

.holder-name {
  font-weight: bold;
  margin: 0 auto;
  color: #000;
}

.holder-department, .holder-role {
  margin: 0 auto;
}

.card > div, p {
  padding: 4px 0;
  font-size: 14px;
}
.abbr {
  font-weight: bold;
  font-size: 17px;
}

.field {
  font-size: 12px;
  /* color: #000; */
}

.card2 {
  padding: 10px;
  font-weight: bold;
  color: #000;
}

.card2 > div {
  margin-bottom: 20px;
  /* font-size: 14px; */
}

.signature {
  border-bottom: 2px solid #000;
  height: 40px;
  overflow: hidden;
}

.signature img {
  width: 100px;
  height: 45px;
}

.found {
  font-size: 15px;
}

.cert {
  font-size: 15px;
}

.boss {
  font-size: 16px;
}

.card2 .abbr {
  font-size: 18px;
} 

.buttons {
  text-align: right;
  /* width: 80%; */
  margin: 20px;
  padding-bottom: 10px;
}

.edit {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 100px;
}

.print {
  background-color: green;
  width: 100px;
  color: #fff;
  border-radius: 5px;
}

.barcode-spot {
  height: 55px;
  overflow: hidden;
  margin-top: -10px;
  /* border: 2px solid red; */
  margin-left: -5px; 
  /* width: 200px; */
}

.barcode {
  width: 290px;
}
@media(max-width: 1000px) {
  .cards {
    flex-direction: column;
    text-align: center;
    width: 60%;
    margin: 0 auto;
  }

  .cards > div {
    margin-bottom: 40px;
  }
}
</style>
