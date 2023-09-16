
const rangeButtons = document.querySelector('.range-btns')
const forwardButtons = document.querySelectorAll('.forward-arrow-btn-js');
const backButtons = document.querySelectorAll('.back-arrow-btn-js');
const recipeCards = document.querySelector('.recipe-cards');


async function renderCards() {
    let responseData;
    await fetch('https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=9')
        .then(resp => { return resp.json() })
        .then(data => {responseData = data})
    console.log(responseData)
    const recipesInfo = responseData.results;
    let htmlCards = '';
    recipesInfo.forEach(elm => {
        htmlCards += `<li
	class="recipe-item mainblock "
	style="
		background: linear-gradient(1deg, rgba(5, 5, 5, 0.6) 4.82%, rgba(5, 5, 5, 0) 108.72%),
			url(${elm.thumb}), lightgray 50%; background-size: cover;
	"
>
        <svg class="like" width="22" height="22">
		<use href="../img/icon/icon.svg#icon-like-full"></use>
	</svg>
	<h3 class="recipe-item-name">${elm.title}</h3>
	<p class="recipe-item-about">${elm.instructions}</p>
	<div class="recipe-item-option">
		<div class="recipe-item-rating">
			<span class="recipe-item-rating-num">${elm.rating}</span>
			<ul class="recipe-item-rating-stars">
				<li class="recipe-item-rating-star">
					<svg class="stars-full">
						<use href="../img/icon/icon.svg#icon-star"></use>
					</svg>
				</li>
				<li class="recipe-item-rating-star">
					<svg class="stars-full">
						<use href="../img/icon/icon.svg#icon-star"></use>
					</svg>
				</li>
				<li class="recipe-item-rating-star">
					<svg class="stars-full">
						<use href="../img/icon/icon.svg#icon-star"></use>
					</svg>
				</li>
				<li class="recipe-item-rating-star">
					<svg class="stars-full">
						<use href="../img/icon/icon.svg#icon-star"></use>
					</svg>
				</li>
				<li class="recipe-item-rating-star">
					<svg class="stars">
						<use href="../img/icon/icon.svg#icon-star"></use>
					</svg>
				</li>
			</ul>
		</div>
		<load ="./button.html" class="recipe-item-see" type="button" name-button="See recipe" />
	</div>
    </li>`
    })
    recipeCards.innerHTML = htmlCards;
    forwardButtons.forEach((elm) => elm.disabled = false)
    backButtons.forEach((elm) => elm.disabled = false)
    const pageValue = Number(responseData.page);
    const totalValue = Number(responseData.totalPages);
    let rangeButtonsArray = '';
    if (pageValue === 1) {
        backButtons.forEach((elm) => elm.disabled = true)
        rangeButtonsArray = `<button class="pagination-btn current-number-btn">1</button>`;
    } else if (pageValue === 2) {
        rangeButtonsArray = `<button class="pagination-btn number-btn">1</button><button class="pagination-btn current-number-btn">2</button>`;
    } else if (pageValue >= 3) {
        rangeButtonsArray = `<button class="pagination-btn number-btn">...</button><button class="pagination-btn number-btn">${pageValue - 1}</button><button class="pagination-btn current-number-btn">${pageValue}</button>`;
    } if ((totalValue - pageValue) === 0) {
        forwardButtons.forEach((elm) => elm.disabled = true)
    } else if ((totalValue - pageValue) === 1) {
        rangeButtonsArray += `<button class="pagination-btn number-btn">${pageValue + 1}</button>`
    } else if ((totalValue - pageValue) >= 2) {
        rangeButtonsArray += `<button class="pagination-btn number-btn">${pageValue + 1}</button><button class="pagination-btn number-btn">...</button>`
    }
    rangeButtons.innerHTML = rangeButtonsArray;
}

renderCards();