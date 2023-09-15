// const result = fetch('https://tasty-treats-backend.p.goit.global/api/recipes?page=1&area=Irish')
//     .then((resp) => resp.json())
//     .then((data) => console.log(data.totalPages))
//     .catch((err) => console.log('fuck', err))


// const data = {
//      area: "Irish",
// category: "Beef",
// description: "A traditional Irish dish made with lamb, potatoes, carrots, onions, and herbs, cooked in a broth or gravy.",
// ingredients: (13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
// instructions: "Heat the oven to 180C/350F/gas mark 4. Drain and rinse the soaked wheat, put it in a medium pan with lots of water, bring to a boil and simmer for an hour, until cooked. Drain and set aside.\r\n\r\nSeason the lamb with a teaspoon of salt and some black pepper. Put one tablespoon of oil in a large, deep sauté pan for which you have a lid; place on a medium-high heat. Add some of the lamb – don't overcrowd the pan – and sear for four minutes on all sides. Transfer to a bowl, and repeat with the remaining lamb, adding oil as needed.\r\n\r\nLower the heat to medium and add a tablespoon of oil to the pan. Add the shallots and fry for four minutes, until caramelised. Tip these into the lamb bowl, and repeat with the remaining vegetables until they are all nice and brown, adding more oil as you need it.\r\n\r\nOnce all the vegetables are seared and removed from the pan, add the wine along with the sugar, herbs, a teaspoon of salt and a good grind of black pepper. Boil on a high heat for about three minutes.\r\n\r\nTip the lamb, vegetables and whole wheat back into the pot, and add the stock. Cover and boil for five minutes, then transfer to the oven for an hour and a half.\r\n\r\nRemove the stew from the oven and check the liquid; if there is a lot, remove the lid and boil for a few minutes.",
// preview: "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg",
// rating: 4.46,
// tags: (2) ['Stew', 'Meat'],
// thumb: "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg",
// time: "160",
// title: "Irish stew",
// youtube: "https://www.youtube.com/watch?v=kYH2qJXnSMo",
//     _id: "6462a8f74c3d0ddd28897fbc"
// }

const page = document.querySelector('.page');
const totalPages = document.querySelector('.totalPages');
const rangeButtons = document.querySelector('.range-btns')
const btn = document.querySelector('.check');

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const pageValue = Number(page.value);
    const totalValue = Number(totalPages.value);
    let rangeButtonsArray = '';
    if (pageValue === 1) {
        rangeButtonsArray = `<button class="btn current-pagination-btn">1</button>`;
    } else if (pageValue === 2) {
        rangeButtonsArray = `<button class="btn pagination-btn">1</button><button class="btn current-pagination-btn">2</button>`;
    } else if (pageValue >= 3) {
        rangeButtonsArray = `<button class="btn pagination-btn">...</button>
        <button class="btn pagination-btn">${pageValue - 1}</button>
        <button class="btn current-pagination-btn">${pageValue}</button>`;
    } if ((totalValue - pageValue) === 0) {
    } else if ((totalValue - pageValue) === 1) {
        rangeButtonsArray += `<button class="btn pagination-btn">${pageValue + 1}</button>`
    } else if ((totalValue - pageValue) >= 2) {
        rangeButtonsArray += `<button class="btn pagination-btn">${pageValue + 1}</button><button class="btn pagination-btn">...</button>`
    }
    rangeButtons.innerHTML = rangeButtonsArray;
})


