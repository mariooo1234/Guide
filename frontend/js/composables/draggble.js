/** @class Draggable - Класс для работы с перетаскиванием */
export class Draggable {
	constructor(dragElement, triggerElement) {
		this.offsetX = 0 // Отступ по оси X
		this.offsetY = 0 // Отступ по оси Y

		this.dragElement = dragElement // Перетаскиваемый элемент
		this.triggerElement = triggerElement ?? dragElement // Триггер перетаскивания

		this.moving = this.moving.bind(this) // Привязка контекста для метода перетаскивания
		this.mouseCapture = this.mouseCapture.bind(this) // Привязка контекста для метода захвата мышкой
	}

	/** @method
	 * @name moving - Перетаскивание элемента
	 * @param {Event} event - Объект события */
	moving({clientX, clientY}) {
		const newX = clientX - this.offsetX
		const newY = clientY - this.offsetY

		const { innerWidth, innerHeight} = window
		const { clientWidth, clientHeight } = this.dragElement

		this.dragElement.style.left = this.computeCoords(newX, innerWidth, clientWidth)
		this.dragElement.style.top = this.computeCoords(newY, innerHeight, clientHeight)
	}

	/** @method
	 * @name mouseCapture - Захват мышкой элемента триггера перетаскивания
	 * @param {Event} event - Объект события */
	mouseCapture({clientX, clientY, type}) {
		const actions = {
			mouseup: () => document.removeEventListener('mousemove', this.moving),
			mousedown: () => document.addEventListener('mousemove', this.moving)
		}

		actions[type]()

		const { left, top} = this.dragElement.getBoundingClientRect()

		this.offsetX = clientX - left
		this.offsetY = clientY - top
	}

	/** @method
	 * @name computeCoords - Расчёт координат элемента
	 * @param {number} axis - Ось перетаскивания
	 * @param {number} windowSize - Размер окна
	 * @param {number} elementSize - Размер элемента */
	computeCoords(axis, windowSize, elementSize) {
		const availableAxis = windowSize - elementSize

		return axis <= 0 ? '0px' : (availableAxis <= axis ? `${availableAxis}px` : `${axis}px`)
	}

	/** @method
	 * @name onDragStart - Начало перетаскивания
	 * @param {function} callback - Вспомогательная функция */
	onDragStart(callback = () => {}) {
		document.addEventListener('mouseup', this.mouseCapture)

		this.triggerElement.addEventListener('mousedown',this.mouseCapture)

		callback()
	}
}