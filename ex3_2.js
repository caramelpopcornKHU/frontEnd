// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈(라이브러리) 불러오기
const http = require('http');
const express = require('express');
const port = 7001;

//2. 익스프레스를 이용해서 웹서버를 위한 객체 만들기
const app = express();

// 4. 미들웨어 추가하기

// 5. 라우터 추가하기
const router = express.Router();
app.use('/',router);

router.route('/page/first').get((req, res) => {
    console.log(`/page/first 요청됨`);

    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.end(`<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>연습</title>
            </head>
            <body>
              <h1>연습 첫번째</h1>
            </body>
        </html>`
    );
})

router.route('/page/second').get((req,res) => {
    console.log(`/page/second 요청됨`);

    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.end(`<h1> 두번째 페이지 </h1>`);
})

//3. 웹서버 실행하기
// 7001번 포트로 웹서버가 대기하게 됨
http.createServer(app).listen(7001, () => {
    console.log(`웹 서버 실행됨`);
    console.log(`웹 서버 실행됨: http://localhost:${port}`);
})

