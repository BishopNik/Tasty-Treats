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
			checkbox.checked = true;
		}
	}

	if (localStorage.getItem('theme') !== null) {
		el.setAttribute('data-theme', 'dark');
		checkbox.checked = true;
	} else {
		setThemeFromMediaQuery();
		updateThemeByTime();
	}

	function updateThemeByTime() {
		const currentHour = new Date().getHours();
		if (currentHour >= 18 || currentHour < 6) {
			el.setAttribute('data-theme', 'dark');
			checkbox.checked = true;
		} else {
			el.removeAttribute('data-theme');
			checkbox.checked = false;
		}
	}
}
theme();
