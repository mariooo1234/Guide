import { buildUserName, renderUserFields } from './field.js'

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

const renderUser = (user) => {
	return `<div class="users-data-items-item" id="${user._id}">${buildUserName(user)}</div>`
}

const renderCardHTML = (user) => {
	const firstCharacter = user.name[0]

	const foundColor = paintElement(firstCharacter)

	return `<div class="popup-card-dragndrop"></div>
		<div class="popup-card__photo" style="background-color: ${foundColor}">${firstCharacter}</div>
        <p class="popup-card__FIO">${buildUserName(user)}</p>
        <div class="popup-card-details">${renderUserFields(user, 'edit')}</div>
        <div class="popup-card-btns">
            <button id="${user._id}" class="popup-card-btns__refactor">Редактировать</button>
            <button id="${user._id}" class="popup-card-btns__delete">Удалить</button>
        </div>`
}

export { renderCardHTML, renderUser }