<template>
<div>
    <div class="columns pt-6 is-multiline">
        <div class="column has-text-centered is-one-third">
             <router-link to="/events">
            <div class="card p-6">
                <div class="subtitle has-text-white">Events</div>
            </div>
             </router-link>
        </div>
          <div class="column has-text-centered is-one-third">
              <router-link to="/add">
            <div class="card p-6">
                <div class="subtitle  has-text-white">Add Event</div>
            </div>
            </router-link> 
        </div>
          <div class="column has-text-centered is-one-third">
            <router-link to="/inquiry">
            <div class="card p-6">
                <div class="subtitle  has-text-white">Enquiry List</div>
            </div>
            </router-link> 
        </div>
        
        <div class="column has-text-centered is-one-third">
            <router-link to="/blogadmin">
            <div class="card p-6">
                <div class="subtitle has-text-white">Contact List</div>
            </div>
            </router-link> 
        </div>     

        <div class="column has-text-centered is-one-third">
            <router-link to="/replied">
            <div class="card p-6">
                <div class="subtitle has-text-white">Replied to</div>
            </div>
            </router-link> 
        </div> 

    </div>
</div>
    
</template>

<style scoped>

.card.blog:hover{
background-color:rgb(203, 211, 133);
}

.card:hover{
background-color:rgb(133, 175, 211);
}


</style>