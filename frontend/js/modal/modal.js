const card = document.querySelector('.popup-card')

const limits = {
	top: 0,
	right: document.documentElement.clientWidth,
	bottom: document.documentElement.clientHeight,
	left: 0,
}

const dragndrop = () => {
	const dragBlock = document.querySelector('.popup-card-dragndrop')

	dragBlock.onmousedown = (event) => {
		let shiftX = (event.clientX - card.getBoundingClientRect().left)
		let shiftY = event.clientY - card.getBoundingClientRect().top

		const moveAt = (pageX, pageY) => {
			// console.log(limits.right,'/////', pageX - shiftX, '////', Math.min(limits.right,  pageX - shiftX));
			// card.style.left = pageX - shiftX + 'px';
			// card.style.top = pageY - shiftY + 'px';
			console.log(shiftX, shiftY)

			card.style.left = Math.min()

			card.style.left = Math.max(Math.min(event.pageX + pageX - shiftY, limits.right - card.clientWidth,),0) + 'px'
			card.style.top = Math.max(Math.min(event.pageY + pageY - shiftX, limits.bottom - card.clientHeight),0) + 'px'
		}

		// moveAt(event.pageX, event.pageY);

		const onMouseMove = (event) => {

			// if (parseInt(card.style.left) + card.clientWidth > limits.right) {
			// 	moveAt(limits.right, event.pageY);
			// } else if (parseInt(card.style.right) < limits.left) {
			// 	moveAt(limits.left, event.pageY);
			// }
			// if (event.pageY >= limits.bottom) {
			// 	moveAt(limits.bottom, event.pageY);
			// } else if (event.pageY >= limits.top) {
			// 	moveAt(limits.top, event.pageY);
			// }
			// console.log(parseInt(card.style.left) + card.clientWidth);
			//
			// if (parseInt(card.style.left) + card.clientWidth > limits.right) {
			// 	moveAt(event.pageX, event.pageY);
			// 	console.log('test');
			// }

			moveAt(event.pageX, event.pageY)
			dragBlock.style.cursor = 'grabbing'
		}

		document.addEventListener('mousemove', onMouseMove)

		card.onmouseup = function (){
			document.removeEventListener('mousemove', onMouseMove)

			dragBlock.style.cursor = 'grab'
		}
	}
	card.ondragstart = () => false
}

export { dragndrop }