/** @module Model - Модель пользователя */
import UserModel from '../models/User.js'

/** @class UserService - Сервис по работе с юзерами */
class UserService {

	/** @method
	 * @name create - Создание пользователя
	 * @param article - Объект пользователя */
	create(article) {
		return UserModel.create(article)
	}

	/** @method
	 * @name get - Получение пользователя
	 * @param id - Идентификатор пользователя */
	get(id) {
		return UserModel.findById(id)
	}

	/** @method
	 * @name list - Получение cписка всех пользователей */
	list(query) {
		return UserModel.find(query, undefined, undefined)
	}

	/** @method
	 * @name remove - Удаление пользователя
	 * @param id - Идентификатор пользователя */
	remove(id) {
		return UserModel.findByIdAndDelete(id)
	}

	/** @method
	 * @name update - Удаление пользователя
	 * @param id - Идентификатор пользователя
	 * @param payload - Обновляемые параметры */
	update(id, payload) {
		return UserModel.findOneAndUpdate({ _id: id }, payload, { new: true })
	}
}

export default new UserService()
