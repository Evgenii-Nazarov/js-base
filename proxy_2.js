// Wrapper
const witDefaultValue = (target, defaultValue = 0) => { //если ключ есть - выдается значение. Если ключа нет - выдается 0
    return new Proxy(target, {
        get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
    })
};

const position = witDefaultValue({x: 24, y: 42}, 0)

// console.log(position) //  position.x -> 24, position.y -> 42, position.z -> 0

// Hidden properties
const withHiddenProps = (target, prefix = '_') => {
    return new Proxy(target, {
        has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix)), //проверяет, если есть в объекте и если не начинается с префикса
        ownKeys: (obj) => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)), //показывает только те, которые есть и которые не начинаются с префикса
        get: (obj, prop, receiver) => (prop in receiver) ? obj[prop] : void 0 //void 0 - тот же undefined
    })
};

const data = withHiddenProps({
    name: 'Jane',
    age: '28',
    _id: '123123'
});
// data
// Proxy {name: "Jane", age: "28", _id: "123123"}

// data.age
// "28"

// data.name
// "Jane"

// data._id
// undefined

// '_id' in data
// false

// 'name' in data
// true

// for (let key in data) console.log(key)
// VM451:1 name
// VM451:1 age

// Object.keys(data)
// (2) ["name", "age"]

// Optimization
const userData = [
    {id: 11, name: 'Vladilen', job: 'Fullstack', age: 25},
    {id: 22, name: 'Elena', job: 'Student', age: 22},
    {id: 33, name: 'Victor', job: 'Backend', age: 23},
    {id: 44, name: 'Vasilisa', job: 'Teacher', age: 24}
];

const index = {};
userData.forEach(el => index[el.id] = el);

const IndexArray = new Proxy(Array, {
    construct: (target, [argArray], newTarget) => {
        const index = {};
        argArray.forEach(item => index[item.id] = item);
        // return new target(...argArray) //базовое использование
        return new Proxy(target(...argArray), {
            get(arr, prop) {
                switch (prop) {
                    case 'push':
                        return item => {
                            index[item.id] = item; //добавили в пуш кастомное дейтсвие
                            arr[prop].call(arr, item) //реализовано базовое использование метода пуш
                        };
                    case 'findById':
                        return id => index[id]; // добавили массивам поиск по id
                    default:
                        return arr[prop]
                }
            }
        })
    }
});

const users = new IndexArray([
    {id: 11, name: 'Vladilen', job: 'Fullstack', age: 25},
    {id: 22, name: 'Elena', job: 'Student', age: 22},
    {id: 33, name: 'Victor', job: 'Backend', age: 23},
    {id: 44, name: 'Vasilisa', job: 'Teacher', age: 24}
]);

// users
// Proxy {0: {…}, 1: {…}, 2: {…}, 3: {…}}

// users[0]
// {id: 11, name: "Vladilen", job: "Fullstack", age: 25}

// users[2]
// {id: 33, name: "Victor", job: "Backend", age: 23}

// users.push({id:55, name: 'Jane'})
// undefined

// users[4]
// {id: 55, name: "Jane"}

// users.findById(11)
// {id: 11, name: "Vladilen", job: "Fullstack", age: 25}

// users.findById(55)
// {id: 55, name: "Jane"}