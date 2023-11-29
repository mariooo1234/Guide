/** @module Model - Модель пользователя */
import UserModel from "../models/User.js";

/** @class UserService - Сервис по работе с юзерами */
class UserService {

    /** @method
     * @name create - Создание статьи
     * @param article - Объект статьи */
    async create(article) {
        return UserModel.create(article);
    }

    /** @method
     * @name get - Получение статьи
     * @param id - Идентификатор статьи */
    async get(id) {
        return UserModel.findById(id);
    }

    /** @method
     * @name list - Получение cписка всех статей */
    async list(query) {
        // return UserModel.find()
        return import.meta
    }

    /** @method
     * @name remove - Удаление статьи
     * @param id - Идентификатор статьи */
    async remove(id) {
        return UserModel.findByIdAndDelete(id);
    }
}

export default new UserService();
