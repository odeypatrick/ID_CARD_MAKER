<template>
  <div class="dashboard">
    <Header v-on:search-records="searchRecords"/>
    <div class="body">
      <div class="preview-box" v-if="showPreview == 1" v-show="showPrev">
        <Preview :info="info" v-on:closePrev="closePreview"/>
      </div>
      <div class="preview-box" v-if="showPreview == 2" v-show="showPrev">
        <VisitorPreview :info="info" v-on:closePrev="closePreview"/>
      </div>
      <div class="preview-box" v-if="showPreview == 3" v-show="showPrev">
        <VendorPreview :info="info" v-on:closePrev="closePreview"/>
      </div>
      <div class="track">
        <Track :employee="employee" :visitor="visitor" :vendor="vendor"/>
        {{ $store.state.title }}
      </div>
      <div class="record">
        <Records 
          :persons="persons" 
          :limit="4" v-on:get-records="getRecords" 
          v-on:sort-record="sortRecord"
          v-on:preview-card="previewCard"
          />
        <!-- <center> -->
          <div class="error" v-if="error">
            <span class="err-text">
              {{ error }}
            </span>
            <span @click="error = ''" class="close">
              &times;
            </span>
          </div>
        <!-- </center> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '../../components/layout/Header.vue'
import Records from './components/Records.vue'
import Track from './components/Track.vue'
import Preview from './components/preview/Employee.vue'
import VisitorPreview from './components/preview/Visitor.vue'
import VendorPreview from './components/preview/Vendor.vue'

export default {
  components: {
    Header,
    Records,
    Track,
    Preview,
    VisitorPreview,
    VendorPreview
  },
  data(){
    return {
      displayEdit: true,
      record: {},
      persons: [],
      allPersons: [],
      error: "",
      showPreview: 0,
      showPrev: false,
      info: {},
      employee: 0,
      visitor: 0,
      vendor: 0
    }
  },
  created(){
    this.$store.dispatch('fetchUser')
    this.getRecords()
  },
  methods: {
    getRecords(){
      axios.get('https://nameless-basin-94170.herokuapp.com/api/records')
      .then(res => {
        this.persons = res.data
        this.allPersons = res.data
        this.employee = this.persons.filter(person => person.type == 1).length
        this.visitor = this.persons.filter(person => person.type == 2).length
        this.vendor = this.persons.filter(person => person.type == 3).length
      })
      .catch(err => this.error = err)
    },
    sortRecord(type) {
      if(type == 0) {
        return this.persons = this.allPersons
      } else {
        this.persons = this.allPersons.filter(person => person.type == type)
      } 
    },
    searchRecords(search){
      if(!search) return this.persons = this.allPersons
      this.persons = this.allPersons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );
    },
    previewCard(person) {
      this.showPreview = true
      this.info = person
      if(person.type == 1) {
        this.showPreview = 1
        this.showPrev = true
      }
      if(person.type == 2) {
        this.showPreview = 3
        this.showPrev = true
      }
      if(person.type == 3) {
        this.showPreview = 3
        this.showPrev = true
      }
    },
    closePreview(){
      this.showPrev = false
    }
  }
}
</script>

<style scoped>
  .dashboard {
    position: relative;
  }

  .preview-box {
    position: absolute;
    width: 98%;
    z-index: 100;
  }

  .body > div {
    margin-bottom: 50px;
  }

</style>