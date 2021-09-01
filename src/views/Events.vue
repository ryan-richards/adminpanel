<template>
<div class="container">

  <div class="title has-text-white">Inquiry List : {{events.length}}</div>

<div v-for="event in events" :key="event.id">

<div class="card mb-5">
  <header v-bind:class="{ green: event.paid }" class="card-header">
    <p class="card-header-title has-text-white">
      {{event.email}} : {{ formatDate(event.date) }}
    </p>
    <button @click="event.expand = !event.expand"  class="card-header-icon" aria-label="more options">
     <span class="iconify" data-icon="uim:angle-down" data-width="35" data-height="35"></span>
    </button>
  </header>
  <div v-if="event.expand" class="card-content">
    <div class="span">
      <p>Venue: {{event.venue}}</p>
      <p>Guests : {{event.guests}}</p>
      <p>Event Date : {{ formatDate(event.date) }}</p>
      <p>Notes : {{event.notes}}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a v-show="!event.paid" @click="handlePaid(event.id)" class="card-footer-item paid">Paid</a>
    <a v-bind:href="`mailto:` + event.email + `?subject=Brook%20Avenue&body=Response`" class="card-footer-item">Contact</a>
    <a @click="handleDelete(event.id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>  
  
</div>

</div>



</template>

<script>


import { supabase } from "../supabase"
import formatDateMixin from '../mixins/formatDateDayJs.js';

export default {
    name: "bookings",
    data() {
        return {
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

      setup(){
        const handleDelete = async (id) => {
            try {
              const  { data, error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id)

            if (error) throw error
               console.log("deleted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
           
        }

        const handlePaid = async (id) => {
            try {      
          const { data, error } = await supabase
          .from('bookings')
          .update({ paid: 'true' })
                    .eq('id', id)

            if (error) throw error
               console.log("inserted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
           
        }

        return {
          handlePaid,
          handleDelete,
        }
      },
      methods: {
    removeElement: function (index) {
    this.events.splice(index, 1);
  }
},
mixins: [formatDateMixin],
        computed: {
            formattedDate() {
                return this.formatDate(this.date);
            }
        }
      
}



</script>

<style>

a{
color:rgb(172, 208, 240)
}

.card-footer-item:hover {
  background-color:rgb(161, 218, 245)
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

</style>
