/** @class UserService - Сервис для работы с пользователями */
import UserService from './services/UserService.js'

import { Modal } from './modal/modal.js'

/** @module UserRender - Пользовательский редеринг */
import { renderUser, renderCardHTML } from './renders/user/render.js'

/** @module Animation - Анимации */
import {animCounter} from './animations/animation.js'

const userGuide = document.querySelector('.users-data-items')

const popup = document.querySelector('.popup')
const card = document.querySelector('.modal')

const counter = document.querySelector('.users-data__counter span')

const loader = document.querySelector('.loader')

/** @callback - Обработчик закрытия popup-окна */
popup.addEventListener('click', ({ target }) => {
	if (!target.closest('.modal') && !target.closest('.modal__btns') || target.closest('.modal__btns_canсel')) {
		popup.classList.remove('open')
	}
})

const { data } = await UserService.users.list({ name: null })

loader.style.display = 'none'

data.forEach((user) => userGuide.innerHTML += renderUser(user))

gsap.to('.users-data__items_item', {opacity: 1, stagger: 0.05, left: 0, duration: 0.25})

counter.textContent = data.length

animCounter(counter)

document.querySelectorAll('.users-data__items_item').forEach((item) => {
	item.addEventListener('click', async () => {
		const { data } = await UserService.users.get(item.id)

		popup.classList.add('open')
		
		card.innerHTML = renderCardHTML(data)

		const dragBlock = document.querySelector('.modal-dragndrop')

		const dragModal = new Modal(card, dragBlock)
		dragModal.start()
	})
})