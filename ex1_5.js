console.log('안녕!');

// 변수 상자 만들기

// 자바 스크립트는 변수상자의 크기를 명시하지 않음
// 자바의 경우
// String name1;

let name1;
name1 = '홍길동1';
console.log(`name1 변수상자의 값 : ` + name1);
console.log(`name1 변수상자의 값 : ${name1}`);

let name2 = '홍길동2';
console.log(`name2 변수상자의 값: ${name2}`);
console.log(`name2 변수상자의 크기 : ${typeof(name2)}`)


let age1 = 21;
console.log(`age1 변수상자의 값 : ${age1}`);
console.log(`age1 변수상자의 크기 : ${typeof(age1)}`)

let visible = true;
console.log(`visible 변수상자의 크기 : ${typeof(visible)}`)

// 자바 스크립트는 글자 string
// 숫자는 number
// true, false는 boolean
// 값을 넣어야 정의됨 -> 없으면 undefined

let age2;
console.log(`age2 변수상자의 크기 : ${typeof(age2)}`);

if(typeof(age2) == 'undefined'){

    console.log(`age2 변수상자의 크기를 알 수 없습니다.`);

} else if(typeof(age2) == 'string'){
    console.log(`age2 변수 상자의 크기는 string입니다.`)
}

age2 = 22;

if (age2){
    console.log(`age2 변수상자의 크기가 결정되어 있습니다 : ${typeof(age2)}`);
}
