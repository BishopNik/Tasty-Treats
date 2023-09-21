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
  // width: 891,
  keyboard: {
    enabled: true,
  },
  // breakpoints: {
  //   375: {
  //     width: 508,
  //   },
  //   768: {
  //     width: 891,
  //   },
  //   1280: {
  //     width: 891,
  //   },
  // },
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
      <div class="swiper-slide">
        <div class="swiper-flex-container">
          <div style="background-image: url(${imgUrl})" class="slider-cook-img"></div>
          <div class="slider-dish-container">
                  <img src="${previewUrl}">
                  <h2 class="">${name}</h2>
                  <p>${area}</p>
          </div>
          <div style="background-image: url(${imgWebpUrl});" class="slider-dish-fullscreen"></div>
        </div>
      </div>
      `
    )
    .join('');
}
