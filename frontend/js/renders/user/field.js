/** @const
 * @name userInfo - Информация для полей пользователя */
const userInfo = [
	{
		id: 'age',
		label: 'Возраст',
		key: 'age',
		disabled: true,
	},
	{
		id: 'address',
		label: 'Адрес',
		key: 'address',
		disabled: false,
	},
	{
		id: 'post',
		label: 'Должность',
		key: 'post',
		disabled: false,
	},
	{
		id: 'name',
		label: 'Имя',
		key: 'name',
		disabled: false,
		edit: false,
	},
]

/** @function
 * @name setBlockedField - Установка блокировки поля
 * @param {boolean} isBlocked - Заблокировано ли поле */
const setBlockedField = (isBlocked) => {
	return isBlocked ? 'disabled' : ''
}

/** @function
 * @name renderFields - Рендеринг полей
 * @param {string} mode - Мод
 * @param {object} user - Информация пользователя */
const renderUserFields = (user, mode = '') => {
	const filteredFields = userInfo.filter((field) => {
		return !Object.hasOwn(field, mode) || field[mode]
	})

	return filteredFields.reduce((acc, field) => {
		acc += `<label for="${field.id}">${field.label}:</label>
            <input ${setBlockedField(field.disabled)} id="${field.id}" class="popup-card-details-item" value="${user[field.key] ?? ''}" >
		`

		return acc
	}, '')
}

/** @function
 * @name buildUserName - Построение имени пользователя
 * @param {object} user - Информация о пользователе
 * @param {array} keys - Ключи, содержащие информацию */
const buildUserName = (user, keys = ['surname', 'name', 'patronymic']) => {
	return keys.reduce((fullName, field) => {
		fullName += user[field] + ' '

		return fullName
	}, '')
}

export { userInfo, renderUserFields, buildUserName }