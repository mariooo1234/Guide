import UserService from '../services/UserService.js'

class UserController {
	async create(req, res) {
		try {
			const user = await UserService.create(req.body)

			res.json(user)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async get(req, res) {
		try {
			const foundUser = await UserService.get(req.params.id)

			res.json(foundUser)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async list(req, res) {
		try {
			const users = await UserService.list(req.query)

			res.json(users)
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

			res.status(200).json(user)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new UserController()
