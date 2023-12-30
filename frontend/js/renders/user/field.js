/** @const
 * @name userInfo - Информация для полей пользователя */
const userInfo = [
	{
		id: 'age',
		label: 'Возраст',
		key: 'age',
		disabled: false,
		className: 'popup-card-details-item',
	},
	{
		id: 'address',
		label: 'Адрес',
		key: 'address',
		disabled: false,
		className: 'popup-card-details-item',
	},
	{
		id: 'post',
		label: 'Должность',
		key: 'post',
		disabled: false,
		className: 'popup-card-details-item',
	},
]

/** @function
 * @name renderFields - Рендеринг полей
 * @param {array} fields - Поля пользователя
 * @param {object} user - Информация пользователя */
const renderUserFields = (fields, user) => {
	return fields.reduce((acc, field) => {
		acc += `<label for="${field.id}">${field.label}:</label>
            <input disabled id="${field.id}" class="${field.className}" value="${user[field.key]}" >
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