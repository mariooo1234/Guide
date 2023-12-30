<template>
	<div class="modal__background">
		<div
			ref="modal"
			class="modal__wrapper"
		:style="getStylesModals"
		:class="{
		'modal__full-screen': states.fullScreen,
		modal__transition: !states.moving
	}"
		@mousemove="moveTarget"
		@mouseup="mouseCapture"
		v-click-away="closeWindow"
		>
		<!-- Шапка модального окна -->
		<div class="modal-header" @mousedown="mouseCapture($event, true)">
		<div class="modal-header__title">hello</div>

		<!-- Контролы модального окна -->
		<div class="modal-header__controls">
			<!-- Иконка копирования ссылки на объект -->
			<IconLink :height="20" :width="20" />

			<!-- Иконка режима полноэкранного окна -->
			<IconScreen :is-full-screen="states.fullScreen" @click="fullScreen" />

			<!-- Иконка закрытия -->
			<IconCross :height="20" :width="20" @click="closeWindow" />
		</div>
	</div>

	<!-- Контент модального окна -->
	<div class="modal__content">
		<slot name="content" />
	</div>

	<div class="modal__resizing-line modal__resizing-line-top"></div>
	<div
		class="modal__resizing-line modal__resizing-line-right"
	@mousedown="startResize($event, true)"
	/>
	<div class="modal__resizing-line modal__resizing-line-bottom"></div>
	<div class="modal__resizing-line modal__resizing-line-left"></div>
</div>
</div>
</template>

<script setup>
	import { computed, inject, onMounted, reactive, ref } from 'vue'

	import { UseResizeHandler } from '@/components/modal/usages/useResizeHandler'

	/** @module Icons - Иконки */
	import IconCross from '@/components/icons/IconCross.vue'
	import IconLink from '@/components/icons/IconLink.vue'
	import IconScreen from '@/components/icons/IconScreen.vue'

	/** @name props - Пропсы компонента */
	const props = defineProps({
	/** @property Width - Ширина модального окна */
	width: {
	type: Number,
	default: 500
},

	/** @property Height - Ширина модального окна */
	height: {
	type: Number,
	default: 500
}
})

	/** @name emits - Эмиты компонента */
	const emit = defineEmits(['closeWindow'])

	const windowSizes = inject('sizes')

	const modal = ref(null)

	const coords = reactive({
	mouseX: 0,
	mouseY: 0,
	offsetX: 0,
	offsetY: 0,
	elementX: 0,
	elementY: 0,
})

	const states = reactive({
	moving: false,
	resize: false,
	fullScreen: false
})

	const sizesModal = reactive({
	width: 0,
	height: 0
})

	/** @computed
	* @name getStylesModals - Стили модального окна */
	const getStylesModals = computed(() => {
	return {
	width: sizesModal.width + 'px',
	height: sizesModal.height + 'px',
	top: coords.elementY + 'px',
	left: coords.elementX + 'px'
}
})

	/** @function
	* @name mouseCapture - Захват мышкой цели
	* @param event {Event} - Объект события
	* @param move {boolean} - Разрешать ли перемещение объекта */
	const mouseCapture = ({ clientX, clientY }, move = false) => {
	if (states.fullScreen) return

	states.moving = move

	document.removeEventListener('mousemove',moving)

	coords.mouseX = clientX
	coords.mouseY = clientY

	const { left, top } = modal.value.getBoundingClientRect()

	coords.offsetX = coords.mouseX - left
	coords.offsetY = coords.mouseY - top
}

	const moving = ({ clientX, clientY }) => {
	const newPositionX = clientX - coords.offsetX
	const newPositionY = clientY - coords.offsetY

	coords.elementX =
	newPositionX <= 0
	? 0
	: windowSizes.width - sizesModal.width <= newPositionX
	? windowSizes.width - sizesModal.width
	: newPositionX

	coords.elementY =
	newPositionY <= 0
	? 0
	: windowSizes.height - sizesModal.height <= newPositionY
	? windowSizes.height - sizesModal.height
	: newPositionY
}

	/** @function
	* @name mouseCapture - Перетаскивание мышкой цели
	* @param event {Event} - Объект события */
	const moveTarget = ({ clientX, clientY }) => {
	if (states.moving) {
	document.addEventListener('mousemove',moving)
}
}

	const startSizes = reactive({
	width: 0,
	height: 0
})

	const startResize = (clientX) => {
	states.resize = false

	const handler = new UseResizeHandler(clientX, clientY, sizesModal)

	document.addEventListener('mousemove', resize)
	document.addEventListener('mouseup', stop)
	function resize({ clientX, clientY }) {
	sizesModal.width = handler.onResizeWidth(clientX)
}

	function stop() {
	document.removeEventListener('mousemove', resize)
}
}

	/** @function
	* @name fullScreen - Полноэкранный режим работы с модальным окном */
	const fullScreen = () => (states.fullScreen = !states.fullScreen)

	/** @function
	* @name closeWindow - Закрытие модального окна */
	const closeWindow = () => emit('closeWindow')

	onMounted(() => {
	sizesModal.width = modal.value.clientWidth
	sizesModal.height = modal.value.clientHeight

	coords.elementX = (windowSizes.width - modal.value.clientWidth) / 2
	coords.elementY = (windowSizes.height - modal.value.clientHeight) / 2
})
</script>

<style lang="scss" scoped>
	.modal {
	&__background {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 10;
}

	&__wrapper {
	border-radius: 6px;
	background: white;
	overflow: hidden;
	box-shadow: 0 0 50px #dcdfe6;
	border: 1px solid #dcdfe6;
	position: absolute;
	z-index: 11;
	min-width: 500px;
	min-height: 500px;
}

	&__full-screen {
	top: 0 !important;
	left: 0 !important;
	width: 100% !important;
	height: 100% !important;
}

	//&__transition {
	//  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
	//}

	&-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #dcdfe6;
	background: #D174A1;
	z-index: 1;

	&:hover {
	cursor: grab;
}

	&__title {
	font-family: 'Work Sans', sans-serif;
	font-weight: 500;
	color: #FFFFFF;
	pointer-events: none;
}

	&__controls {
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 10px;
}
}

	&__resizing-line {
	position: absolute;

	&-left {
	left: 0;
	top: 0;
	height: inherit;
	width: 4px;
	cursor: ew-resize;
	background: transparent;
}

	&-right {
	right: 0;
	top: 0;
	height: inherit;
	width: 8px;
	cursor: ew-resize;
	background: transparent;
}

	&-bottom {
	left: 0;
	bottom: 0;
	height: 4px;
	width: inherit;
	cursor: n-resize;
	background: transparent;
}

	&-top {
	left: 0;
	top: 0;
	height: 4px;
	width: inherit;
	background: transparent;
}
}
}
</style>
