const hbs =require("hbs");

hbs.registerHelper("get_full_time", (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const tanggal = date.getDate();
    const bulan = months[date.getMonth()];
    const tahun = date.getFullYear();
  
    let jam = date.getHours();
    let menit = date.getMinutes();
  
    if (jam < 10) {
      jam = "0" + jam;
    }
  
    if (menit < 10) {
      menit = "0" + menit;
    }
  
    return `${tanggal} ${bulan} ${tahun} ${jam}:${menit} WIB`;
  });
  
  hbs.registerHelper("get_distance_time", (timePost) => {
    const timeNow = new Date();
    const distance = timeNow - timePost;
  
    const seconds = Math.floor(distance / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 60) {
      return `${hours} hours ago`;
    } else if (day < 24) {
      return `${day} day ago`;
    }
  });

// hbs.registerHelper('duration', function(startDate, endDate) {
//   console.log(startDate);
//   console.log(endDate);
//   const duration = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60));
//   console.log(duration);
//   return duration;
// });


hbs.registerHelper('formatDate', function(date) {
  return new Date(date).toLocaleDateString();
});

// hbs.registerHelper('duration', function(startDate, endDate) {
//     console.log(startDate);
//     console.log(endDate);
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   if (isNaN(start) || isNaN(end)) {
//     return "Invalid Date";
//   }

//   const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24));
//   return `${duration} days`;
// });

hbs.registerHelper('duration', function(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (!start || !end || isNaN(start) || isNaN(end)) {
      console.log("startDate atau endDate tidak valid:", start, end);
      return "Invalid Date";
    }
  
    const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    // console.log("Durasi (dalam hari):", duration);
    return `${duration} days`;
  });
  
  hbs.registerHelper('includes', function(array, value) {
    return array && array.includes(value);
  });
  