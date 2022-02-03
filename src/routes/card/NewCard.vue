<template>
    <div class="newcard">
         <Header/>
         <div class="body">
           <div class="add-form">
             <!-- <h2 v-if="!showPreview">Add new ID Card</h2> -->
             <div class="display">
               <div class="card-type">
                 <p class="head">
                   Card Type
                 </p>
                 <div @click="page = 1" :style="page == 1 ? 'border-left: 3px solid green' : 'none'">
                   Employee
                 </div>
                 <div @click="page =2" :style="page == 2 ? 'border-left: 3px solid green' : 'none'">
                   Visitor
                 </div>
                 <div @click="page = 3" :style="page == 3 ? 'border-left: 3px solid green' : 'none'">
                   Vendor
                 </div>
               </div>
               <div class="form">
                 <AddForm v-show="page == 1"/>
                 <VisitorForm v-show="page == 2"/>
                 <VendorForm v-show="page == 3"/>
               </div>
             </div>
           </div>
         </div>
    </div>
</template>

<script>
import Header from '../../components/layout/Header.vue'
import AddForm from './components/AddForm'
import VisitorForm from './components/VisitorForm'
import VendorForm from './components/VendorForm'

export default {
  name: 'NewCard',
  components: {
    Header,
    AddForm,
    VisitorForm,
    VendorForm
  },
  data(){
    return {
      page: 1,
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .display {
    display: flex;
    background: #fff;
    /* margin: 1% 0; */
    height: 86vh;
    border-radius: 10px;
    box-shadow: 0 0 6px 0 #ccc;
  }

  .add-form h2 {
    text-align: center;
  }

  .card-type {
    flex: 1;
    border-right: 1px solid #ccc;
  }

  .head {
    font-weight: bold;
    border-bottom: 2px solid #a0a0a0;
    padding: 10px;
  }

  .card-type > div {
    padding: 20px 10px;
    border-bottom: 1px solid #f3f3f3;
    /* text-transform: uppercase; */
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .card-type > div:hover {
    border-left: 3px solid green;

  }

  .form {
    flex: 4;
  }
</style>
