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

export async function fetchAreas() {
	axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';
	const response = await axios.get(`/areas`);
	return response.data;
}

export async function fetchIngred() {
	axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';
	const response = await axios.get(`/ingredients`);
	return response.data;
}

export async function fetchRecipeCards(api, options) {
	let fetchResult = {};
	await axios
		.get(api, options)
		.then(resp => {
			(fetchResult.results = resp.data.results),
				(fetchResult.currentPage = resp.data.page),
				(fetchResult.totalPages = resp.data.totalPages);
		})
		.catch(err => console.log(err));
	return fetchResult;
}
