<template>
    <div class="title">Add Blog Post</div>
    <div class="subtitle">Enter details below</div>
    <form @submit.prevent="updatePost" name="Quote" style="padding-bottom:10rem;">
            <div class="field">
        <label class="label">Thumbnail Img</label>
        <div class="control">
          <input
            class="input"
            name="thumbnail"
            type="text"
            placeholder="Paste image link here"
            v-model="thumbnail"
          />
        </div>
      </div>
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
          <textarea
            class="textarea"
            name="content"
            placeholder="Paste markdown here"
            rows="10"
            v-model="content"
          ></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Short Blurb</label>
        <div class="control">
          <textarea
            class="textarea"
            name="short"
            placeholder="Paste short post blurb here."
            rows="10"
            v-model="short"
          ></textarea>
        </div>
      </div>

     <div>
      <input
        type="submit"
        class="button block primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>
    </form>
</template>




<script>

import { onMounted, ref } from "vue"
import { supabase } from "../supabase";
import { useRoute} from "vue-router"

export default {
    
    setup() {
        const loading = ref(true)
        const category = ref("")
        const title = ref("")
        const content = ref("")
        const id = ref("")
        const short = ref("")
        const thumbnail = ref("")
        const route = useRoute()

    async function getPost() {

        try {
        loading.value = true

        let { data, error, status } = await supabase
          .from("blog-posts")
          .select(`*`)
          .eq("id", route.params.id)
          .single()
        if (error && status !== 406) throw error

        if(data){
          category.value = data.category
          title.value = data.title
          content.value = data.content
          id.value = data.id
          thumbnail.value = data.thumbnail
          short.value = data.short
        }

      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }

    }


    async function updatePost() {
        try {
            loading.value = true

            const updates = {
            id: id.value,
            category: category.value,
            title: title.value,
            content: content.value,
            thumbnail: thumbnail.value,
            short: short.value,
            updated_at: new Date(),
            }

            let { error } = await supabase.from("blog-posts").upsert(updates, {
            returning: "minimal", // Don't return the value after inserting
            })

        if (error) throw error
        } catch (error) {
            alert(error.message)
        } finally {
            loading.value = false
        }
        }

        onMounted(() => {
         getPost()
        })

    return {
      loading,
      category,
      title,
      content,
      id,
      thumbnail,
      short,
      updatePost,
    }


    },
}


</script>


