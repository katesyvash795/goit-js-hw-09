
import Notiflix from "notiflix";
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stepInput = document.querySelector('input[name="step"]');
    const amountInput = document.querySelector('input[name="amount"]');

    const delay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    const promises = [];
    for (let i = 1; i <= amount; i++) {
      promises.push(createPromise(i, delay + (i - 1) * step));
    }

    promises.forEach((promise) => {
      promise
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    });

    form.reset();
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
