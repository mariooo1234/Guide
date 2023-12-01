import http from "../http/http.js";

const users = async () => {
    const data = await http.get('/users')
    console.log(data)
}
users()