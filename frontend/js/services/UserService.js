/** @module HTTP - Обращения по http */
import http from '../../http/http.js'

/** @class UserService - Сервис для работы с пользователями */
class UserService {
	/** @property
	 * @name path - Пути контроллеров */
	get path() {
		return {
			/** @function
			 * @name users - Путь для работы с пользователями */
			users: () => 'api/users'
		}
	}

	/** @property
	 * @name users - Работа с пользователями */
	get users() {
		return {
			/** @function
			 * @name get - Получение пользователя
			 * @param {string} id - Идентификатор пользователя */
			get: (id) => http.get(`${this.path.users()}/${id}`),

			/** @function
			 * @name list - Получение списка пользователей */
			list: () => http.get(this.path.users()),

			/** @function
			 * @name create - Создание пользователя
			 * @param {object} payload - Создаваемые параметры */
			create: (payload) => http.post(this.path.users(), payload),

			/** @function
			 * @name remove - Удаление пользователя
			 * @param {string} id - Идентификатор пользователя */
			remove: (id) => http.delete(`${this.path.users()}/${id}`),

			/** @function
			 * @name update - Обновление пользователя
			 * @param {string} id - Идентификатор пользователя
			 * @param {object} payload - Обновляемые параметры */
			update: (id, payload) => http.put(`${this.path.users()}/${id}`, payload),
		}
	}
}

export default new UserService()