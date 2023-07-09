import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const currentDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning("Please choose a future date");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

let countdownIntervalId = null;

function startCountdown(endDate) {
  countdownIntervalId = setInterval(() => {
    const timeDiff = endDate - new Date();

    if (timeDiff <= 0) {
      stopCountdown();
      updateTimerUI(0, 0, 0, 0);
      window.alert("Countdown finished");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
}

function updateTimerUI(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

startButton.addEventListener("click", () => {
  const selectedDate = datePicker._flatpickr.selectedDates[0];
  if (selectedDate <= currentDate) {
    Notiflix.Notify.warning("Please choose a future date");
    return;
  }
  startCountdown(selectedDate);
  startButton.disabled = true;
});
