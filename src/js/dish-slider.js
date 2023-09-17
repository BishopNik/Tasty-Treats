import Swiper from 'swiper/bundle';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.dish-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  keyboard: {
    enabled: true,
  },
});

async function fetchDishes() {
  try {
    const res = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/events'
    );

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
      <div class="swiper-slide" style="min-width: 871px; display: flex; flex-direction: row; gap: 16px;">
        <div style="background-image: url(${imgUrl})" class="slider-cook-img"></div>
        <div class="slider-dish-container">
          <img src="${previewUrl}">
          <h2 class="">${name}</h2>
          <p>${area}</p>
        </div>
        <div style="background-image: url(${imgWebpUrl});" class="slider-dish-fullscreen"></div>
      </div>
      `
    )
    .join('');
}
