import { Draggable } from '../composables/draggble.js'

export class Modal extends Draggable {
	constructor(modal, dragElement) {
		super(modal)

		this.modal = modal
		this.dragElement = dragElement
	}

	start() {
		document.addEventListener('mouseup', (event) => {
			this.mouseCapture(event)
		})

		this.dragElement.addEventListener('mousedown',(event) => {
			this.mouseCapture(event, true)
		})

		let widthWindow = document.documentElement.clientWidth
		let heightWindow = document.documentElement.clientHeight

		this.modal.style.left = ((widthWindow - this.modal.clientWidth) / 2) + 'px'
		this.modal.style.top = ((heightWindow - this.modal.clientHeight) / 2) + 'px'
	}
}