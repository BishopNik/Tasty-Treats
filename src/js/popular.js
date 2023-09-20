/** @format */

import { onOpenWindow } from './recipe';

import axios from 'axios';
import Notiflix from 'notiflix';

const popularList = document.querySelector(".popular-list")

// Делаю запрос на получение данных
async function fetchPopulars() {
	axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
	const response = await axios.get(`/popular`);
	return response.data;
}

// Обработка данных, создание разметки в HTML
fetchPopulars()
	.then(data => {
		let arrPopulars = [...data];
		popularList.insertAdjacentHTML('beforeend', createPopularsMarcup(arrPopulars));
		console.dir(popularList.children);
		addClass(popularList.children);
	})

	.catch(() => {
		Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
	});


// Функция для создания разметки
function createPopularsMarcup(arr) {
	return arr
		.map(
			({ _id, title, description, preview, popularity }) =>
				`<li class="popular-item" id="${_id}">
					<div class="popular-wraper">
						<img
							class="popular-img"
							src= ${preview}
							alt="French omelette"
							loading="lazy"
							height="64"
							width="64"
						/>
					</div>
					<div class="popular-containet-description">
						<h3 class="popular-title">${title}</h3>
						<p class="popular-description">
							${description}
						</p>
					</div>
				</li>`
		)
		.join('');
}

popularList.addEventListener('click', onPopularsListClick);

// Функция для выбора рецепта
function onPopularsListClick(evt) {
	if (evt.target === evt.currentTarget) {
         return;
   	}
	
	const currentProduct = evt.target.closest('.popular-item');
	const id = currentProduct.id;
	onOpenWindow(id)
}


function addClass(arr) {
	for (let i = 2; i < arr.length; i += 1){
		console.log(arr[i]);
		arr[i].classList.add('mobile-hidden');
	}
}



