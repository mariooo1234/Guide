import UserService from '../services/UserService.js'

class UserController {
	async create(req, res) {
		try {
			const article = await UserService.create(req.body)

			res.json(article)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async get(req, res) {
		try {
			const foundArticle = await UserService.get(req.params.id)

			res.json(foundArticle)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async list(req, res) {
		try {
			const users = await UserService.list(req.query)

			const filteredUsers = users.filter(user => {
				return user.name.toLowerCase().includes(req.query.name)
			})

			res.json(filteredUsers)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async remove(req, res) {
		try {
			await UserService.remove(req.params.id)

			res.status(200)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async update (req, res) {
		try {
			const user = await UserService.update(req.params.id, req.body)

			res.status(200)
			res.send(user)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new UserController()
