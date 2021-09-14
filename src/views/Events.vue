<template>
  <div class="title has-text-white">Events : {{filteredDate.length}}</div>

  <div class="search-wrapper pb-2">
    <input type="text" v-model="search" placeholder="Search" />
  </div>

  <div class="buttons">
    <div class="button" @click="filterKey = 'all'">All</div>
    <div class="button" @click="(filterKey = 'week'), (weekModifer = 0)">
      This Week
    </div>
    <div class="button" @click="(filterKey = 'week'), (weekModifer = 1)">
      Next Week
    </div>
    <div class="button" @click="(filterKey = 'month'), (monthModifier = 0)">
      This Month
    </div>
    <div class="button" @click="(filterKey = 'month'), (monthModifier = 1)">
      Next Month
    </div>
    <div class="button" @click="(filterKey = 'year'), (yearModifier = 0)">
      2021
    </div>
    <div class="button" @click="(filterKey = 'year'), (yearModifier = 1)">
      2022
    </div>
  </div>

  <div v-for="event in filteredDate" :key="event.id">
    <event-item v-bind="event" />
  </div>
</template>

<script>
import EventItem from "../components/EventItem.vue";
import { supabase } from "../supabase";
import moment from "moment";

export default {
  components: { EventItem },
  name: "bookings",
  data() {
    return {
      search: "",
      events: [],
      weekModifer: 0,
      monthModifier: 0,
      yearModifier: 0,
      filterKey: "all",
    };
  },
  async mounted() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });
    console.log(data);
    if (error) {
      console.error(error);
    } else {
      this.events = data;
    }
  },

  computed: {
    filteredDate() {
      return this[this.filterKey].filter((event) => {
        return (
          event.date.toLowerCase().replace(/ +/g,"").includes(this.search.toLowerCase().replace(/ +/g,"")) ||
          event.email.toLowerCase().replace(/ +/g,"").includes(this.search.toLowerCase().replace(/ +/g,"")) ||
          event.venue.toLowerCase().replace(/ +/g,"").includes(this.search.toLowerCase().replace(/ +/g,"")) ||
          event.name.toLowerCase().replace(/ +/g,"").includes(this.search.toLowerCase().replace(/ +/g,"")) 
        );
      });
    },
    all() {
      return this.events;
    },
    week() {
      moment.updateLocale("en", {
        week: {
          dow: 1, // Monday is the first day of the week.
        },
      });
      return this.events.filter((event) => {
        const date = new Date();
        const week = moment(date).week();
        const year = moment(date).year();
        const eventDate = moment(event.date).week();
        const eventYear = moment(event.date).year();
        return eventDate == week + this.weekModifer && eventYear == year;
      });
    },
    month() {
      return this.events.filter((event) => {
        const date = new Date();
        const month = moment(date).month();
        const year = moment(date).year();
        const eventMonth = moment(event.date).month();
        const eventYear = moment(event.date).year();
        return eventMonth == month + this.monthModifier && eventYear == year;
      });
    },
    year() {
      return this.events.filter((event) => {
        const date = new Date();
        const year = moment(date).year();
        const eventDate = moment(event.date).year();
        return eventDate == year + this.yearModifier;
      });
    },
  },
};
</script>

<style>
a {
  color: rgb(231, 231, 231);
}

.card-footer-item:hover {
  color: aliceblue;
  background-color: rgb(83, 75, 121);
}

.card-footer-item.danger:hover {
  color: aliceblue;
  background-color: rgb(190, 74, 74);
}

.card-footer-item.paid:hover {
  color: aliceblue;
  background-color: rgb(74, 133, 95);
}

.card-header.green {
  background-color: rgb(74, 133, 95);
}

.card-header {
  background-color: rgb(104, 138, 153);
  border-radius: 5px;
}

.card-footer-item.edit:hover {
  color: aliceblue;
  background-color: rgb(180, 116, 63);
}

input[type="text"],
input[type="number"],
textarea {
  font-size: 16px;
}
</style>
