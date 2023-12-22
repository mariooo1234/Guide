import http from "../http/http.js";

class UserService {
    get path() {
        return {
            users: () => "api/users"

        }
    }

    get users() {
        return {
            get: (id) => http.get(`${this.path.users()}/${id}`),
            list: () => http.get(this.path.users()),
            create: (payload) => http.post(this.path.users(), payload),
            remove: (id) => http.delete(`${this.path.users()}/${id}`),
            update: (id, payload) => http.put(`${this.path.users()}/${id}`, payload),
        }
    }
}


export default new UserService()