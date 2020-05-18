const person = {
    name: 'Jane',
    age: 29,
    job: 'doctor'
};

const op = new Proxy(person, {
    get(target, prop) {
        // console.log('Target', target) // изменяем базовый функционал, в данном случае при получении значения ключа будет работать console.log
        console.log(`Getting prop ${prop}`)
        if (!(prop in target)) {
            return prop.split('_').map(p => target[p]).join(' '); //пишем op.name_age_job и выведет в строку эти значения
        }
        return target[prop]
    },
    set(target, prop, value) {
        if (prop in target) { // изменяем базовый функционал, в данном случае при изменении значения ключа будет работать другая логика
            target[prop] = value;
        } else {
            throw new Error(`No ${prop} field in target`)
        }
    },
    has(target, prop) { // ('age' in op) даст true, ('qqq' in op) даст false. Это нужно для кастомных валидаций
        return ['age', 'name', 'job'].includes(prop)
    },
    deleteProperty(target, prop) { //кастомное удаление ключа в объекте
        console.log('Deleting: ', prop);
        delete target[prop];
        return true; // по дефолту возвращается false
    }
})

// Функции
const log = text => `Log: ${text}`;

const fp = new Proxy(log, {
    apply(target, thisArg, argArray) { //target - сама функция, thisArg - контекст, argArray - параметры
        console.log('Calling fn');
        return target.apply(thisArg, argArray).toUpperCase();
    }
});

// Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const PersonProxy = new Proxy(Person, {
    construct(target, argArray) { //ловушка для отслеживания создания нового объекта класса
        console.log('Construct...');

        // return new target(...argArray) //базовый функционал создания объекта класса. target - это Person, а argArray - параметры(name и age)
        return new Proxy(new target(...argArray), { //добавляем логику внутри объекта
                get(t, p, receiver) {
                    console.log(`Getting prop ${p}`);
                    if (p !== 'name') return t[p]
                },
                set(t, p, value) {
                    console.log(`Setting props ${p} as ${value}`);
                    if (p === 'name') {
                        t[p] = 'Zhenia';
                    } else {
                        t[p] = value;
                    }
                }
            }
        )
    }
});

const p = new PersonProxy('Jane', 28);