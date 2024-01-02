/** @function
 * @name animCounter - Анимация счётчика
 * @param {HTMLElement} target - Цель анимации
 * @param {number} duration - Продолжительность анимации */
const animCounter = (target, duration = 0.25) => {
	gsap.from(target, {
		duration,
		textContent: 0,
		snap: { textContent: 1 },
	})
}

export { animCounter }