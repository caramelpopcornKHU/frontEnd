class Dog{
    constructor(name){
        this.name = name;
    }
}

class Cat{
    constructor(name){
        this.name = name;
    }
}

let Human = {
    name : '형민',
    age : 26,
    mobile : '010-1111-1111'
}

let house = {
    dog : new Dog('멍멍이1'),
    cat : new Cat('고양이1'),
    human : Human,

   print: function()  {
        console.log(`강아지 이름: ${this.dog.name}, 고양이 이름: ${this.cat.name}, 사람 이름: ${this.human.name}, 사람 나이: ${this.human.age}, 사람 번호: ${this.human.mobile}`)
    }

}


house.print();