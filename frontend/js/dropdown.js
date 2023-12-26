const dropdowns = document.querySelectorAll('.users-tools-sort-dropdown');
// Цикл по всем элементам
dropdowns.forEach(dropdown => {
	const select = dropdown.querySelector('.users-tools-sort-dropdown__select');
	const caret = dropdown.querySelector('.users-tools-sort-dropdown__select-caret');
	const menu = dropdown.querySelector('.users-tools-sort-dropdown__menu');
	const options = dropdown.querySelectorAll('.users-tools-sort-dropdown__menu li');
	const selected = dropdown.querySelector('.users-tools-sort-dropdown__select-selected');


	// click event
	select.addEventListener('click', () => {
		select.classList.toggle('users-tools-sort-dropdown__select-clicked');
		caret.classList.toggle('users-tools-sort-dropdown__select-caret-rotate');
		menu.classList.toggle('users-tools-sort-dropdown__menu-open');
	});

	// loop through all option elements
	options.forEach(option => {
		option.addEventListener('click', () => {
			selected.innerText = option.innerText;
			select.classList.remove('users-tools-sort-dropdown__select-clicked');
			caret.classList.remove('users-tools-sort-dropdown__select-caret-rotate');
			menu.classList.remove('users-tools-sort-dropdown__menu-open');
			options.forEach(option => {
				option.classList.remove('active');
			});
			option.classList.add('active');
		});
	});
});