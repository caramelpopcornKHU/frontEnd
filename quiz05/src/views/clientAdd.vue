<template>
  <div>
    <div>
      <title>고객 정보 추가</title>
    </div>
    
    <div>
      <h1>고객 정보 추가</h1>
    </div>

    <div>
      <p>
        <input type="text" v-model="name" placeholder="이름">
      </p>
      <p>
        <input type="text" v-model="age" placeholder="나이">
      </p>
      <p>
        <input type="text" v-model="mobile" placeholder="전화번호">
      </p>
    </div>

    <div>
      <button @click="enterData()">확인</button>
      <button @click="goToHome()">홈 화면으로</button>
    </div>


  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();


const name = ref('');
const age = ref('');
const mobile = ref('');
const id = ref(null);

onMounted(() => {
  console.log(`clientRevise 화면의 onMounted 호출됨`);

})

async function enterData() {
  // 데이터 추가
  
  try {

    const response = await axios({
      method: 'get', // get 방식 요청
      url: 'http://localhost:7001/person/saveClient',
      params: {
        
        name: name.value,
        age: age.value,
        mobile: mobile.value
      }
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`);
    // 응답 내용을 persons의 value에 넣기
    //persons.value = response.data.data;

    router.push('/');
  } catch (err) {
    console.error(`호출에 실패 : ${err}`);
  }
}

function goToHome() {
  router.push('/');
}


</script>

<style>

</style>
