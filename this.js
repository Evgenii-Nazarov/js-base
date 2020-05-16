function hello() {
    console.log('Hello', this)
}
const person = {
    name: 'Zhenia',
    age: 29,
    hello: hello,
    sayHelloWindow: hello.bind(window),
    logInfo: function(job, number) {
        console.group(`${this.name} info:`);
        console.log(`Name is ${this.name}`);
        console.log(`Job is ${job}`);
        console.log(`Number is ${number}`);
        console.groupEnd()
    }
}

const Jane = {
    name: 'Jane',
};

// const fnJaneInfoLog = person.logInfo.bind(Jane,'doctor','+19166647246');
// fnJaneInfoLog();

person.logInfo.bind(Jane,'doctor','+19166647246')(); //возвращает новую функцию и можно вызвать когда угодно
person.logInfo.call(Jane,'doctor','+19166647246'); //сразу вызывает
person.logInfo.apply(Jane,['doctor','+19166647246']); //аргументы передаются в массиве, так же сразу вызывает

// комбинируем контекст и прототипы

const array = [1,2,3,4,5]

//классический вариант
function multByClassic(arr,n) {
    return arr.map((el)=>{
        return el * n
    })
}

//вариант через родителя и его прототип
Array.prototype.multBy = function(n) {
    return this.map((el) => el*n)
};

console.log(multByClassic(array,50));
console.log(array.multBy(100));
