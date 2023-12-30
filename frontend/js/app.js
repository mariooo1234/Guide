/** @class UserService - Сервис для работы с пользователями */
import UserService from './services/UserService.js'

/** @module UserRender - Пользовательский редеринг */
import { renderUser, renderCardHTML } from './renders/user/render.js'
import {drag} from './drag.js'


const userGuide = document.querySelector('.users-data-items')

const popup = document.querySelector('.popup')
const card = document.querySelector('.popup-card')

const loader = document.querySelector('.loader')

/** @callback - Обработчик  закрытия popup-окна */
popup.addEventListener('click', ({ target }) => {
	if (!target.closest('.popup-card') && !target.closest('.popup-card-btns') || target.closest('.popup-card-btns__cansel')) {
		popup.classList.remove('open')
		card.innerHTML = ''
	}
})

const { data } = await UserService.users.list({name: ''})

loader.style.display = 'none'

data.forEach((user) => userGuide.innerHTML += renderUser(user))

gsap.to('.users-data-items-item', {opacity: 1, stagger: 0.05, left: 0, duration: 0.25})

document.querySelectorAll('.users-data-items-item').forEach((item) => {
	item.addEventListener('click', async () => {
		const { data } = await UserService.users.get(item.id)

		popup.classList.add('open')

		card.innerHTML = renderCardHTML(data)

		drag(card)
	})
})