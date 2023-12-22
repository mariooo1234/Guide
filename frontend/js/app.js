import UserService from "./UserService.js";
import {renderHTML, renderCardHTML} from "./render.js"


const checkbox = document.getElementById("grid");
const number = document.getElementById("number");
const wrapper = document.getElementById("wrapper")

const inputBlock = document.querySelector('.articles-addItem-inputBlock')
const input = document.querySelector('.articles-addItem-inputBlock__input')
const addButton = document.querySelector('.articles-addItem__btn')
const closeInputBtn = document.querySelector('.articles-addItem-inputBlock__trash')
const dataItems = document.querySelector('.articles-data-items')
let newData = ''
let newCard = ''

const popup = document.querySelector('.popup')
const card = document.querySelector('.popup-card')


gsap.registerPlugin(Flip)



let counter = 1
//656a1954322ca87e4bf35b9e

UserService.users.list("656a1954322ca87e4bf35b9e").then(({data}) => {

    data.forEach((user, idx) => {
        newData += renderHTML(user)
        dataItems.innerHTML = newData;
    })

    let dataItem = document.querySelectorAll('.articles-data-items-item')

    gsap.to(dataItem, {opacity: 1, stagger: 0.1, left: 0, duration: 0.25})

    dataItem.forEach((item) => {
        item.addEventListener('click', () => {
            popup.classList.add('open')
            data.forEach(user => {
                if (user._id === item.id) {
                    newCard = renderCardHTML(user)
                    card.innerHTML = newCard
                }
            })
        })
    })
})





popup.addEventListener('click', ({ target }) => {
    if (!target.closest('.popup-card')) {
        popup.classList.remove('open')
    }
})

number.addEventListener("change", ({ target: { value } }) => {
    counter = value
})

checkbox.addEventListener('change', ({target}) => {
    const state = Flip.getState('.articles-data-items-item');
    let str = ''
    for (let i = 1; i <= counter; i++) {
        str += `1fr `
    }

    wrapper.style.gridTemplateColumns = str

    Flip.from(state, {
        absolute: true,
        stagger: 0.07,
        duration: 1,
        ease: "power2.inOut",
        simple: true,
        onEnter: (elements, animation) => {
            console.log(elements)
        },
        onLeave: elements => gsap.to(elements, {opacity: 0})
    })
})

/** @callback - Обработчик кнопки добавления нового элемента */
addButton.addEventListener('click', () => {
    if (input.value.length > 0) {
        console.log('test')
    }else {
        inputBlock.classList.add('active')
        gsap.to(inputBlock, {opacity: 1, left: 0, duration: 0.25})
    }
})

closeInputBtn.addEventListener('click', () => {
    inputBlock.classList.remove('active')
    gsap.to(inputBlock, {opacity: 0, left: -50, duration: 0.25})
    input.value = ''
})

// UserService.users.remove("6581987ceaf0a802db4a7939")



