<template>
  <div>
    <div>
      <title>고객 목록 화면</title>
    </div>

    <div>
      <h1>고객 목록</h1>
    </div>

    <div>
      <!-- 여기에 DB에 몇명 있나 추가  -->
    </div>

    <table>
      <!-- table head -->
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>전화번호</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>

      <!-- table body -->
      <tbody>
        <tr v-for="(item, index) in persons" :key="item.id">
          
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.mobile }}</td>
          <td><button @click="reviseClient(item)">수정</button></td>
          <td><button @click="deleteClient(item)">삭제</button></td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="addClient()">추가</button>
    </div>
  </div>
</template>

<script setup>
// 페키지 import
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const persons = ref([]);

BigInt.prototype.toJSON = function() {
    return this.toString();
}

// 현재 화면이 로딩되면 호출되는 콜백함수 등록
onMounted(() => {

  console.log(`onMounted 함수 호출됨 | 화면이 켜진거지? ㅇㅇ`);
  requestPersonList();

})

// 비동기 함수 - person list를 요청하는 함수
async function requestPersonList() {
  console.log(`requestPersonList 함수 호출됨`);

  try {

    const response = await axios({
      method: 'get', // get 방식 요청
      url: 'http://localhost:7001/person/list-data',
      data: {}
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`);
    // 응답 내용을 persons의 value에 넣기
    persons.value = response.data.data;

  } catch (err) {
    console.error(`호출에 실패 : ${err}`);
  }
}


function addClient() {
  console.log(`추가 버튼 눌림 | addClient함수 실행`);
  router.push('/addClient');
}

function reviseClient(item) {
  console.log(`고객 수정 버튼 눌림`);
  console.log('Revising item id:', item.id);
  router.push({
    path: '/reviseClient',
    query: { id: item.id, name: item.name, age: item.age, mobile: item.mobile }
  });

}

async function deleteClient(item) {
  console.log(`고객 삭제 버튼 눌림`);
  console.log('Deleting item:', item);

  try {

    const response = await axios({
      method: 'get', // get 방식 요청
      url: 'http://localhost:7001/person/delete',
      params: {
        id: item.id
      }
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`);

    await requestPersonList();

  } catch (err) {
    console.error(`호출에 실패 : ${err}`);
  }
}

</script>

<style scoped></style>