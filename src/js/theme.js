/** @format */

const currentPageName = document
    .querySelector('[http-equiv]')
    .getAttribute('content');
const navigationLinksArray = Array.from(
    document.querySelectorAll('.nav-link')
);

navigationLinksArray.forEach(linkElement => {
    const name = linkElement.getAttribute('link-name');
    if (name === currentPageName) {
        console.log('Selected page: ' + name);
        linkElement.classList.add('current');
    } else {
        linkElement.classList.remove('current');
    }
});


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
    updateThemeByTime();
  }

  function updateThemeByTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= 23 || currentHour < 1) {
      el.setAttribute('data-theme', 'dark');
      checkbox.checked = true;
    } else {
      el.removeAttribute('data-theme');
      checkbox.checked = false;
    }
  }
}
theme();