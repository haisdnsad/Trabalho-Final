





const links = document.querySelectorAll(".cab a")
const currentUrl = window.location.href

links.forEach(link => {
    if (currentUrl.includes(link.getAttribute("href"))){
        link.classList.add("active")
    }
})


const items = document.querySelectorAll(".carro")
let current = 0

function show(){
    items.forEach((item, index) => {
        item.classList.remove("active", "left", "right")
        if (index === current){
            item.classList.add("active")
        }else if (index === (current + 1) % items.length) {
            item.classList.add("right")
        }else if (index === (current - 1 + items.length) % items.length){   
            item.classList.add("left")
        }
})}

   show()

   setInterval(() => {
    current = (current + 1) % items.length
    show()
   }, 3000)



   const coisas = document.querySelectorAll(".item")
let tt = 0

function app(){
    coisas.forEach((coisa, index) => {
        coisa.classList.remove("mid", "dir", "esq")
        if (index === tt){
            coisa.classList.add("mid")
        }else if (index === (tt + 1) % coisas.length) {
            coisa.classList.add("dir")
        }else if (index === (tt - 1 + coisas.length) % coisas.length){   
            coisa.classList.add("esq")
        }
})}

   app()

   setInterval(() => {
    tt = (tt + 1) % coisas.length
    app()
   }, 3000)

   