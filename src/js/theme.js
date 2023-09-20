/** @format */

function theme() {
	const checkbox = document.querySelectorAll('.theme-switcher input[type="checkbox"]');

	const onChangeAtribute = () => {
		if (el.hasAttribute('data-theme')) {
			el.removeAttribute('data-theme');
			localStorage.removeItem('theme');
		} else {
			el.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		}
	};

	const el = document.documentElement;
	checkbox[0].addEventListener('change', onChangeAtribute);
	checkbox[1].addEventListener('change', onChangeAtribute);

	function setThemeFromMediaQuery() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			el.setAttribute('data-theme', 'dark');
			checkbox[0].checked = true;
			checkbox[1].checked = true;
		}
	}

	if (localStorage.getItem('theme') !== null) {
		el.setAttribute('data-theme', 'dark');
		checkbox[0].checked = true;
		checkbox[1].checked = true;
	} else {
		setThemeFromMediaQuery();
		updateThemeByTime();
	}

	function updateThemeByTime() {
		const currentHour = new Date().getHours();
		if (currentHour >= 18 || currentHour < 6) {
			el.setAttribute('data-theme', 'dark');
			checkbox[0].checked = true;
			checkbox[1].checked = true;
		} else {
			el.removeAttribute('data-theme');
			checkbox[0].checked = false;
			checkbox[1].checked = false;
		}
	}
}
theme();

const currentPageName = document
    .querySelector('[meta-page-name]')
    .getAttribute('meta-page-name');
const navigationLinksArray = Array.from(
    document.querySelectorAll('.nav-link')
);

navigationLinksArray.forEach(linkElement => {
    const name = linkElement.getAttribute('link-name');
    if (name === currentPageName) {
        linkElement.classList.add('current');
    } else {
        linkElement.classList.remove('current');
    }
});

