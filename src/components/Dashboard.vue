<template>
<div>
    <div class="columns pt-6">
        <div class="column has-text-centered">
             <router-link to="/inquiry">
            <div class="card p-6">
                <div class="subtitle has-text-white">Events</div>
            </div>
             </router-link>
        </div>
          <div class="column has-text-centered">
              <router-link to="/add">
            <div class="card p-6">
                <div class="subtitle  has-text-white">Add Event</div>
            </div>
            </router-link> 
        </div>
          <div class="column has-text-centered">
            <router-link to="/inquiry">
            <div class="card p-6">
                <div class="subtitle  has-text-white">Inquiry List</div>
            </div>
            </router-link> 
        </div>
    </div>
</div>
    
</template>

<style scoped>



.card:hover{
background-color:rgb(133, 175, 211);
}

</style>