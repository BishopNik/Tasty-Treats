<<<<<<< Updated upstream
// Подключаю axios
import axios from 'axios';

// Забираю из верстки кнопку "All categories" и контейнер для списка категорий
=======
import axios from 'axios';

>>>>>>> Stashed changes
const list = document.querySelector(".categories-list");
const allCategoriesBtn = document.querySelector(".all-categories-btn");
let itemArr;

<<<<<<< Updated upstream
let listArr;

// Делаю запрос на получение данных
=======
>>>>>>> Stashed changes
async function fetchCategories() {
    axios.defaults.baseURL = "https://tasty-treats-backend.p.goit.global/api";
    const response = await axios.get(`/categories`);
    return response.data;  
}

// Обработка данных, создание списка категорий в HTML
fetchCategories()
    
.then(data => {
<<<<<<< Updated upstream
    let arrCalegories = [...data]
    list.insertAdjacentHTML("beforeend", createCategoriesList(arrCalegories));
    listArr = [...list.children];
=======
    let arrCategories = [...data]
    console.dir(arrCategories);   
    list.insertAdjacentHTML("beforeend", createCategoriesList(arrCategories));
    itemArr = [...list.children]
    console.log(itemArr);
    return itemArr;
>>>>>>> Stashed changes
}) 
        
.catch(() => {
    console.log('Oops! Something went wrong! Try reloading the page!')
})


<<<<<<< Updated upstream
// Функция для создания списка
=======
>>>>>>> Stashed changes
function createCategoriesList(arr) {
    return arr.map(({ name, _id }) => `
    <li><button type="button" class="categories-btn" id="${_id}">${name}</button></li>
    `).join("")
}


// Ставлю прослушиватели на кнопку и список
allCategoriesBtn.addEventListener("click", onAllCategoriesBtnClick);
list.addEventListener("click", onListClick)

<<<<<<< Updated upstream

// Функция для передачи данных всех категорий
=======
// console.dir(itemArr);
// let btnArr = [];

// const itemArr = Array.from(list.children);
// console.dir(itemArr);
// console.dir(list.children);
// // console.log("fghfhgfh");


// // for (let i = 0; i < 5; i += 1){
// //     console.log(i);
// //     // btnArr.push(itemArr[i].children[0])
// // }


>>>>>>> Stashed changes
function onAllCategoriesBtnClick() {
    clearCurrentCategory(listArr);
    fetchCategories()
    
    .then(data => {
        let arrCalegories = [...data]
        // console.dir(arrCalegories);
        return arrCalegories
    }) 
            
    .catch(() => {
        console.log('Oops! Something went wrong! Try reloading the page!')
    })
}

<<<<<<< Updated upstream

// Функция для передачи данных одной категории
function onListClick(evt) {
    clearCurrentCategory(listArr);
    
    evt.target.classList.add("curent-category")
    let currentCategory = evt.target.textContent;
    // console.dir(currentCategory);
=======
>>>>>>> Stashed changes

function onListClick(evt) {
    

    
    console.log(itemArr);
    console.dir(evt.target);
    evt.target.classList.add("curent-category")
    let curentCategory = evt.target.textContent;
    console.dir(curentCategory);

    return curentCategory;
}

<<<<<<< Updated upstream

// Функция для снятия выделения текущей категории 
function clearCurrentCategory(arr) {
    for (let i = 0; i < arr.length; i += 1){
        if (arr[i].children[0].classList.contains("curent-category")) {
            arr[i].children[0].classList.remove("curent-category")
        } 
    }
}

=======
function clearCurrentCategory(arr, currentCategory) {
    // let nameArr = [];
    // arr.map(({ name }) => nameArr.push(`${name}`));
    // console.dir(nameArr);
    // for (let i = 0; i < nameArr.length; i += 1){
    //     if (currentCategory === nameArr[i]) {
    //         currentCategory.classList.remove("curent-category")
    //     }
    // }
}
>>>>>>> Stashed changes
