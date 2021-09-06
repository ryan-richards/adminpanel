<template>


<div class="title has-text-white">Events : {{events.length}}</div>

  <div class="search-wrapper pb-5">
    <input type="text" v-model="search" placeholder="Search"/>
  </div>

<div v-for="(event, index) in filteredList" :key="event.id">
  <event-item :key="`event-${index}`" :id="event.id" :time="event.time" :expand="event.expand" :paid="event.paid" :email="event.email" :venue="event.venue" :guests="event.guests" :date="event.date" :notes="event.notes"/>
</div>

</template>

<script>

import EventItem from "../components/EventItem.vue"
import { supabase } from "../supabase"

export default {
  components: { EventItem },
    name: "bookings",
    data() {
        return {
            search:'',
            events:[],
        };
    },
    async mounted() {
    const { data, error } = await supabase.from('bookings').select('*')
    .order('date', { ascending: true })
    console.log(data);
    if(error) {
        console.error(error);
    } else {
        this.events = data;
    }
    },
      computed: {
    filteredList() {
      return this.events.filter(event => {
        return event.date.toLowerCase().includes(this.search.toLowerCase()) || 
        event.email.toLowerCase().includes(this.search.toLowerCase()) || 
        event.venue.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
      
}

</script>

<style>

a{
color:rgb(172, 208, 240)
}

.card-footer-item:hover {
  color: aliceblue;
  background-color:rgb(83, 75, 121)
}

.card-footer-item.danger:hover{
  color: aliceblue;
   background-color:rgb(190, 74, 74)
}

.card-footer-item.paid:hover{
  color: aliceblue;
   background-color:rgb(74, 190, 118)
}

.card-header.green {
  background-color:rgb(74, 190, 118)
}

.card-footer-item.edit:hover{
  color: aliceblue;
   background-color:rgb(180, 116, 63)
}

</style>
