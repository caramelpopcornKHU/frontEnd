// 붕어빵 만들기

let fish1 = {
    name: '홍길동1',
    age: 21
}

console.log(`fish1 변수상자에 들어있는 붕어빵의 이름은? ${fish1.name}`);

let fish2 = {
    name: `홍길동2`,
    age: 22,
    swim: function()  {
        console.log(`물고기가 헤엄칩니다 : ${this.name}`);
    }
}

fish2.swim();

class Fish{
    
    constructor(name,age){
        this.name = name;
        this.age = age;   
    }
    swim() {
        console.log(`붕어빵이 헤엄칩니다. : ${this.name}`);
    }
}

let fish3 = new Fish('붕어빵1',1);
console.log(`fish3 변수상자에 들어있는 붕어빵의 이름은? : ${fish3.name}`);
fish3.swim();


let Dog = {
    name : '강아지01',
    age : 21
}

class Cat {
    constructor(name){
        this.name = name;
    }
}

class House{
    constructor(Dog,Cat){
        this.Dog = Dog;
        this.Cat = Cat;
    }

    dogCall(){
        console.log(`강아지 이름:${Dog.name} 강아지 나이: ${Dog.age}`);
    }

    catCall(){
        console.log(`고양이 이름:${Cat.name}`);
    }

}

let house01 = new House(Dog,new Cat('고양이'));
house01.dogCall();
house01.catCall();

