const arrows= document.querySelectorAll('.users-tools__input-number-arrow')
const countColumns = document.querySelector('.users-tools__input-number')
arrows.forEach((arrow) => {
	arrow.addEventListener('click', (event) => {
		const {sign} = event.target.dataset
		const {min, max} = countColumns
		
		const value = eval(`${countColumns.value} ${sign} 1`)
		console.log(!(value > max), !(value < min))
		if ( !(value > max) && !(value < min)) countColumns.value = value

	})
})
//
// const move = document.querySelector('.users-tools')

