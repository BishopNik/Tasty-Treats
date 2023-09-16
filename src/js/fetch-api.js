/** @format */

import axios from 'axios';

const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function fetchGetId(id) {
	const response = await axios.get(`${URL}/${id}`);
	return response.data;
}

export const fetchGet = async () => {
	const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/categories');
	return response.data;
};
