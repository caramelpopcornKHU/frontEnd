<template>
  <div>
    <h1>홈 화면</h1>

    <div>
      <p class="group1">안녕!</p>
      <img src="@/assets/images/blank.png">

    </div>

    <div>
      <label>이름: </label><input type="text" v-model="name">
      <br>
      <label>나이: </label><input type="text" v-model="age">
      <br>
      <label>전화번호: </label><input type="text" v-model="mobile">
      <br>

      <button @click="show()">확인</button>
    </div>

    <div>
      <p>{{ name }}</p>
      <p>{{ output1 }}</p>
    </div>

    <div>
      <input type="text" v-model="inputA">
      <input type="text" v-model="inputB">

      <button @click="add()">더하기</button>

      <p>더하기 결과 : {{ result1 }}</p>
    </div>

  </div>
</template>

<script setup>

import { ref } from 'vue';


const name = ref('');

const output1 = ref(`결과 : `);

const inputA = ref('');
const inputB = ref('');
const result1 = ref(0);

function add() {
  const a = Number(inputA.value);
  const b = Number(inputB.value);

  result1.value = a + b;
}

function show() {
  console.log(`show 함수 호출됨`);

  output1.value = `결과 : 이름`;

}

</script>

<style scoped>
.group1 {
  color: red;
}
</style>
