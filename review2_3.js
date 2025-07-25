// 붕어빵 만들기
// 첫번째 방법 : 변수상자들을 그냥 묶어주기

const fish1 = {
    name : '물고기1',
    age : 21,
    swim : function() {
        console.log(`물고기가 헤엄칩니다.`);
    }
}
console.log(`fish1 붕어빵의 이름 : ${fish1.name}`);
console.log(`fish1 붕어빵의 이름 : ${fish1['name']}`);

// 두번재 방법 : 붕어빵틀에서 찍어내기
class Fish {
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    swim() {
        console.log(`${this.name} 물고기가 헤엄칩니다.`);        
    }

}

const fish2 = new Fish('물고기2', 1);
console.log(`fish2 변수상자에 들어있는 붕어빵의 이름 : ${fish2.name}`);

fish2.swim();
