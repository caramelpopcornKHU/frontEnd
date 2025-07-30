<template>
  <div>
    <div>
      <h1>홈 화면</h1>
    </div>

    <div>
      <span>이름 : </span>
      <input type="text" v-model="nameInput"></input>

    </div>

    <div>
      <span>나이 : </span>
      <input type="text"></input>
    </div>

    <div>
      <span>전화번호 : </span>
      <input type="text"></input>
    </div>

    <div>
      <button @click="show()">확인</button>
    </div>

    <div>
      <p>결과 : {{ name }}</p>
    </div>

    <div>
      <button @click="requestPersonList()">웹 서버에서 조회하기</button>
      
    </div>

    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>전화번호</th>
        </tr>

      </thead>
      <!--
      <tbody>
          <tr>
            <td>홍길동1</td>
            <td>21</td>
            <td>010-1000-1000</td>
          </tr>
          <tr>
            <td>홍길동2</td>
            <td>22</td>
            <td>010-2000-2000</td>
          </tr>
        </tbody> -->
      <tbody>
        <tr v-for="(item, index) in persons" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.mobile }}</td>
        </tr>
      </tbody>

    </table>

    <div>
      <button @click="goToAbout()">정보 화면으로</button>
      <button @click="goToMenu()">메뉴 화면으로</button>
    </div>

  </div>


</template>


<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

import axios from 'axios';

const nameInput = ref('');

const name = ref('');
const persons = ref([]);
/*
const persons = ref([
  {
    id: 1,
    name: '홍길동1',
    age: 21,
    mobile: '010-1000-1000'
  },
  {
    id: 2,
    name: '홍길동2',
    age: 22,
    mobile: '010-2000-2000'
  },
  {
    id: 3,
    name: '홍길동4',
    age: 23,
    mobile: '010-3000-3000'
  }
])
  */

// (현재)이 화면이 로딩되면 호출되는 콜백함수를 등록하기
onMounted(() => {
  console.log(`onMounted 호출됨`);

  requestPersonList();
  
})

function show() {
  console.log(`show 함수 호출됨`);
  name.value = nameInput.value;

}

async function requestPersonList() {
  console.log(`requestPersonList 함수 호출됨`);

  try {

    const response = await axios({
      method: 'get', // get방식으로 요청한다
      url: 'http://localhost:7001/person/list-data',
      data: {}
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`);

    persons.value = response.data.data;

  } catch (err) {
    console.error(`에러 -> ${err}`);
  }

}

function goToAbout() {
  //router.push('/about');
  router.push({
    path: '/about',
    query: { name: '홍길동1', age: 21 , mobile: '010-1234-1234'}
  });
}

function goToMenu() {
  router.push('/menu');
}
</script>


<style scoped></style>