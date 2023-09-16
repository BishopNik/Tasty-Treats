import Swiper from 'swiper/bundle';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.dish-slider', {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: false,
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: false,
    },
    1280: {
      slidesPerView: 2.3,
      spaceBetween: 16,
      loop: false,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

function fetchDishes() {
  return axios
    .get('https://tasty-treats-backend.p.goit.global/api/events')
    .then(res => {
      // Отримуємо дані від сервера і передаємо їх до createMarkup для створення HTML
      const markup = createMarkup(res.data);
      // Отримуємо посилання на елемент DOM, куди будемо вставляти розмітку
      const mainDiv = document.querySelector('.swiper-wrapper');
      // Вставляємо розмітку у елемент DOM
      mainDiv.innerHTML = markup;
    })
    .catch(err => {
      console.log('Error:', err);
    });
}

fetchDishes();

function createMarkup(arr) {
  return arr
    .map(
      ({ cook: { imgUrl }, topic: { name, area, imgWebpUrl, previewUrl } }) => `
 
            <div style="background-image: url(${imgUrl})" class="swiper-slide slider-cook-img"></div>
            <div class="swiper-slide slider-dish-container">
              <img src="${previewUrl}">
              <h2 class="">${name}</h2>
              <p>${area}</p>
            </div>
            <div style="background-image: url(${imgWebpUrl})" class="swiper-slide slider-dish-fullscreen"></div>
      `
    )
    .join('');
}
