<template>
  <div>
    <div>
      <h1>정보 화면</h1>
    </div>

    <div>
      <p>전달받은 이름: {{ name }}</p>
      <p>전달받은 나이: {{ age }}</p>
      <p>전달받은 전화번호: {{ mobile }}</p>
    </div>

    <div>
      <button @click="goToHome()">홈 화면으로</button>
    </div>
  </div>
  
  
</template>


<script setup>

import {ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const name = ref('');
const age =  ref('');
const mobile =  ref('');

onMounted(() => {
  console.log(`AboutView 화면의 onMounted 호출됨`)

  name.value = route.query.name;
  age.value = route.query.age;
  mobile.value = route.query.mobile;


})

function goToHome() {
  router.push('/');
}

</script>


<style scoped>

</style>