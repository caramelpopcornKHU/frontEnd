
// 함수(function)는 특정 작업을 수행하는 코드 블록입니다.
// 함수를 사용하면 코드를 재사용하고, 프로그램을 더 구조적으로 만들 수 있습니다.

// 함수 선언 및 호출
// 'function' 키워드를 사용하여 함수를 선언합니다.
// 'add'는 함수의 이름입니다.
// 'a'와 'b'는 매개변수(parameter)로, 함수에 전달되는 값입니다.
function add(a, b) {
  // 'return' 키워드는 함수의 실행 결과를 반환합니다.
  return a + b;
}

// 함수 호출
// 함수를 호출하면 함수 내부의 코드가 실행됩니다.
// '10'과 '20'은 인자(argument)로, 함수에 전달되는 실제 값입니다.
const result1 = add(10, 20);
console.log(`더하기 결과: ${result1}`); // 30

// 콜백 함수(Callback Function)
// 콜백 함수는 다른 함수의 인자로 전달되는 함수입니다.
// 비동기적인 작업을 처리할 때 유용하게 사용됩니다.

// 'addWithCallback' 함수는 'a', 'b', 'callback' 세 개의 매개변수를 가집니다.
// 'callback'은 함수입니다.
const addWithCallback = (a, b, callback) => {
  const result = a + b;
  // 'callback' 함수를 호출하여 결과를 전달합니다.
  callback(result);
};

// 'addWithCallback' 함수 호출
// 세 번째 인자로 화살표 함수 형태의 콜백 함수를 전달합니다.
addWithCallback(10, 20, (result) => {
  console.log(`콜백 함수 안에서 더하기 결과: ${result}`); // 30
});

// 콜백 지옥(Callback Hell)과 비동기 처리
// 콜백 함수를 중첩해서 사용하면 코드가 복잡해지고 가독성이 떨어지는 '콜백 지옥'이 발생할 수 있습니다.

// 동기(Synchronous): 순차적으로 실행, 하나 끝나야 다음 실행.
// 비동기(Asynchronous): 기다리지 않고 다음 코드 먼저 실행. 나중에 결과를 받아서 처리.

// 'addWithDelay' 함수는 500밀리초(0.5초) 후에 결과를 반환하는 비동기 함수입니다.
const addWithDelay = (a, b, callback) => {
  setTimeout(() => {
    const result = a + b;
    callback(null, result); // 첫 번째 인자는 에러, 두 번째 인자는 결과
  }, 500);
};

// 'divideWithDelay' 함수는 1초 후에 결과를 반환하는 비동기 함수입니다.
const divideWithDelay = (a, b, callback) => {
  setTimeout(() => {
    if (b === 0) {
      callback('0으로 나눌 수 없습니다.', null); // 에러 발생
      return;
    }
    const result = a / b;
    callback(null, result); // 에러 없음
  }, 1000);
};

// 콜백 지옥 예시
// 나누기 -> 더하기 순서로 비동기 작업을 처리합니다.
divideWithDelay(200, 10, (err, result) => {
  if (err) {
    console.error(`에러 발생: ${err}`);
    return;
  }
  console.log(`나누기 결과: ${result}`); // 20

  // 나누기 결과에 10을 더합니다.
  addWithDelay(result, 10, (err2, result2) => {
    if (err2) {
      console.error(`에러 발생: ${err2}`);
      return;
    }
    console.log(`더하기 결과: ${result2}`); // 30
  });
});

// Promise를 사용한 비동기 처리
// Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.
// 콜백 지옥을 해결하고 코드를 더 깔끔하게 작성할 수 있도록 도와줍니다.

// 'addWithPromise' 함수는 Promise를 반환하는 비동기 함수입니다.
const addWithPromise = (a, b) => {
  return new Promise((resolve, reject) => {
    addWithDelay(a, b, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// 'divideWithPromise' 함수는 Promise를 반환하는 비동기 함수입니다.
const divideWithPromise = (a, b) => {
  return new Promise((resolve, reject) => {
    divideWithDelay(a, b, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Promise 체이닝
// '.then()' 메서드를 사용하여 Promise가 완료된 후의 작업을 처리합니다.
divideWithPromise(200, 10)
  .then(result => {
    console.log(`◆나누기 결과 (Promise): ${result}`); // 20
    return addWithPromise(result, 10);
  })
  .then(result => {
    console.log(`◆더하기 결과 (Promise): ${result}`); // 30
  })
  .catch(err => {
    console.error(`에러 발생 (Promise): ${err}`);
  });

// async/await를 사용한 비동기 처리
// 'async/await'는 Promise를 더 쉽게 사용할 수 있도록 하는 문법적 설탕(Syntactic Sugar)입니다.
// 비동기 코드를 동기 코드처럼 보이게 만들어 가독성을 높입니다.

// 'async' 키워드는 함수가 비동기 함수임을 나타냅니다.
const calculate = async () => {
  try {
    // 'await' 키워드는 Promise가 완료될 때까지 기다립니다.
    const divideResult = await divideWithPromise(200, 10);
    console.log(`★나누기 결과 (async/await): ${divideResult}`); // 20

    const addResult = await addWithPromise(divideResult, 10);
    console.log(`★더하기 결과 (async/await): ${addResult}`); // 30
  } catch (err) {
    console.error(`에러 발생 (async/await): ${err}`);
  }
};

calculate(); // 비동기 함수 호출
