<template>
    <h1>
        {{this.$route.params.id}}
    </h1>

    <div v-for="post in posts" :key="post.id">

 <div class="title">Add Blog Post</div>
  <div class="subtitle">Enter details below</div>
  <form v-on:submit.prevent="handleSubmit" name="Quote">
    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <input
          class="input"
          name="category"
          type="text"
          placeholder="Updates"
          v-model="post.category"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Blog Title</label>
      <div class="control">
        <input
          class="input"
          name="title"
          type="text"
          placeholder="Blog Title"
          v-model="post.title"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
          <textarea class="textarea" name="content" placeholder="Paste markdown here" rows="10" v-model="post.content"></textarea>
      </div>
    </div>


    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          class="button"
        >
         Update
        </button>
      </div>
    </div>
  </form>
    
    
    
    
    </div>




</template>

<script>

import { ref } from "vue";
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
    const { data, error } = await supabase.from('blog-posts').select('*').eq('id', this.$route.params.id)
    console.log(data);
    if(error) {
        console.error(error);
    } else {
        this.posts = data;
    }
    },

      setup(){

    const category = ref("");
    const title = ref("");
    const content = ref("");

    const handleSubmit = async () => {
      try {
        const { data, error } = await supabase
          .from("blog-posts")
          .update([
            {
              category: category.value,
              title: title.value,
              content: content.value,
            },
          ]).eq('id', this.$route.params.id);
        if (error) throw error;
        alert("Blog Posted");
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

        return {
            category,
            title,
            content,
            handleSubmit,
        }
      },
      methods: {
    removeElement: function (index) {
    this.posts.splice(index, 1);
  }
}
      
}



</script>