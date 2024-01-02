/** @class UserService - Сервис для работы с пользователями */
import UserService from './services/UserService.js'

import { dragndrop } from './modal/modal.js'

/** @module UserRender - Пользовательский редеринг */
import { renderUser, renderCardHTML } from './renders/user/render.js'

/** @module Animation - Анимации */
import {animCounter} from './animations/animation.js'

const userGuide = document.querySelector('.users-data-items')

const popup = document.querySelector('.popup')
const card = document.querySelector('.popup-card')

const counter = document.querySelector('.users-data__counter span')

const loader = document.querySelector('.loader')

/** @callback - Обработчик закрытия popup-окна */
popup.addEventListener('click', ({ target }) => {
	if (!target.closest('.popup-card') && !target.closest('.popup-card-btns') || target.closest('.popup-card-btns__cansel')) {
		popup.classList.remove('open')
	}
})

const { data } = await UserService.users.list({ name: '' })

loader.style.display = 'none'

data.forEach((user) => userGuide.innerHTML += renderUser(user))

gsap.to('.users-data-items-item', {opacity: 1, stagger: 0.05, left: 0, duration: 0.25})

counter.textContent = data.length

animCounter(counter)

gsap.registerPlugin(Draggable, InertiaPlugin)

Draggable.create('.preview__title-text', {
	bounds: 'body',
	inertia: true,
	onClick: function () {
		console.log('clicked')
	},
})

document.querySelectorAll('.users-data-items-item').forEach((item) => {
	item.addEventListener('click', async () => {
		const { data } = await UserService.users.get(item.id)

		popup.classList.add('open')
		
		card.innerHTML = renderCardHTML(data)

		dragndrop()
	})
})