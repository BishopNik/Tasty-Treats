const favoritesImg = document.querySelector('.favorites_img');
const notFavorites = document.querySelector('.not_favorites');
let listCardsFavorites = document.querySelector('.list_cards_favorites');
let btnFavorites = document.querySelector('.favorites_btn')

document.addEventListener("DOMContentLoaded", () => {
   if (localStorage.length === 0) {
            favoritesImg.classList.add('hide_in_mobile');
               notFavorites.classList.remove('hide'); 
    } else {
        favoritesImg.classList.remove('hide_in_mobile');
        notFavorites.classList.add('hide');
    }
});
