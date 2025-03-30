
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");

let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
   
    
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
  
     if (selectedDate <= currentDate) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight'
        });
  
        startButton.disabled = true;
        return;
    }
  
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  };

  

flatpickr("#datetime-picker", options);




function onStart () {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    const timerId = setInterval(()=> {
        const now = new Date();
        const diff = userSelectedDate - now;
      

      if (diff <= 0){
        clearInterval(timerId);
        updateTimer(0);
        datetimePicker.disabled = false;

        iziToast.success({
            title: 'Done',
            message: 'The timer has finished!',
            position: 'topRight',
            timeout: 3000,
          });
       
        return;
      }
         updateTimer(diff); 
    }, 1000);  
    
}

startButton.addEventListener("click", onStart)

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value){
    return String(value).padStart(2,"0");
  };

  function updateTimer(ms){
    const {days, hours, minutes, seconds} = convertMs(ms)

    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds); 
  }
