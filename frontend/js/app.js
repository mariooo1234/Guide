import http from "../http/http.js";

const checkbox = document.getElementById("grid");
const number = document.getElementById("number");
const wrapper = document.getElementById("wrapper")

gsap.registerPlugin(Flip)

const users = async () => {
    return await http.get('api/users')
}

let counter = 1

//656a1954322ca87e4bf35b9e

users().then((data) => {
    console.log(data)
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