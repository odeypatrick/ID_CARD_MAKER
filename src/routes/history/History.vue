<template>
    <div class="history">
        <Header v-on:search-records="searchRecords"/>
        <div class="record">
            <Record :persons="persons" v-on:get-records="getRecords" v-on:sort-record="sortRecord" :limit="100000"/>
        </div>
    </div>
</template>

<script>
import Header from '../../components/layout/Header'
import Record from '../dashboard/components/Records'
import axios from 'axios'

export default {
   components: {
       Header,
       Record
   },
   data(){
       return {
           persons: [
                
            ],
            allPersons: []
       }
   },
   created(){
       this.getRecords();
   },
   methods: {
       getRecords(){
        axios.get('https://nameless-basin-94170.herokuapp.com/api/records')
        .then(res => {
            this.persons = res.data
            this.allPersons = res.data
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

<style>
    .record {
        padding: 20px;
    }
</style>