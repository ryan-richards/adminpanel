<template>

<div class="card mb-5">
  <header v-bind:class="{ green: paid }" class="card-header">
    <p v-if="time" class="card-header-title has-text-white">
      {{email}} : {{ formatDate(date) }} / {{formatTime(date + time)}}
    </p>
      <p v-else class="card-header-title has-text-white">
      {{email}} : {{ formatDate(date) }} 
    </p>
    <button @click="expand = !expand"  class="card-header-icon" aria-label="more options">
     <span class="iconify" data-icon="uim:angle-down" data-width="35" data-height="35"></span>
    </button>
  </header>
  <div v-show="expand" class="card-content">
    <div class="span">
      <p>Venue: {{venue}}</p>
      <p>Guests : {{guests}}</p>
      <p>Event Date : {{ formatDate(date) }}</p>
      <p>Notes : {{notes}}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a v-show="!paid" @click="handlePaid(id)" class="card-footer-item paid">Paid</a>
    <router-link class="card-footer-item edit" :to="`/eventedit/${id}`">Edit</router-link>
    <a v-bind:href="`mailto:` + email + `?subject=Brook%20Avenue&body=Response`" class="card-footer-item">Contact</a>
    <a @click="handleDelete(id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>  





</template>

<script>


import formatDateMixin from '../mixins/formatDateDayJs.js';
import { supabase } from "../supabase"

export default {
  name: "ListItem",
  props: {
    id: Number,
    venue: String,
    notes: String,
    email: String,
    guests: Number,
    date: String,
    paid: Boolean,
    expand: Boolean,
    time: String,
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
            },
            formattedTime(){
                return this.formatTime(this.time)
            }
        }
      
}
  
</script>