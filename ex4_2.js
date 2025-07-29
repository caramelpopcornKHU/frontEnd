// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈을 불러오기
const http = require('http');
const express = require('express');
const mariadb = require('mariadb');

// 2. 데이터베이스 연결 설정
const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
});

// 3. 웹 애플리케이션 설정
const app = express();
app.set('views', './views'); // 뷰 템플릿 파일이 있는 디렉토리 설정
app.set('view engine', 'ejs'); // 뷰 템플릿 엔진으로 EJS 사용

// 4. 라우터 설정
const router = express.Router();
app.use('/', router);

// 5. 특정 경로에 대한 GET 요청 처리
router.route('/page/list').get(async (req, res) => {
    console.log('/page/list 요청됨');

    let conn;
    try {
        // 6. 데이터베이스에서 데이터 조회
        conn = await pool.getConnection(); // 데이터베이스 연결

        const sql = 'select * from test.person';
        const rows = await conn.query(sql, []); // SQL 쿼리 실행

        // 7. 뷰 템플릿에 데이터 전달 및 렌더링
        const context = {
            persons: rows
        };

        req.app.render('list', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        });
    } catch (err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    } finally {
        if (conn) {
            conn.end(); // 데이터베이스 연결 종료
        }
    }
});

// 5. 특정 경로에 대한 GET 요청 처리
router.route('/page/add').get(async (req, res) => {
    console.log('/page/add 요청됨');


    try {


        // 7. 뷰 템플릿에 데이터 전달 및 렌더링
        const context = {

        };

        req.app.render('add', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        });
    } catch (err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    }
});


// 5. 특정 경로에 대한 GET 요청 처리
router.route('/page/insert').get(async (req, res) => {
    console.log('/page/insert 요청됨');

    const params = req.query;
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`);

    let conn;
    try {
        // 6. 데이터베이스에서 데이터 조회
        conn = await pool.getConnection(); // 데이터베이스 연결

        let sql = `insert into test.person(name,age,mobile) values ('${params.name}',${params.age},'${params.mobile}')`;
        let rows = await conn.query(sql, []); // SQL 쿼리 실행

        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        // 7. 뷰 템플릿에 데이터 전달 및 렌더링
        const context = {
            persons: rows
        };

        req.app.render('list', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        });
    } catch (err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    } finally {
        if (conn) {
            conn.end(); // 데이터베이스 연결 종료
        }
    }
});



// 8. 웹 서버 실행
const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹서버 실행됨 -> port: ${port}`);
    console.log(`웹 서버 실행됨: http://localhost:${port}/page/list`);
});