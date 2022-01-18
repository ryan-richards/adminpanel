import { reactive } from "vue"

export const store = reactive({
  user: {},
  createBooking: {
    email: '',
    venue: '',
    guests: '',
    date: ''
  }
})