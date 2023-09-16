const list = document.querySelector(".categories-list");
const allCategoriesBtn = document.querySelector(".all-categories-btn");


const BASE_URL = "https://tasty-treats-backend.p.goit.global/api";


function fetchCategories() {
    return fetch(`${BASE_URL}/categories`)
    .then(response => {
        if (!response.ok) {
            throw new Error(console.log('Oops! Something went wrong! Try reloading the page!'))
        }
        return response.json();
    })
}


fetchCategories()
    
.then(data => {
    let arrCalegories = [...data]
    list.innerHTML = createCategoriesList(arrCalegories);
    // return arrCalegories
}) 
        
.catch(() => {
    console.log('Oops! Something went wrong! Try reloading the page!')
})

function createCategoriesList(arr) {
    return arr.map(({ name, _id }) => `
    <li><button type="button" class="categories-btn" id="${_id}">${name}</button></li>
    `).join("")
}


allCategoriesBtn.addEventListener("click", onAllCategoriesBtnClick);
list.addEventListener("click", onListClick)

function onAllCategoriesBtnClick() {
    fetchCategories()
    
    .then(data => {
        console.dir([...data]);
        let arrCalegories = [...data]
        return arrCalegories
    }) 
            
    .catch(() => {
        console.log('Oops! Something went wrong! Try reloading the page!')
    })
}

function onListClick(evt) {
    console.dir(evt.target);
    // .classList.remove(cls)
    evt.target.classList.add("curent-category")
    let currentCategory = evt.target.textContent;
    console.dir(currentCategory);

    return currentCategory;
}

