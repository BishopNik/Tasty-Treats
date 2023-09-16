export async function fetchPopular() {
  let r = await fetch(
    'https://tasty-treats-backend.p.goit.global/api/recipe/popular'
  );
  let arrayResp = await r.json();
  return arrayResp;
}