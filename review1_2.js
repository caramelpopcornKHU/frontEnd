// 변수 상자 만들기
let name1;
name1 = '홍길동1';

let name2 = '홍길동2';

let age1 = 21;
let visible = true;

console.log(`name1 변수 상자의 크기 : ${typeof(name1)}`);
console.log(`age1 변수 상자의 크기 : ${typeof(age1)}`);
console.log(`visible 변수 상자의 크기 : ${typeof(visible)}`);

let name3;
console.log(`name3 변수 상자의 크기 : ${typeof(name3)}`);

if (typeof(name3) == 'undefined') {
    console.log(`name3 변수 상자는 크기를 알 수 없습니다.`);
}

