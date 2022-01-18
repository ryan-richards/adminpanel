<template>
<div class="title has-text-white">Enquiry List : {{emails.length}}</div>


<div v-show="show" class="card mb-5" v-for="(email, index) in emails" :key="email.id">
  <header class="card-header">
    <p class="card-header-title has-text-white">
      {{email.recipient}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="span">
      <p>Venue: {{email.venue}}</p>
      <p>Guests : {{email.guests}}</p>
      <p>Event Date : {{formatDate(email.date)}}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a @click="handleReplied(email), removeElement(index)" class="card-footer-item">Replied To</a>
    <router-link @click="handleCreateBooking(email)" class="card-footer-item edit" to="/add">Create Booking</router-link>
    <a @click="handleDelete(email.id) , removeElement(index)" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"
import { store } from '../store'
import formatDateMixin from '../mixins/formatDateDayJs.js';

export default {
    name: "new-inquiries",
    data() {
        return {
            emails:[],
            show : true
        };
    },


    async mounted() {
    const { data, error } = await supabase.from('new-inquiries').select('*')
    .order('added', { ascending: false })
    console.log(data);
    if(error) {
        console.error(error);
    } else {
        this.emails = data;
    }
    },

      setup(){


        const handleDelete = async (id) => {

            try {
              const  { data, error } = await supabase
            .from('new-inquiries')
            .insert([])
            .eq('id', id)

            if (error) throw error
               console.log("inserted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
           
        } 


        const handleReplied = async (email) => {
           try {
              const  { data, error } = await supabase
            .from('Interested')
            .insert([
              {
                email : email.recipient,
                venue : email.venue,
                date: email.date,
                guests: email.guests
              }
            ])

            if (error) throw error
               console.log("inserted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
        }

        const handleCreateBooking = (email) => {
          store.createBooking.email = email.recipient
          store.createBooking.venue = email.venue
          store.createBooking.guests = email.guests
          store.createBooking.date = email.date
          console.log(store.createBooking)
        }


        return {
            handleDelete,
            handleReplied,
            handleCreateBooking
        }
      },
      methods: {
      removeElement: function (index) {
      this.emails.splice(index, 1);
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

</style>
