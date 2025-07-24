// 객체(붕어빵) 만들기
let fish1 = {
    name : `홍길동1`,
    age : 21,
    swim : function() {
        console.log(`물고기가 헤엄칩니다.`);
    }
}
fish1.swim();

// 붕어빵 틀에서 붕어빵 만들어내기
class Fish{

    constructor(name,age) {
        this.name = name;
        this.age = age;

        console.log(`물고기가 만들어졌어요.`);
    }

}


let fish2 = new Fish('물고기1',1);
console.log(`fish2 변수상자에 들어있는 물고기 이름 : ${fish2.name}`);