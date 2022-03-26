export default {
    methods:{
        convertDateTime(x, timeZone) {
            const milliseconds = x * 1000;
            const dateObject = new Date(milliseconds);
            const humanDateTimeFormat = dateObject.toLocaleString("en-US", {
              timeZone,
            });
            return humanDateTimeFormat;
          },
          convertTime(x, timeZone) {
            const milliseconds = x * 1000;
            const timeObject = new Date(milliseconds);
            const humanTimeFormat = timeObject.toLocaleTimeString("en-US", {
              timeZone,
            });
            return humanTimeFormat;
          },
          convertDate(x) {
            const milliseconds = x * 1000;
            const dateObject = new Date(milliseconds);
            const humanDateFormat = dateObject.toLocaleDateString("en-US");
            return humanDateFormat;
          },
    }
  }