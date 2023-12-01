/** @module Model - Модель пользователя */
import UserModel from "../models/User.js";

/** @class UserService - Сервис по работе с юзерами */
class UserService {

    /** @method
     * @name create - Создание пользователя
     * @param article - Объект пользователя */
    async create(article) {
        return UserModel.create(article);
    }

    /** @method
     * @name get - Получение пользователя
     * @param id - Идентификатор пользователя */
    async get(id) {
        return UserModel.findById(id);
    }

    /** @method
     * @name list - Получение cписка всех пользователей */
    async list(query) {
        return UserModel.find()
    }

    /** @method
     * @name remove - Удаление пользователя
     * @param id - Идентификатор пользователя */
    async remove(id) {
        return UserModel.findByIdAndDelete(id);
    }
}

export default new UserService();
