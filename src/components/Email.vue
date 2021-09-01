<template>
<div class="title has-text-white">Inquiry List : {{emails.length}}</div>


<div v-show="show" class="card mb-5" v-for="email in emails" :key="email.id">
  <header class="card-header">
    <p class="card-header-title has-text-white">
      {{email.email}}
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
      <p>Event Date : {{email.date}}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a v-bind:href="`mailto:` + email.email + `?subject=Brook%20Avenue&body=Response`" class="card-footer-item">Respond</a>
    <a @click="handleDelete(email.id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"

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
    .order('date', { ascending: true })
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
            .delete()
            .eq('id', id)

            if (error) throw error
               console.log("inserted")
             } catch (error) {
                alert(error.error_description || error.message)
             }
           
        } 
        return {
            handleDelete,
        }
      },
      methods: {
    removeElement: function (index) {
    this.emails.splice(index, 1);
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
