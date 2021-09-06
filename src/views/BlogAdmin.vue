<template>
<div class="title has-text-white">Blog List : {{posts.length}}</div>


<div v-show="show" class="card mb-5" v-for="post in posts" :key="post.id">
  <header class="card-header">
    <p class="card-header-title has-text-white">
      {{post.title}}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <footer class="card-footer">
    <router-link class="card-footer-item" :to="`/blogedit/${post.id}`">Edit</router-link>
    <a @click="handleDelete(post.id) , removeElement()" class="card-footer-item danger">Delete</a>
  </footer>
</div>

</template>

<script>


import { supabase } from "../supabase"

export default {
    name: "blog-posts",
    data() {
        return {
            posts:[],
            show : true
        };
    },
    async mounted() {
    const { data, error } = await supabase.from('blog-posts').select('*')
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
            .from('blog-posts')
            .delete()
            .eq('id', id)

            if (error) throw error
               console.log("post deleted")
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
