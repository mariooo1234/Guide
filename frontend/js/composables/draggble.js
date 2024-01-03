/** @class Draggable - Класс для работы с перетаскиванием */
export class Draggable {
	constructor(target) {
		this.offsetX = 0
		this.offsetY = 0
		this.target = target
		this.moving = this.moving.bind(this)
	}

	moving (event) {
		const newX = event.clientX - this.offsetX
		const newY = event.clientY - this.offsetY

		let windowWidth = document.documentElement.clientWidth
		let windowHeight = document.documentElement.clientHeight

		this.target.style.left = this.computeCoords(newX, windowWidth, this.target.clientWidth)
		this.target.style.top = this.computeCoords(newY, windowHeight, this.target.clientHeight)
	}

	mouseCapture(event, move = false) {
		if (move) document.addEventListener('mousemove', this.moving)

		else document.removeEventListener('mousemove',this.moving)

		const { left, top } = this.target.getBoundingClientRect()

		this.offsetX = event.clientX - left
		this.offsetY = event.clientY - top
	}

	computeCoords(axis, window, modal) {
		const availableAxis = window - modal

		if (axis <= 0) return '0px'
		else if (availableAxis <= axis) return `${availableAxis}px`

		return `${axis}px`
	}
}