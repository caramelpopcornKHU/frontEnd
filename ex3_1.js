// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈(라이브러리) 불러오기
const http = require('http');
const express = require('express');
const port = 7001;

//2. 익스프레스를 이용해서 웹서버를 위한 객체 만들기
const app = express();

// 4. 미들웨어 추가하기
app.use((req, res, next) => {
    console.log(`첫번째 미들웨어 호출됨`);

    next();
})

app.use((req, res, next) => {
    console.log(`두번째 미들웨어 호출됨`);

    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
    res.end('<h1> 웹서버에서 전달받은 페이지 </h1>');
})

//3. 웹서버 실행하기
// 7001번 포트로 웹서버가 대기하게 됨
http.createServer(app).listen(7001, () => {
    console.log(`웹 서버 실행됨`);
    console.log(`웹 서버 실행됨: http://localhost:${port}`);
})

