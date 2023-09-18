/** @format */

import axios from 'axios';

const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function fetchGetId(id) {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
}

export async function fetchPopular(popular) {
  try {
    const response = await axios.get(`${URL}/${popular}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
