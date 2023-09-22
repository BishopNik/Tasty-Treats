import Swiper from 'swiper/bundle';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.dish-slider', {
  direction: 'horizontal',
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 10000,
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
      ({ cook, topic }) => `
      <div class="swiper-slide">
        <div class="swiper-flex-container">
          <div style="background-image: url(${cook.imgWebpUrl})" class="slider-cook-img"></div>
          <div class="slider-dish-container">
                  <img src="${topic.previewWebpUrl}">
                  <h2 class="">${topic.name}</h2>
                  <p>${topic.area}</p>
          </div>
          <div style="background-image: url(${topic.imgWebpUrl});" class="slider-dish-fullscreen"></div>
        </div>
      </div>
      `
    )
    .join('');
}
