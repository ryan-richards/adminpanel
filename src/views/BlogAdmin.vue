<template>
<div class="title has-text-white">Contact Form Enquiries : {{posts.length}}</div>


<div v-show="show" class="card mb-5" v-for="(post,index) in posts" :key="post.id">
  <header class="card-header">
    <p class="card-header-title has-text-white">
      {{post.name}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>

  <body class="card-body p-4">
     <p class="card-body-title has-text-white">
      {{post.venue}} : {{post.date}}
    </p>
    <p class="pt-4 pb-4" >
      {{post.message}}
    </p>
  </body>

  <footer class="card-footer">
     <a v-bind:href="`mailto:` + post.recipient + `?subject=Brook%20Avenue&body=Response`" class="card-footer-item">Respond</a>
     <router-link @click="handleCreateBooking(post)" class="card-footer-item edit" to="/add">Create Booking</router-link>
    <a @click="handleDelete(post.id) , removeElement(index)" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"
import {store } from '../store'

export default {
    name: "blog-posts",
    data() {
        return {
            posts:[],
            show : true
        };
    },
    async mounted() {
    const { data, error } = await supabase.from('contact').select('*')
    .order('added', { ascending: false })
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
            .from('contact')
            .delete()
            .eq('id', id)

            if (error) throw error
               console.log("contact message deleted")
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
          handleCreateBooking,
            handleDelete,
        }
      },
      methods: {
    removeElement: function (index) {
      console.log('removing')
    this.posts.splice(index, 1);
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
