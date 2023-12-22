import http from "../http/http.js";

class UserService {
    get path() {
        return {
            users: () => "api/users"

        }
    }

    get users() {
        return {
            get: (id) => http.get( `${this.path.users()}/${id}` ),
            list: (id) => {
                return http.get(this.path.users())
            },
            create: (payload) => http.post(this.path.users(), payload),
            remove: (id) => http.delete( `${this.path.users()}/${id}` ),
            update: (id) => http.update( `${this.path.users()}/${id}` ),
        }
    }
}



export default new UserService()