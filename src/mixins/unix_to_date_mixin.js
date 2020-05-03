export default {
    computed: {
        convertUnixToDate(unix) {
            if (unix == null) {
                return 'Not set yet.';
            }

            // converting to milliseconds
            let milliseconds = unix * 1000;
            // initializing the date object
            const dateObject = new Date(milliseconds);

            return dateObject.toLocaleString()
        }
    }
}