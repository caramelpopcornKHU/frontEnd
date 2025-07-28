// 웹서버 만들기

//1. 다른 개발자가 만든 모듈을 불러오기

const http = require('http');
const express = require('express');
const mariadb = require('mariadb');


//2. 데이터베이스 연결 설정

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
});

//3. 웹 애플리케이션 설정

const app = express();
app.set('views', './views'); 
app.set('view engine', 'ejs');

//4. 라우터 설정

const router = express.Router();
app.use('/',router);

//5. 특정 경로에 대한 GET 요청 처리

router.route('/page/first').get(async(req,res) => {
    console.log(`/page/first 요청됨`);

    let conn;

    try{
        conn = await pool.getConnection();
        const sql = 'select * from test.person';
        const rows = await conn.query(sql, []);

        const context = {
            username: rows[0].name
        };

        req.app.render('first', context, (err,html) =>{
            if(err){
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }
            res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
            res.end(html);
        });
    } catch(err){
        console.error(`요청 처리 중 에러 -> ${err}`);
    } finally {
        if(conn) {
            conn.end(); // 데이터베이스 연결 종료
        }
    }
});


// 웹 서버 실행
const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹 서버 실행됨: http://localhost:${port}/page/first`);
})

