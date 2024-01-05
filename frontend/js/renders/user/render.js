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
	return `<div class="users-data__items_item" id="${user._id}">${buildUserName(user)}</div>`
}

const renderCardHTML = (user) => {
	const firstCharacter = user.name[0]

	const foundColor = paintElement(firstCharacter)

	return `<div class="modal__wrapper">
		<div class="modal-dragndrop" style="background-color: ${foundColor}"></div>
		<div class="modal__info">
			<div class="modal__photo" style="background-color: ${foundColor}">${firstCharacter}</div>
        	<p class="modal__name">${buildUserName(user)}</p>
		</div>
        <div class="modal-details">${renderUserFields(user, 'edit')}</div>
        <div class="modal__btns">
            <button id="${user._id}" class="modal__btns_delete">Удалить</button>
        </div>
		</div>`
}

export { renderCardHTML, renderUser }