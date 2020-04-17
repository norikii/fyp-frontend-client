export default {
    computed: {
        convertUnixToDate(unix) {
            // converting to milliseconds
            let milliseconds = unix * 1000;
            // initializing the date object
            const dateObject = new Date(milliseconds);

            return dateObject.toLocaleString()
        }
    }
}