<template>
  <div class="title">Add Event</div>
  <div class="subtitle">Enter details below</div>
  <form v-on:submit.prevent="handleSubmit" ref="Quote" name="Quote">
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
      <label class="label">Number of Guests</label>
      <div class="control">
        <input
          class="input"
          name="guests"
          type="number"
          placeholder="120"
          v-model.lazy="guests"
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
          v-model.lazy="price"
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

    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          class="button"
        >
          Add Booking
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
    const name = ref("");
    const email = ref("");
    const venue = ref("");
    const guests = ref("");
    const date = ref("");
    const price = ref("");
    const notes = ref("");
    const mobile = ref("");

    const handleSubmit = async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .insert([
            {
              name: name.value,
              email: email.value,
              venue: venue.value,
              guests: guests.value,
              date: date.value,
              price: price.value,
              notes: notes.value,
              mobile: mobile.value
            },
          ]);
        if (error) throw error;
        console.log("inserted");
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };
    return {
      name,
      email,
      mobile,
      venue,
      guests,
      date,
      price,
      notes,
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