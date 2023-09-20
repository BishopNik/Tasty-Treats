/** @format */

function theme() {
	const checkbox = document.querySelector('.theme-switcher input[type="checkbox"]');

	const el = document.documentElement;
	checkbox.addEventListener('change', () => {
		if (el.hasAttribute('data-theme')) {
			el.removeAttribute('data-theme');
			localStorage.removeItem('theme');
		} else {
			el.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		}
	});
	function setThemeFromMediaQuery() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			el.setAttribute('data-theme', 'dark');
			checkbox.checked = true;
		}
	}

	if (localStorage.getItem('theme') !== null) {
		el.setAttribute('data-theme', 'dark');
		checkbox.checked = true;
	} else {
		setThemeFromMediaQuery();
	}
}
theme();

// const currentPageName = document.querySelector('[meta-page-name]').getAttribute('meta-page-name');
// const navigationLinksArray = Array.from(document.querySelectorAll('.nav-link'));

// navigationLinksArray.forEach(linkElement => {
// 	const name = linkElement.getAttribute('link-name');
// 	if (name === currentPageName) {
// 		linkElement.classList.add('current');
// 	} else {
// 		linkElement.classList.remove('current');
// 	}
// });
