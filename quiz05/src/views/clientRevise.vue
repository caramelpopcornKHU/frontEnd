<template>
  <div>
    <div>
      <title>고객 정보 수정</title>
    </div>
    
    <div>
      <h1>고객 정보 수정</h1>
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
/*
export default {
  data() {
    return {
      name: '',
      age: '',
      mobile: ''
    }
  },
  created() {
    // URL 쿼리에서 값 받아 초기화
    this.name = this.$route.query.name || ''
    this.age = this.$route.query.age || ''
    this.mobile = this.$route.query.mobile || ''
  }
}
*/

const name = ref('');
const age = ref('');
const mobile = ref('');
const id = ref(null);

onMounted(() => {
  console.log(`clientRevise 화면의 onMounted 호출됨`);

  id.value = route.query.id;
  name.value = route.query.name;
  age.value = route.query.age;
  mobile.value = route.query.mobile;
})

async function enterData() {
  // 데이터 수정
  
  try {

    const response = await axios({
      method: 'get', // get 방식 요청
      url: 'http://localhost:7001/person/modify',
      params: {
        id: id.value,
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
