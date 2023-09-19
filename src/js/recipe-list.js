/** @format */

import { handleLikeBtn } from './add_favorites';

import axios from 'axios';
import Notiflix from 'notiflix';
import { onOpenWindow } from './recipe';
import { ratingRecipe } from './rating-markup';

const pagination = document.querySelector('.pagination-btns');
const recipeCards = document.querySelector('.recipe-cards');
export const recipesApi = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function fetchRecipeCards(api, options) {
	let fetchResult = {};
	await axios
		.get(api, options)
		.then(resp => {
			(fetchResult.results = resp.data.results),
				(fetchResult.currentPage = resp.data.page),
				(fetchResult.totalPages = resp.data.totalPages);
		})
		.catch(err => console.log(err));
	return fetchResult;
}

function renderCards(results, div, cardStyle) {
	let htmlCards = '';
	let likeIconUrl = '../img/icon/icon.svg#icon-like';
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	results.forEach(elm => {
		if (favorites.indexOf(elm._id) === -1) {
			likeIconUrl = '../img/icon/icon.svg#icon-like';
		} else {
			likeIconUrl = '../img/icon/icon.svg#icon-like-full';
		}

		htmlCards += `<li 
		data-id="${elm._id}"
		class="recipe-item ${cardStyle} js-recipe"
	
	style="
		background: linear-gradient(1deg, rgba(5, 5, 5, 0.6) 4.82%, rgba(5, 5, 5, 0) 108.72%),
			url(${elm.thumb}), lightgray 50%; background-size: cover;
	"
>
			<svg class="like js-like" width="22" height="22">
				<use class="js-like" href="${likeIconUrl}"></use> 
			</svg>
	<h3 class="recipe-item-name">${elm.title}</h3>
	<p class="recipe-item-about">${elm.instructions}</p>
	<div class="recipe-item-option">
		<div class="recipe-item-rating">
			<span class="recipe-item-rating-num">${elm.rating.toFixed(2)}</span>
			<ul class="recipe-item-rating-stars">
				${ratingRecipe(elm.rating)}
			</ul>
		</div>
		<button class="main-button green-button recipe-item-see" type="button" data-id="${
			elm._id
		}">See recipe</button>
	</div>
    </li>`;
	});
	div.innerHTML = htmlCards;
	const seeButtons = document.querySelectorAll('.recipe-item-see');
	seeButtons.forEach(elm =>
		elm.addEventListener('click', evt => onOpenWindow(evt.target.dataset.id))
	);
}

const selectors = {
	list: document.querySelector('.recipe-cards'),
};

selectors.list.addEventListener('click', handleLikeBtn);

function setPaginationButtons(div, page, total, option) {
	const iconRightPath = './img/icon/icon.svg#icon-small-right';
	const iconLeftPath = './img/icon/icon.svg#icon-small-left';
	let arrowButtons = ` <div class="back-btns">
      <button class="pagination-btn arrow-btn back-arrow-btn-js">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn back-arrow-btn-js">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
      </button>
    </div>
    <div class="range-btns"></div>
    <div class="forward-btns">
      <button class="pagination-btn arrow-btn forward-arrow-btn-js">
       <svg class="right-arrow-icon" width="24" height="24">
          <use href="${iconRightPath}"></use>
        </svg>
       </button
      ><button class="pagination-btn arrow-btn forward-arrow-btn-js">
        <div class="right-arrow-icon double-arrow">
          <svg class="icon-double-arrow-one" width="24" height="24">
            <use href="${iconRightPath}"></use></svg
          ><svg class="icon-double-arrow-two" width="24" height="24">
            <use href="${iconRightPath}"></use>
          </svg>
        </div>
      </button>
    </div>`;
	div.innerHTML = arrowButtons;
	let rangeButtons = '';
	const forwardButtons = document.querySelectorAll('.forward-arrow-btn-js');
	const backButtons = document.querySelectorAll('.back-arrow-btn-js');
	const rangeButtonsElm = document.querySelector('.range-btns');
	if (page === 1) {
		backButtons.forEach(elm => (elm.disabled = true));
		rangeButtons += `<button class="pagination-btn current-number-btn">1</button>`;
	} else if (page === 2) {
		rangeButtons += `<button class="pagination-btn number-btn">1</button><button class="pagination-btn current-number-btn">2</button>`;
	} else if (page >= 3) {
		rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button><button class="pagination-btn number-btn">${
			page - 1
		}</button><button class="pagination-btn current-number-btn">${page}</button>`;
	}
	if (total - page === 0) {
		forwardButtons.forEach(elm => (elm.disabled = true));
	} else if (total - page === 1) {
		rangeButtons += `<button class="pagination-btn number-btn">${page + 1}</button>`;
	} else if (total - page >= 2) {
		rangeButtons += `<button class="pagination-btn number-btn">${
			page + 1
		}</button><button class="pagination-btn dot-btn number-btn" disabled>...</button>`;
	}

	rangeButtonsElm.innerHTML = rangeButtons;
	const pagButtons = document.querySelectorAll('.pagination-btn');
	pagButtons.forEach(elm => {
		elm.addEventListener('click', evn => {
			if (
				elm.classList.contains('number-btn') ||
				elm.classList.contains('current-number-btn')
			) {
				option.params.page = Number(elm.textContent);
			} else if (
				elm.firstElementChild.classList.contains('left-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = 1;
			} else if (elm.firstElementChild.classList.contains('left-arrow-icon')) {
				option.params.page -= 1;
			} else if (
				elm.firstElementChild.classList.contains('right-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = total;
			} else if (elm.firstElementChild.classList.contains('right-arrow-icon')) {
				option.params.page += 1;
			} else {
			}
			renderMain(renderCardsOptions);
		});
	});
}

export async function renderMain(options) {
	let responseData;
	await fetchRecipeCards(recipesApi, options).then(data => {
		responseData = data;
	});
	renderCards(responseData.results, recipeCards, 'mainblock');
	setPaginationButtons(
		pagination,
		Number(responseData.currentPage),
		Number(responseData.totalPages),
		options
	);
}

export let renderCardsOptions = {
	params: {
		page: 1,
		limit: 9,
	},
};

// renderMain(renderCardsOptions);
