<template>



  <div class="title">Add Blog Post</div>
  <div class="subtitle">Enter details below</div>
  <form v-on:submit.prevent="handleSubmit" ref="Quote" name="Quote">
    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <input
          class="input"
          name="category"
          type="text"
          placeholder="Updates"
          v-model="category"
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
          v-model="title"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
          <textarea class="textarea" name="content" placeholder="Paste markdown here" rows="10" v-model="content"></textarea>
      </div>
    </div>


    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          class="button"
        >
          Post
        </button>
      </div>
    </div>
  </form>





  
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";

export default {
  setup() {
  
    const category = ref("");
    const title = ref("");
    const content = ref("");


    const handleSubmit = async () => {
      try {
        const { data, error } = await supabase
          .from("blog-posts")
          .insert([
            {
              category: category.value,
              title: title.value,
              content: content.value,
            },
          ]);
        if (error) throw error;
        alert("Blog Posted");
        category.value=""
        title.value=""
        content.value=""
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };
    return {
  category,
  title,
  content,
      handleSubmit,
    };
  }
};
</script>

<style scoped>
.title,
.subtitle,
.button,
.label {
  color: white;
}
</style>