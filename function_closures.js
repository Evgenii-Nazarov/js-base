// function createCalcFunction(n) {
//     return function () {
//         console.log(1000 * n)
//     }
// }
//
// const calc = createCalcFunction(42)
// console.log(calc) //function
// calc() // 42000

// function createIncrementor(n) {
//     return function (num) {
//         return n + num
//     }
// }
//
// const addOne = createIncrementor(1);
// const addTen = createIncrementor(10);
//
// console.log(addOne(10))
// console.log(addOne(41))
//
// console.log(addTen(10))
// console.log(addTen(41))

// function urlGenerator(domain) {
//     return function (url) {
//         return `https://${url}.${domain}`
//     }
// }
//
// const comUrl = urlGenerator('com')
// const ruUrl = urlGenerator('ru')
//
//
// console.log(comUrl('google'))
// console.log(comUrl('netflix'))
//
// console.log(ruUrl('yandex'))
// console.log(ruUrl('vk'))
//
// console.log(comUrl('vk'))

// const person1 = {name:'Михаил',age: 22, job: 'Frontend'};
// const person2 = {name:'Елена',age: 19, job: 'SMM'};
//
// function logPerson() {
//     console.log(`Person ${this.age}, ${this.job}`);
// }
//
// function bind(context, func ) {
//     context.logPerson = func;
//     return context.logPerson()
// }
//
// bind(person1,logPerson)
// bind(person2,logPerson)

const person1 = {name: 'Михаил', age: 22, job: 'Frontend'};
const person2 = {name: 'Елена', age: 19, job: 'SMM'};

function logPerson() {
    console.log(`Person ${this.name}, ${this.job}`);
}

function bind(context, func) {
    return function (...args) {
        func.apply(context, args)
    }
}

console.log(bind(person1, logPerson));;
console.log(bind(person2, logPerson));;

// получается так. Мы в аргс записали весь объект и передали в ввиде массива в apply

