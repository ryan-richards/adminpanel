<template>
<div class="title has-text-white">Inquiry List : {{events.length}}</div>


<div v-show="show"
  class="card mb-5"
 v-for="event in events" :key="event.id">
  <header  v-bind:class="{ green: event.paid }" class="card-header">
    <p class="card-header-title has-text-white">
      {{event.email}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="span">
      <p>Venue: {{event.venue}}</p>
      <p>Guests : {{event.guests}}</p>
      <p>Event Date : {{event.date}}</p>
      <p>Notes : {{event.notes}}</p>
    </div>
  </div>
  <footer class="card-footer">
    
    <a @click="handlePaid(event.id)" class="card-footer-item paid">Paid</a>
    <a v-bind:href="`mailto:` + event.email + `?subject=Brook%20Avenue&body=Response`" class="card-footer-item">Contact</a>
    <a @click="handleDelete(event.id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"

export default {
    name: "bookings",
    data() {
        return {
            events:[],
            show : true
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
