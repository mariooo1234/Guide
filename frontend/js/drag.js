const drag = (card) => {
	let widthWindow = document.documentElement.clientWidth
	let heightWindow = document.documentElement.clientHeight

	let widthCard = card.clientWidth
	let heightCard = card.clientHeight

	card.style.left = ((widthWindow - widthCard) / 2) + 'px'
	card.style.top = ((heightWindow - heightCard) / 2) + 'px'
}

export { drag }