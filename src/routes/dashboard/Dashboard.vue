<template>
  <div class="dashboard">
    <Header v-on:search-records="searchRecords"/>
    <div class="body">
      <div class="track">
        <Track :employee="employee" :visitor="visitor" :vendor="vendor"/>
      </div>
      <div class="record">
        <Records :persons="persons" :limit="true" v-on:get-records="getRecords" v-on:sort-record="sortRecord" v-on:edit-info="editInfo"/>
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

export default {
  components: {
    Header,
    Records,
    Track
  },
  data(){
    return {
      displayEdit: true,
      record: {},
      persons: [
          // { _id: 7357375883, name: "Japhet Suigurson", cardId: 'NIMC/P/KD/99', department: 'Operations', role: 'Operations Officer', type: 1 },
          // { _id: 8335683383, name: "Selena Gomez", cardId: 'NIMC/P/KN/29', department: 'Research', role: 'Research Officer', type: 2 },
          // { _id: 7365575883, name: "Faruq Akindoyin", cardId: 'NIMC/P/KD/43', department: 'Management', role: 'Intern', type: 1 },
          // { _id: 3544656757, name: "Mohammed Usman", cardId: 'NIMC/P/LG/56', department: 'Operations', role: 'Head of Operations', type: 3 },
          // { _id: 3544556757, name: "Ikenna Ugochukwu", cardId: 'NIMC/P/LG/56', department: 'Finance', role: 'Accountant', type: 1 }
      ],
      allPersons: [
          // { _id: 7357375883, name: "Japhet Suigurson", cardId: 'NIMC/P/KD/99', department: 'Operations', role: 'Operations Officer', type: 1 },
          // { _id: 8335683383, name: "Selena Gomez", cardId: 'NIMC/P/KN/29', department: 'Research', role: 'Research Officer', type: 2 },
          // { _id: 7365575883, name: "Faruq Akindoyin", cardId: 'NIMC/P/KD/43', department: 'Management', role: 'Intern', type: 1 },
          // { _id: 3544656757, name: "Mohammed Usman", cardId: 'NIMC/P/LG/56', department: 'Operations', role: 'Head of Operations', type: 3 },
          // { _id: 3544556757, name: "Ikenna Ugochukwu", cardId: 'NIMC/P/LG/56', department: 'Finance', role: 'Accountant', type: 1 }
      ],
      error: "",
      employee: 0,
      visitor: 0,
      vendor: 0
    }
  },
  created(){
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
    }
  }
}
</script>

<style scoped>
  .body > div {
    margin-bottom: 50px;
  }

</style>