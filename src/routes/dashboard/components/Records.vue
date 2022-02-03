<template>
  <div class="records">
      <div class="title">
          <p>Records</p>
          <div class="select">
              Card:
              <select @change="sortData" v-model="type">
                  <option value="0">All</option>
                  <option value="1">Employee</option>
                  <option value="2">Visitor</option>
                  <option value="3">Vendor</option>
              </select>
          </div>
      </div>
      <div class="box">
          <div class="data head">
          <div class="item user-pic-head">
              Pic
          </div>
                  
          <div class="item text-u">
              Name
          </div>

          <div class="item hide text-u">
              ID
          </div>

          <div class="item hide text-u">
              Department
          </div>

          <div class="item hide text-u">
              Role
          </div>

          <div class="actions">
              Actions
          </div>
      </div>
      <div class="data content" v-for="(person, index) in persons" :key="person._id" v-show="index <= 4">
          <div class="item user-pic">
              <img :src="person.picture" alt="" width="50">
          </div>
          <div class="item text-u">
              {{ person.name }} <span v-if="person.type == 2" style="background-color: skyblue; padding: 2px"></span>
              <span v-if="person.type == 3" style="background-color: aqua; padding: 2px"></span>
          </div>

          <div class="item hide text-u">
              {{ person.cardId }}
          </div>

          <div class="item hide text-u">
             {{ person.department }}
          </div>

          <div class="item hide text-u">
              {{ person.role }}
          </div>

          <div class="actions">
              <button class="print"><i class="fa fa-eye"></i></button>
              <!-- <button class="edit"><i class="fa fa-edit" @click="$router.push('/edit/' + person._id)"></i></button> -->
              <router-link :to="`/edit/${person._id}`">Edit</router-link>
              <button class="delete" @click="deleteRecord(person._id)"><i class="fa fa-trash"></i></button>
          </div>
      </div>
      </div>
        <transition name="fade">
            <div class="error" v-if="error">
                <span class="err-text">
                    {{ error }}
                </span>
                <span @click="error = ''" class="close">
                    &times;
                </span>
            </div>
        </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['persons', 'limit'],
    data(){
        return {
            error: "",
            type: 0
        }
    },
    methods: {
        deleteRecord(id){
            axios.delete(`https://nameless-basin-94170.herokuapp.com/api/card/${id}`)
            .then(() => {
                this.msg = "Deleted successfully"
                this.$emit('get-records')
            })
            .catch(err => this.error = "[Failed to delete] " + err)
        },
        sortData(){
            this.$emit('sort-record', this.type);
        },
        editInfo(person){
            this.$emit('edit-info', person)
            // console.log(123)
        }
    }
}
</script>

<style scoped>
.records {
    background-color: #fff;
    box-shadow: 0 0 6px 0 #ccc;
    min-height: 320px;
    /* width: 80vw; */
}

.title {
    border-bottom: 2px solid #01171f;
    font-size: 17px;
    padding: 10px 20px;
    font-weight: bold;
    justify-content: space-between;
    display: flex;
}

.user-pic {
    height: 50px;
    overflow: hidden;
    width: 100px;
}

.user-pic-head {
    width: 100px;
}

.item span {
    position: absolute;
    left: 0;
    top: 0;
}

.select select {
    border: none;
    outline: none;
    font-size: 16px;
    font-family: inherit;
}

.box {
    padding: 10px 20px;
}

.data, .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}

.head {
    font-weight: bold;
}

.content {
    font-size: 15px;
}

.data .text-u {
    width: 200px;
    text-transform: capitalize;
    position: relative;
}

.data .actions {
    width: 200px;
}

.actions a {
    color: #145e6f;
    text-decoration: none;
    font-weight: bold;
}

.actions > button {
    margin-right: 5px;
    font-size: 14px;
}

.print {
    background-color: green;
    color: #fff;
}

.edit {
    background-color: #145e6f;
    color: #fff;
}

.delete {
    background-color: #ff3831;
    color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.actions button:hover {
    background: rgb(114, 124, 162);
} 

@media(max-width: 1000px) {
    .hide {
        display: none;
    }
}
</style>