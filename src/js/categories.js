// Подключаю axios
import axios from 'axios';

// Забираю из верстки кнопку "All categories" и контейнер для списка категорий
const list = document.querySelector(".categories-list");
const allCategoriesBtn = document.querySelector(".all-categories-btn");

let listArr;

// Делаю запрос на получение данных
async function fetchCategories() {
    axios.defaults.baseURL = "https://tasty-treats-backend.p.goit.global/api";
    const response = await axios.get(`/categories`);
    return response.data;  
}

// Обработка данных, создание списка категорий в HTML
fetchCategories()
    
.then(data => {
    let arrCalegories = [...data]
    list.insertAdjacentHTML("beforeend", createCategoriesList(arrCalegories));
    listArr = [...list.children];
}) 
        
.catch(() => {
    console.log('Oops! Something went wrong! Try reloading the page!')
})


// Функция для создания списка
function createCategoriesList(arr) {
    return arr.map(({ name, _id }) => `
    <li><button type="button" class="categories-btn" id="${_id}">${name}</button></li>
    `).join("")
}


// Ставлю прослушиватели на кнопку и список
allCategoriesBtn.addEventListener("click", onAllCategoriesBtnClick);
list.addEventListener("click", onListClick)


// Функция для передачи данных всех категорий
function onAllCategoriesBtnClick() {
    clearCurrentCategory(listArr);
    fetchCategories()
    
    .then(data => {
        let arrCalegories = [...data]
        console.dir(arrCalegories);
        return arrCalegories
    }) 
            
    .catch(() => {
        console.log('Oops! Something went wrong! Try reloading the page!')
    })
}


// Функция для передачи данных одной категории
function onListClick(evt) {
    clearCurrentCategory(listArr);
    
    evt.target.classList.add("curent-category")
    let currentCategory = evt.target.textContent;
    console.dir(currentCategory);

    return currentCategory;
}


// Функция для снятия выделения текущей категории 
function clearCurrentCategory(arr) {
    for (let i = 0; i < arr.length; i += 1){
        if (arr[i].children[0].classList.contains("curent-category")) {
            arr[i].children[0].classList.remove("curent-category")
        } 
    }
}

