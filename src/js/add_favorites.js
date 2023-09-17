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


function handleAddFavouriteBtn(evt) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];


  if (!evt.target.classList.contains('js-add-fav-btn')) {
    return;
  }

  console.log('<< add fav via btn >>');
  console.log(evt.target.closest('.js-add-fav-btn'));
  console.log(evt.target.classList);

  const recipeId = evt.target.closest('.js-add-fav-btn').dataset.id;
  console.log(recipeId);

  const idx = favorites.indexOf(recipeId);
  console.log(idx);

  //const svg = evt.target.closest('svg');

  const btn = evt.target.closest('button');
  //console.log(btn);

  if (recipeId) {
    if (idx === -1) {
      favorites.push(recipeId);
      btn.innerHTML=`Remove favorite`
    } else {
      favorites.splice(idx, 1);
      btn.innerHTML=`Add to favorite`
    }
  }
 
  localStorage.setItem('favorites', JSON.stringify(favorites));
}


export { handleLikeBtn };
export { handleAddFavouriteBtn };

