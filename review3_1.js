// 변수상자 만들기

let name1 = '홍길동1';
let age1 = 21;
let visible = true;

const name1Type = typeof(name1);
console.log(`name1 변수상자의 크기 ${name1Type}`);

let name2;
const name2Type = typeof(name2);
console.log(`name2 변수상자의 크기 : ${name2Type}`);

const age2 = '21a';
const age3 = '22';

const age2Int = Number(age2);
const age3Int = Number(age3);

const result1 = age2Int + age3Int;
console.log(`result1의 결과 : ${result1}`);

if(isNaN(age2Int) ) {
    console.log(`첫번째 글자는 숫자가 아닙니다.`);
}
if(isNaN(result1)) {
    console.log(`더하기 결과가 숫자가 아닙니다`);
}


