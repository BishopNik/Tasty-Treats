import Swiper from 'swiper/bundle';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.dish-slider', {
  slidesPerView: 1.85,
  spaceBetween: 8,
  loop: false,
  breakpoints: {
    375: {
      slidesPerView: 1.85,
      spaceBetween: 8,
      loop: false,
    },
    768: {
      slidesPerView: 2.6,
      spaceBetween: 16,
      loop: false,
    },
    1280: {
      slidesPerView: 2.5,
      spaceBetween: 16,
      loop: false,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

async function fetchDishes() {
  try {
    const res = await axios.get('https://tasty-treats-backend.p.goit.global/api/events');
    
    const markup = createMarkup(res.data);
    
    const mainDiv = document.querySelector('.swiper-wrapper');
    
    mainDiv.innerHTML = markup;
  } catch (err) {
    console.log('Error:', err);
  }
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