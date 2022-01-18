<template>
<div class="title has-text-white">Replied To : {{posts.length}}</div>


<div v-show="show" class="card mb-5" v-for="post in posts" :key="post.id">
  <header class="card-header">
    <p class="card-header-title has-text-white">
      {{post.email}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>

  <body class="card-body p-4">
     <p class="card-body-title has-text-white">
      <p>Venue: {{post.venue}}</p>
      <p>Guests : {{post.guests}}</p>
      <p>Event Date : {{ formatDate(post.date) }}</p>
    </p>
    <p class="pt-4 pb-4" >
      {{post.message}}
    </p>
  </body>

  <footer class="card-footer">
    <router-link @click="handleCreateBooking(post)" class="card-footer-item edit" to="/add">Create Booking</router-link>
    <a @click="handleDelete(post.id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"
import {store } from '../store'

import formatDateMixin from '../mixins/formatDateDayJs.js';

export default {
    name: "blog-posts",
    data() {
        return {
            posts:[],
            show : true
        };
    },
    async mounted() {
    const { data, error } = await supabase.from('Interested').select('*')
    .order('created_at', { ascending: false })
    console.log(data);
    if(error) {
        console.error(error);
    } else {
        this.posts = data;
    }
    },

      setup(){
        const handleDelete = async (id) => {
            try {
              const  { data, error } = await supabase
            .from('Interested')
            .delete()
            .eq('id', id)

            if (error) throw error
               console.log("contact message deleted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
        } 

        const handleCreateBooking = (email) => {
          store.createBooking.email = email.email
          store.createBooking.venue = email.venue
          store.createBooking.guests = email.guests
          store.createBooking.date = email.date
          console.log(store.createBooking)
        }
        return {
            handleCreateBooking,
            handleDelete
        }
      },
      methods: {
    removeElement: function (index) {
      console.log('removing')
    this.posts.splice(index, 1);
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
