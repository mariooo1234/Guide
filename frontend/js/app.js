import UserService from './UserService.js';
import {renderHTML, renderCardHTML, renderRefactorCardHTML, renderNewCardHTML} from './render.js';
import userService from './UserService.js';

const checkbox = document.getElementById('grid');
const number = document.getElementById('number');
const wrapper = document.getElementById('wrapper');

const inputBlock = document.querySelector('.articles-addItem-inputBlock');
const input = document.querySelector('.articles-addItem-inputBlock__input');
const addButton = document.querySelector('.articles-addItem__btn');
const closeInputBtn = document.querySelector('.articles-addItem-inputBlock__trash');
const dataItems = document.querySelector('.articles-data-items');
let newData = '';
let newCard = '';

const popup = document.querySelector('.popup');
const card = document.querySelector('.popup-card');

const loader = document.querySelector('.loader');


gsap.registerPlugin(Flip);


//UserService.users.update("656a1954322ca87e4bf35b9e", { name: 'Ivan' }) Пример обновления
let counter = 1;
//656a1954322ca87e4bf35b9e

UserService.users.list().then(({ data }) => {
	dataItems.innerHTML = '';

	data.forEach((user, idx) => {
		newData += renderHTML(user);
		dataItems.innerHTML = newData;
	});

	let dataItem = document.querySelectorAll('.articles-data-items-item');

	gsap.to(dataItem, {opacity: 1, stagger: 0.1, left: 0, duration: 0.25});

	dataItem.forEach((item) => {
		item.addEventListener('click', () => {
			popup.classList.add('open');
			data.forEach(user => {
				if (user._id === item.id) {
					newCard = renderCardHTML(user);
					card.innerHTML = newCard;

					toOpenRefactorCard(user);

					toDeleteUser();
				}
			});

		});
	});
});

/** @callback - Обработчик кнопки сохранения изменений в данных пользователя */
const refactorCard = (user) => {
	const inputsData = document.querySelectorAll('.popup-card-details-item');
	const saveBtn = document.querySelector('.popup-card-btns__save');
	let newUserData = {};
	
	saveBtn.addEventListener('click',() => {
		inputsData.forEach((input) => {
			newUserData[input.id] = input.value || input.placeholder;
		});

		UserService.users.update(user._id, newUserData).then(( {data} ) => {
			console.log(data);
		});


	});
};

/** @callback - Обработчик кнопки открытия карточки редактирования данных пользователя */
const toOpenRefactorCard = (user) => {
	const refactorBtn = document.querySelector('.popup-card-btns__refactor');
	refactorBtn.addEventListener('click', () => {
		newCard = renderRefactorCardHTML(user);
		card.innerHTML = newCard;

		refactorCard(user);
	});
};

const toDeleteUser = () => {
	const deleteBtn = document.querySelector('.popup-card-btns__delete');
	let idUser = deleteBtn.id;
	deleteBtn.addEventListener('click', () => {
		if (confirm('Вы уверены что хотите удалить этого пользователя?')) userService.users.remove(idUser);

		location.reload();
	});
};


/** @callback - Обработчик  закрытия popup-окна */
popup.addEventListener('click', ({ target }) => {
	if (!target.closest('.popup-card') && !target.closest('.popup-card-btns') || target.closest('.popup-card-btns__cansel')) {
		popup.classList.remove('open');
		card.innerHTML = '';
	}
});


number.addEventListener('change', ({ target: { value } }) => {
	counter = value;
});

checkbox.addEventListener('change', ({target}) => {
	const state = Flip.getState('.articles-data-items-item');
	let str = '';
	for (let i = 1; i <= counter; i++) {
		str += '1fr ';
	}

	wrapper.style.gridTemplateColumns = str;

	Flip.from(state, {
		absolute: true,
		stagger: 0.07,
		duration: 1,
		ease: 'power2.inOut',
		simple: true,
		onEnter: (elements, animation) => {
			console.log(elements);
		},
		onLeave: elements => gsap.to(elements, {opacity: 0})
	});
});



/** @callback - Обработчик кнопки добавления нового элемента */
addButton.addEventListener('click', () => {
	popup.classList.add('open');

	newCard = renderNewCardHTML();
	card.innerHTML = newCard;

	const newUserData = {};
	const inputsData = document.querySelectorAll('.popup-card-details-item');
	const saveNewUserBtn = document.querySelector('.popup-card-btns__save');

	saveNewUserBtn.addEventListener('click',() => {
		inputsData.forEach((input) => {
			newUserData[input.id] = input.value;
		});

		UserService.users.create(newUserData);

		location.reload();
	});

	// gsap.to(card, {opacity: 1, left: 0, duration: 0.25});
});

closeInputBtn.addEventListener('click', () => {
	inputBlock.classList.remove('active');
	gsap.to(inputBlock, {opacity: 0, left: -50, duration: 0.25});
	input.value = '';
});

// UserService.users.remove("6581987ceaf0a802db4a7939")



