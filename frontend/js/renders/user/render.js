import { userInfo, buildUserName, renderUserFields } from './field.js'

/** @function
 * @name paintElement - Раскрасить элемент
 * @param {string} firstCharacter - Первый символ */
const paintElement = (firstCharacter) => {
	const colors = {
		'#A3C1AD': 'абвabc',
		'#50C878': 'гдеdef',
		'#0076CE': 'ёжзghi',
		'#99FFFF': 'ийкjkl',
		'#6B8E23': 'лмнmno',
		'#D0F0C0': 'опрpqr',
		'#F0E68C': 'стуstu',
		'#F88379': 'фхцvwx',
		'#DB7093': 'чшщy',
		'#E6E6FA': 'ыэяz',
	}

	const [foundColor] = Object.entries(colors).find(([_, value]) => {
		return value.includes(firstCharacter.toLowerCase())
	})

	return foundColor ?? 'transparent'
}

const renderHTML = (user) => {
	return `<div class="users-data-items-item" id="${user._id}">${buildUserName(user)}</div>`
}

const renderCardHTML = (user) => {
	const firstCharacter = user.name[0]

	const foundColor = paintElement(firstCharacter)

	return `<div class="popup-card__photo" style="background-color: ${foundColor}">${firstCharacter}</div>
        <p class="popup-card__FIO">${buildUserName(user)}</p>
        <div class="popup-card-details">${renderUserFields(user, 'edit')}</div>
        <div class="popup-card-btns">
            <button id="${user._id}" class="popup-card-btns__refactor">Редактировать</button>
            <button id="${user._id}" class="popup-card-btns__delete">Удалить</button>
        </div>`
}

const renderRefactorCardHTML = (user) => {
	const firstCharacter = user.name[0]

	const foundColor = paintElement(firstCharacter)

	return `<div class="popup-card__photo" style="background-color: ${foundColor || '#E6E6FA'}">${firstCharacter}</div>
        <div class="popup-card-details">
        	<label for="surname">Фамилия:</label>
            <input id="surname" class="popup-card-details-item" style="text-transform: capitalize;" placeholder="${user.surname}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="name">Имя:</label>
            <input id="name" class="popup-card-details-item" style="text-transform: capitalize;" placeholder="${user.name}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="patronymic">Отчетсво:</label>
            <input id="patronymic" class="popup-card-details-item" style="text-transform: capitalize;" placeholder="${user.patronymic}" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="age">Возраст:</label>
            <input id="age" type="number" max="100" class="popup-card-details-item" placeholder="${user.age}">
            <label for="address">Адрес:</label>
            <input id="address" class="popup-card-details-item" placeholder="${user.address}">
            <label for="post">Должность:</label>
            <input id="post" class="popup-card-details-item" placeholder="${user.post}">
        </div>
        <div class="popup-card-btns">
        	<button class="popup-card-btns__save">Сохранить</button>
            <button class="popup-card-btns__cansel">Отмена</button>
        </div>`
}

const renderNewCardHTML = () => {
	return `<h3 style="font-size: 30px">Добавление нового пользователя</h3>
		<div class="popup-card-details">
        	<label for="surname">Фамилия:</label>
            <input id="surname" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="name">Имя:</label>
            <input id="name" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="patronymic">Отчетсво:</label>
            <input id="patronymic" class="popup-card-details-item" oninput="if(/[^a-zA-Z]/.test(this.value)){let Selection = this.selectionStart-1;this.value=this.value.replace(/[^a-zA-Z]/g,'');this.setSelectionRange(Selection, Selection);}">
            <label for="age">Возраст:</label>
            <input id="age" class="popup-card-details-item">
            <label for="address">Адрес:</label>
            <input id="address" class="popup-card-details-item">
            <label for="post">Должность:</label>
            <input id="post" class="popup-card-details-item">
        </div>
        <div class="popup-card-btns">
        	<button class="popup-card-btns__save">Сохранить</button>
            <button class="popup-card-btns__cansel">Отмена</button>
        </div>`
}

export { renderCardHTML, renderHTML, renderRefactorCardHTML, renderNewCardHTML }