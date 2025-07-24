// 함수 상자 만들기
function add1(a, b) {
    return a + b;
}

let a = 10;
let b = 10;

let output1 = add1(a, b);
console.log(`더하기 결과 : ${output1}`);

//함수 상자를 변수 상자에 넣기

let add2 = function (a,b) {
    return a + b;
}

let add3 = (a,b) => {
    return a + b;

}

// 콜백 함수 사용하기

let add4 = (a, b, callback) => {
    // return a + b;
    callback( a + b ); // return 대신에 callback
}

add4(10, 10, (output)=>{
    console.log(`callback 함수 안에서 결과 : ${output}`);
});