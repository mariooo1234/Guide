import http from "../http/http.js";

const checkbox = document.getElementById("grid");
const number = document.getElementById("number");
const wrapper = document.getElementById("wrapper")

const inputBlock = document.querySelector('.articles-addItem-inputBlock')
const input = document.querySelector('.articles-addItem-inputBlock__input')
const addButton = document.querySelector('.articles-addItem__btn')
const closeInputBtn = document.querySelector('.articles-addItem-inputBlock__trash')
const dataItems = document.querySelector('.articles-data-items')
let newData = ''


const popup = document.querySelector('.popup')

gsap.registerPlugin(Flip)

const users = async () => {
    return await http.get('api/users')
}

let counter = 1

//656a1954322ca87e4bf35b9e

users().then(({data}) => {

    data.forEach(user => {
        newData += renderHTML(user)
        dataItems.innerHTML = newData;
    })
    const dataItem = document.querySelectorAll('.articles-data-items-item')

    dataItem.forEach((item) => {

        item.addEventListener('click', () => {
            popup.classList.add('open')
            console.log("test")
        })
    })
    console.log(dataItem)
})

const renderHTML = (user) => {
    return `<div class="articles-data-items-item">${user.surname + ' ' + user.name + ' ' + user.patronymic}
                        <div class="articles-data-items-item__trash">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </div>
                    </div>`
}

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
    }
})

closeInputBtn.addEventListener('click', () => {
    inputBlock.classList.remove('active')
    input.value = ''
})


