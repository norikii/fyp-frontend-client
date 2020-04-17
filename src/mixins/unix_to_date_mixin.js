export default {
    computed: {
        convertUnixToDate(unix) {
            if (unix == null) {
                return 'Have not signed yet.';
            }

            // converting to milliseconds
            let milliseconds = unix * 1000;
            // initializing the date object
            const dateObject = new Date(milliseconds);

            return dateObject.toLocaleString()
        }
    }
}