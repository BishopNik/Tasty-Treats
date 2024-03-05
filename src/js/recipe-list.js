/** @format */

import throttle from 'lodash.throttle';
import Pagination from 'tui-pagination';
import { Notify, Loading } from 'notiflix';
import sprite from '../img/icon/icon.svg';

import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';
import { onOpenWindow } from './recipe';
import { fetchRecipeCards } from './fetch-api';
import { handleScroll } from './loading';

const pagination = document.querySelector('.pagination-btns');
const cadrsContainer = document.querySelector('.recipe-cards');
cadrsContainer.addEventListener('click', onOpenModalWindow);
cadrsContainer.addEventListener('click', handleLikeBtn);

const iconRightPath = `${sprite}#icon-small-right`;
const iconLeftPath = `${sprite}#icon-small-left`;

let oldTotalPage;
let paginationBox;
let total_pages;

export let renderCardsOptions = {
	params: {
		page: 1,
		limit: window.screen.width > 767 ? (window.screen.width > 1279 ? 9 : 8) : 6,
	},
};

const option = {
	totalItems: total_pages * renderCardsOptions.params.limit,
	itemsPerPage: renderCardsOptions.params.limit,
	visiblePages: window.innerWidth > 767 ? 2 : 1,
	// centerAlign: true,
	template: {
		page: '<button class="pagination-btn number-btn">{{page}}</button>',
		currentPage: '<button class="pagination-btn current-number-btn">{{page}}</button>',
		moveButton: ({ type }) => {
			let template = '';
			switch (type) {
				case 'first':
					template = `<button class="pagination-btn arrow-btn back-arrow-btn-js">
									<div class="left-arrow-icon double-arrow">
										<svg class="icon-double-arrow-one" width="24" height="24">
											<use href="${iconLeftPath}"></use>
										</svg>
										<svg class="icon-double-arrow-two" width="24" height="24">
											<use href="${iconLeftPath}"></use>
										</svg>
			 						</div>
								</button>`;
					break;

				case 'prev':
					template = `<button class="pagination-btn arrow-btn back-arrow-btn-js">
									<svg class="left-arrow-icon" width="24" height="24">
										<use href="${iconLeftPath}"></use>
									</svg>
		  						</button>`;

					break;

				case 'next':
					template = `<button class="pagination-btn arrow-btn forward-arrow-btn-js">
		   							<svg class="right-arrow-icon" width="24" height="24">
			  							<use href="${iconRightPath}"></use>
									</svg>
		   						</button`;
					break;

				case 'last':
					template = `<button class="pagination-btn arrow-btn forward-arrow-btn-js">
									<div class="right-arrow-icon double-arrow">
										<svg class="icon-double-arrow-one" width="24" height="24">
											<use href="${iconRightPath}"></use>
										</svg>
										<svg class="icon-double-arrow-two" width="24" height="24">
											<use href="${iconRightPath}"></use>
										</svg>
									</div>
								</button>`;
					break;

				default:
					break;
			}

			return template;
		},
		disabledMoveButton: ({ type }) => {
			let template = '';
			switch (type) {
				case 'first':
					template = `<button class="pagination-btn arrow-btn back-arrow-btn-js">
									<div class="left-arrow-icon double-arrow">
										<svg class="icon-double-arrow-one" width="24" height="24">
											<use href="${iconLeftPath}"></use>
										</svg>
										<svg class="icon-double-arrow-two" width="24" height="24">
											<use href="${iconLeftPath}"></use>
										</svg>
			 						</div>
								</button>`;
					break;

				case 'prev':
					template = `<button class="pagination-btn arrow-btn back-arrow-btn-js">
									<svg class="left-arrow-icon" width="24" height="24">
										<use href="${iconLeftPath}"></use>
									</svg>
		  						</button>`;
					break;

				case 'next':
					template = `<button class="pagination-btn arrow-btn forward-arrow-btn-js">
		   							<svg class="right-arrow-icon" width="24" height="24">
			  							<use href="${iconRightPath}"></use>
									</svg>
		   						</button`;
					break;

				case 'last':
					template = `<button class="pagination-btn arrow-btn forward-arrow-btn-js">
									<div class="right-arrow-icon double-arrow">
										<svg class="icon-double-arrow-one" width="24" height="24">
											<use href="${iconRightPath}"></use>
										</svg>
										<svg class="icon-double-arrow-two" width="24" height="24">
											<use href="${iconRightPath}"></use>
										</svg>
									</div>
								</button>`;
					break;

				default:
					break;
			}
			return template;
		},
		moreButton: '<button class="pagination-btn number-btn">...</button>',
	},
};

function renderCards(results, div, cardStyle) {
	let htmlCards = '';
	let likeIconUrl = `${sprite}#icon-like`;
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	results.forEach(elm => {
		if (favorites.indexOf(elm._id) === -1) {
			likeIconUrl = `${sprite}#icon-like`;
		} else {
			likeIconUrl = `${sprite}#icon-like-full`;
		}
		htmlCards += createCard(elm, cardStyle, likeIconUrl);
	});
	div.innerHTML = htmlCards;
	handleScroll();
}

export async function renderMain(options) {
	Loading.dots();
	try {
		const { totalPages, results } = await fetchRecipeCards(options);
		total_pages = totalPages;
		renderCards(results, cadrsContainer, 'mainblock');
		if (oldTotalPage !== totalPages) {
			paginationBox.reset(totalPages * renderCardsOptions.params.limit);
			oldTotalPage = totalPages;
		}
		if (totalPages <= 1) {
			pagination.style.display = 'none';
		} else {
			pagination.style.display = 'flex';
		}

		const paginationBack = document.querySelectorAll('.back-arrow-btn-js');
		if (renderCardsOptions.params.page === 1) {
			paginationBack[0].disabled = true;
			paginationBack[1].disabled = true;
		}

		create_common_paginaton_container();

		Loading.remove(1000);
	} catch (_) {
		Notify.failure('Oops! Something went wrong! Try reloading the page!');
		Loading.remove(1000);
	}
}

//Paganation
paginationBox = new Pagination(pagination, option);

paginationBox?.on('afterMove', ({ page }) => {
	renderCardsOptions.params.page = page;

	renderMain(renderCardsOptions);

	const paginationForward = document.querySelectorAll('.forward-arrow-btn-js');
	const paginationBack = document.querySelectorAll('.back-arrow-btn-js');

	if (total_pages <= page) {
		paginationForward[0].style.display = 'none';
		paginationForward[1].style.display = 'none';
	} else {
		paginationForward[0].style.display = 'block';
		paginationForward[1].style.display = 'block';
	}

	if (page === 1) {
		paginationBack[0].disabled = true;
		paginationBack[1].disabled = true;
	} else {
		paginationBack[0].disabled = false;
		paginationBack[1].disabled = false;
	}

	create_common_paginaton_container();
});

function create_common_paginaton_container() {
	const buttons = document.querySelectorAll('.pagination-btns .number-btn, .current-number-btn');
	const common_container_btns = document.querySelector('.common-pagination-btns');
	const container = document.querySelector('.pagination-btns');

	if (!common_container_btns) {
		const common_container = document.createElement('div');
		common_container.classList.add('common-pagination-btns');

		buttons.forEach(button => {
			common_container.appendChild(button);
		});
		container.insertBefore(common_container, container.children[2]);
	}
}

function onOpenModalWindow({ target }) {
	if (!target.classList.contains('recipe-item-see')) {
		return;
	}
	onOpenWindow(target.dataset.id);
}

function reloadPageOnResize() {
	renderCardsOptions.params.limit =
		window.screen.width > 767 ? (window.screen.width > 1279 ? 9 : 8) : 6;
	oldTotalPage = 0;
	renderMain(renderCardsOptions);
	location.reload();
}

window.addEventListener('resize', throttle(reloadPageOnResize, 2000));
