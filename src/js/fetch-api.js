/** @format */

import axios from 'axios';

const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function fetchGetId(id) {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
}

export async function fetchPopular(popular) {
  const response = await axios.get(`${URL}/${popular}`);
  return response.data;
}

export async function updateRating(id, rate, email) {
	const response = await axios.patch(`${URL}/${id}/rating`, {
		rate,
		email,
	});
	return response.data;
}
export async function makeOrder(name, phone, email,comment) {
	const response = await axios.post(`https://tasty-treats-backend.p.goit.global/api/orders/add`, {
		name,
		phone,
		email,
		comment,
	});
	return response.data;
}




