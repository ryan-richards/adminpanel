import dayjs from 'dayjs';

export default {
    methods: {
        formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('D MMM, YYYY');
        },
        formatTime(timeString){
            const time = dayjs(timeString);
            return time.format('HH:mm')
        }
    }
}