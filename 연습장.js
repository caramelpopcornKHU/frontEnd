const express = require('express');       
const app = express();
const port = 7001;
 
// 첫번째 미들웨어
app.use((req, res, next) => {
console.log('첫번째 미들웨어 호출됨');
next();});
    
// 두번째 미들웨어
app.use((req, res, next) => {
console.log('두번째 미들웨어 호출됨');
res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
res.end('<h1> 웹서버에서 전달받은 페이지 </h1>');
});
    
// 서버 실행
app.listen(port, () => {
console.log(`웹 서버 실행됨: http://localhost:${port}`);
 });