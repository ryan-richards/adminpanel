<template>
  <div class="title">Edit Event</div>
  <div class="subtitle">Edit details below</div>
  <form v-on:submit.prevent="updateEvent" name="Quote">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          name="name"
          type="text"
          placeholder="Name"
          v-model="name"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          name="email"
          type="email"
          placeholder="hello@email.com"
          v-model="email"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Mobile No.</label>
      <div class="control">
        <input
          class="input"
          name="mobile"
          type="mobile"
          placeholder="+44"
          v-model="mobile"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Venue</label>
      <div class="control">
        <input
          class="input"
          name="venue"
          type="text"
          placeholder="Venue"
          v-model="venue"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Event Date</label>
      <div class="control">
        <input
          class="input"
          name="date"
          type="date"
          placeholder="Date"
          v-model="date"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Event Time</label>
      <div class="control">
        <input
          class="input"
          name="time"
          type="time"
          placeholder="14:00"
          v-model="time"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Number of Guests</label>
      <div class="control">
        <input
          class="input"
          name="guests"
          type="number"
          placeholder="120"
          v-model="guests"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input
          class="input"
          name="price"
          type="number"
          placeholder="£"
          v-model="price"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Notes</label>
      <div class="control">
        <input
          class="input"
          name="notes"
          type="text"
          placeholder="Notes"
          v-model="notes"
        />
      </div>
    </div>

      <div class="field">
      <label class="label">Flavours</label>
      <div class="control">
        <input
          class="input"
          name="notes"
          type="text"
          placeholder="Picked Flavours"
          v-model="flavours"
        />
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
  <div class="block" style="padding-bottom:6rem;"></div>
</template>



<script>
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

export default {
  setup() {
    const loading = ref(true);
    const name = ref("");
    const email = ref("");
    const mobile = ref("");
    const venue = ref("");
    const date = ref("");
    const guests = ref("");
    const price = ref("");
    const notes = ref("");
    const flavours = ref("");
    const time = ref("");

    const id = ref("");
    const route = useRoute();

    async function getEvent() {
      try {
        loading.value = true;

        let { data, error, status } = await supabase
          .from("bookings")
          .select(`*`)
          .eq("id", route.params.id)
          .single();
        if (error && status !== 406) throw error;

        if (data) {
          name.value = data.name;
          email.value = data.email;
          mobile.value = data.mobile;
          venue.value = data.venue;
          date.value = data.date;
          guests.value = data.guests;
          price.value = data.price;
          notes.value = data.notes;
          flavours.value = data.flavours;
          time.value = data.time;

          id.value = data.id;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateEvent() {
      try {
        loading.value = true;

        const updates = {
          id: id.value,
          name: name.value,
          email: email.value,
          mobile: mobile.value,
          venue: venue.value,
          date: date.value,
          guests: guests.value,
          price: price.value,
          notes: notes.value,
          flavours: flavours.value,
          time: time.value,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("bookings").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });
        alert("Updated");
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getEvent();
    });

    return {
      loading,
      name,
      venue,
      guests,
      mobile,
      notes,
      date,
      price,
      email,
      id,
      time,
      flavours,
      updateEvent,
    };
  },
};
</script>
