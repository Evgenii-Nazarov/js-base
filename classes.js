// // const animal = {  //так можно создавать объекты-классы
// //     name: 'Animal',
// //     age: 3,
// //     hasTail: true
// // };
//
// class Animal {
//
//     static type = 'ANIMAL'; //можно вызвать, обращаясь напрямую к классу Animal.type
//
//     constructor(options) {
//         this.name = options.name;
//         this.age = options.age;
//         this.hasTail = options.hasTail;
//     }
//
//     voice() {
//         console.log('I am animal')
//     }
// }
//
// const animal = new Animal({
//     name: 'Animal',
//     age: 3,
//     hasTail: true
// });
//
// class Cat extends Animal {
//     static type = 'CAT'
//
//     constructor(options) {
//         super(options); // для создания конструктора в children нужно вызвать конструктор родителя
//         this.color = options.color
//     }
//
//     voice(){
//         super.voice() //обращение к методу родителя
//         console.log('I am cat')
//     }
//
//     get ageInfo() {  //геттер
//         return this.age * 7;
//     }
//
//     set ageInfo(newAge) {  //сеттер
//         this.age = newAge
//     }
// }
//
// const cat = new Cat({
//     name: 'Cat',
//     age: 7,
//     hasTail: true,
//     color: 'black'
// });

class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector)
    }

    hide() {
        this.$el.style.display = 'none'
    }

    show() {
        this.$el.style.display = 'block'
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector);

        this.$el.style.width = this.$el.style.height = options.size + 'px'
        this.$el.style.background = options.color

    }
}

const box1 = new Box({ // добавить в индекс <div id="box1"></div>
    selector: '#box1',
    size: 100,
    color: 'red',
});

const box2 = new Box({ // добавить в индекс <div id="box2"></div>
    selector: '#box2',
    size: 120,
    color: 'blue',
});

class Circle extends Box {
    constructor(options) {
        super(options);

        this.$el.style.borderRadius = '50%'
    }
}

const c = new Circle({ // добавить в индекс <div id="circle1"></div>
    selector: '#circle1',
    size: 90,
    color: 'green',
});

