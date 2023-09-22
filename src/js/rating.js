/** @format */

import { updateRating } from './fetch-api';
import Notiflix from 'notiflix';

let refs = {};

function toggleModal() {
	const classList = refs.modal.classList;

	if (classList.contains('is-hidden')) {
		classList.remove('is-hidden');
	} else {
		classList.add('is-hidden');
		refs.form.reset();
		refs.span.innerHTML = '0.0';

		refs.inputs.forEach(el => {
			el.children[0].classList.remove('active');
		});
	}
}

const handler = e => {
	const value = Number(e.target.value);

	refs.span.innerHTML = value.toFixed(1);

	refs.inputs.forEach((el, index) => {
		if (index <= value - 1) {
			el.children[0].classList.add('active');
		} else {
			el.children[0].classList.remove('active');
		}
	});
};

function onCloseModal({ target, key }) {
	if (refs.modal === target || key === 'Escape') {
		refs.modal.classList.add('is-hidden');
	}
}

const handleSubmit = async (e, id) => {
	e.preventDefault();

	const form = new FormData(e.target);
	const data = Object.fromEntries(form);

	try {
		const responseData = await updateRating(id, Number(data.rate), data.email);
		toggleModal(refs);
		refs.form.reset();

		refs.inputs.forEach((el, index) => {
			el.children[0].classList.remove('active');
		});
		refs.span.innerHTML = '0.0';
	} catch (error) {
		Notiflix.Notify.failure(error.response.data.message);
	}
};

function removeListeners() {
	refs.openModalBtn.removeEventListener('click', toggleModal);
	refs.closeModalBtn.removeEventListener('click', toggleModal);
	document.removeEventListener('keydown', onCloseModal);

	refs.inputs.forEach(el => {
		el.children[1].removeEventListener('change', handler);
	});

	refs.form.removeEventListener('submit', handleSubmit);
}

export function createListeners(id) {
	refs = {
		openModalBtn: document.querySelector('#modal-rating-opener'),
		closeModalBtn: document.querySelector('#modal-rating-closer'),
		modal: document.querySelector('#modal-rating-js'),
		submit: document.querySelector('.modal-submit-button-rating'),
		form: document.querySelector('.rating-form'),
		inputs: document.querySelectorAll('.star-input'),
		span: document.querySelector('.count-rating'),
	};

	try {
		removeListeners();
	} catch (e) {
		console.log(e);
	}

	refs.openModalBtn.addEventListener('click', toggleModal);
	refs.closeModalBtn.addEventListener('click', toggleModal);
	document.addEventListener('keydown', onCloseModal);

	refs.inputs.forEach(el => {
		el.children[1].addEventListener('change', handler);
	});

	refs.form.addEventListener('submit', async e => handleSubmit(e, id));
}
