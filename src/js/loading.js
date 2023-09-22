/** @format */

import throttle from 'lodash.throttle';

window.addEventListener('scroll', throttle(handleScroll, 300));

function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= -30 &&
		rect.bottom - 230 <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

export function handleScroll() {
	const recipeItem = document.querySelectorAll('.recipe-item');

	recipeItem.forEach(item => {
		if (isElementInViewport(item)) {
			const action = item.getAttribute('data-action');
			if (action === 'changeUrl') {
				changeUrl(item);
				item.removeAttribute('data-action');
			}
		}
	});
}

function changeUrl(item) {
	const url = item.dataset.url;
	item.style = `background: linear-gradient(1deg, rgba(5, 5, 5, 0.6) 4.82%, rgba(5, 5, 5, 0) 108.72%),
			url(${url}), lightgray 50%; background-size: cover;"
        >
			<svg class="like js-like" width="22" height="22`;
}
