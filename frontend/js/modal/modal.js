const card = document.querySelector('.popup-card')

/** @const
 * @name coords - Координаты */
const coords = {
	mouseX: 0,
	mouseY: 0,
	offsetX: 0,
	offsetY: 0,
	elementX: 0,
	elementY: 0,
}

/** @const
 * @name states - Состояния */
const states = {
	moving: false,
}
/** @function
 * @name dragndrop - Реализация работы drag and drop */
const dragndrop = () => {
	const dragBlock = document.querySelector('.popup-card-dragndrop')
	const popup = document.querySelector('.popup')


	let widthWindow = document.documentElement.clientWidth
	let heightWindow = document.documentElement.clientHeight

	let widthCard = card.clientWidth
	let heightCard = card.clientHeight

	card.style.left = ((widthWindow - widthCard) / 2) + 'px'
	card.style.top = ((heightWindow - heightCard) / 2) + 'px'



	/** @function
		 * @name mouseCapture - Захват мышкой цели
		 * @param event {Event} - Объект события
		 * @param move {boolean} - Разрешать ли перемещение объекта */
	const mouseCapture = ({ clientX, clientY }, move = false) => {

		states.moving = move

		document.removeEventListener('mousemove',moving)

		coords.mouseX = clientX
		coords.mouseY = clientY

		const { left, top } = card.getBoundingClientRect()

		coords.offsetX = coords.mouseX - left
		coords.offsetY = coords.mouseY - top
	}


	/** @function
	 * @name moving - Перемещение захваченного элемента
	 * @param event {Event} - Объект события */
	const moving = ({ clientX, clientY }) => {
		const newPositionX = clientX - coords.offsetX
		const newPositionY = clientY - coords.offsetY

		let windowWidth = document.documentElement.clientWidth
		let windowHeight = document.documentElement.clientHeight

		let cardWidth = card.clientWidth
		let cardHeight = card.clientHeight

		coords.elementX =
			newPositionX <= 0
				? 0
				: windowWidth - cardWidth <= newPositionX
					? windowWidth - cardWidth
					: newPositionX

		coords.elementY =
				newPositionY <= 0
					? 0
					: windowHeight - cardHeight <= newPositionY
						? windowHeight - cardHeight
						: newPositionY

		card.style.left = coords.elementX + 'px'
		card.style.top = coords.elementY + 'px'
	}


	/** @function
	 * @name mouseCapture - Перетаскивание мышкой цели
	 * @param event {Event} - Объект события */
	const moveTarget = ({ clientX, clientY }) => {
		if (states.moving) {
			document.addEventListener('mousemove',moving)
		}

	}

	dragBlock.addEventListener('mousedown', (event) => {
		mouseCapture(event, true)
	})

	popup.addEventListener('mousemove', moveTarget)
	popup.addEventListener('mouseup', mouseCapture)
}

export { dragndrop }