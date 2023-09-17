

function handleLikeBtn(evt) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];


  if (!evt.target.classList.contains('js-like')) {

      return;
  }
  const recipeId = evt.target.closest('.js-recipe').dataset.id;

  const idx = favorites.indexOf(recipeId);

  const svg = evt.target.closest('svg');
  
  if (idx === -1) {		
    favorites.push(recipeId);
    svg.innerHTML=`<use class="js-like" href="../img/icon/icon.svg#icon-like-full"></use>`
  } else {		
    favorites.splice(idx, 1);
    svg.innerHTML=`<use class="js-like" href="../img/icon/icon.svg#icon-like"></use>`
  }
 
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export { handleLikeBtn };

