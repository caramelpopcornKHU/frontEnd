// 웹서버 만들기

const http = require('http');
const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
})

// 웹 서비스를 위한 객체 만들기
const app = express();

// 웹페이지 파일을 저장해두고 불러와서 사용하기 위해 사용되는 모듈에 대한 설정
app.set('views', './views');  // A 는 B로 설정할게
app.set('view engine', 'ejs'); // A 는 B로 설정할게

// 라우터 설정하기
const router = express.Router();
app.use('/', router); // 기본 주소 뒤에 오는건 router친구가 처리할게 ㅇㅋ?
// 기본주소: http://localhost:7001/


// 브라우저에서 url창에 다가 밑에 링크를 치잖아? 그러면 요청이 서버에 들어온거지?
// http://localhost:7001/person/list 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/list').get(async (req, res) => {
    console.log(`http://localhost:7001/person/list 요청경로로 요청됨`);

    // DB에서 데이터 조회하기
    let conn;
    try {
        let sql = `select id, name, age, mobile from test.person`; //test db의 person table
        conn = await pool.getConnection(); // maria db pool에서 연결가져오기
        let rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        const context = {
            persons: rows
        }

        // views/clientList.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientList', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }


})


// http://localhost:7001/person/update 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/update').get(async (req, res) => {
    console.log(`http://localhost:7001/person/update 요청경로로 요청됨`);

    // 클라이언트로부터 전달받은 요청 파라미터 확인하기
    const params = req.query;
    console.log(`요청 파라미터 -> params: ${JSON.stringify(params)}`);

    try {

        const context = {
            params: params
        }

        // views/clientList.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientUpdate', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    }


})


// http://localhost:7001/person/modify 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/modify').get(async (req, res) => {
    console.log(`http://localhost:7001/person/modify 요청경로로 요청됨`);

    const params = req.query;
    console.log(`요청 파라미터 -> params: ${JSON.stringify(params)}`);

    // DB에서 데이터 수정하기
    let conn;
    try {
        // 클라이언트가 보내온 person/modify? 뒷부분 req.params
        let sql = `update test.person 
                set name = '${params.name}'
                   ,age = ${params.age}
                   ,mobile = '${params.mobile}'
                where id = ${params.id}
                `; // 데이터 베이스 정보 수정하는 쿼리
        conn = await pool.getConnection(); // maria db pool에서 연결가져오기
        let rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        sql = `select * from test.person`; // 정보 조회하는 쿼리
        rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        // views/clientList.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientList', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }


})

// http://localhost:7001/person/delete 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/delete').get(async (req, res) => {
    console.log(`http://localhost:7001/person/delete 요청경로로 요청됨`);

    params = req.query;

    // DB에서 데이터 조회하기
    let conn;
    try {
        conn = await pool.getConnection(); // maria db pool에서 연결가져오기

        let sql = `delete from test.person where id = ${params.id}`; //test db의 person table
        let rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        sql = `select id, name, age, mobile from test.person`; //test db의 person table
        rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        const context = {
            persons: rows
        }

        // views/clientList.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientList', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }


})


// http://localhost:7001/person/addClient 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/addClient').get(async (req, res) => {
    console.log(`http://localhost:7001/person/addClient 요청경로로 요청됨`);


    try {

        const context = {

        }

        // views/clientAdd.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientAdd', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    }


})


// http://localhost:7001/person/saveClient 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/saveClient').get(async (req, res) => {
    console.log(`http://localhost:7001/person/saveClient 요청경로로 요청됨`);

    params = req.query;

    // DB에서 데이터 조회하기
    let conn;
    try {
        conn = await pool.getConnection(); // maria db pool에서 연결가져오기

        let sql = `insert into test.person(name,age,mobile)
                    values
                    ('${params.name}',${params.age},'${params.mobile}')
        `; //test db의 person table
        let rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        sql = `select id, name, age, mobile from test.person`; //test db의 person table
        rows = await conn.query(sql, []); // query 날린거 []로 받아오기

        const context = {
            persons: rows
        }

        // views/clientList.ejs [웹페이지 파일] 읽어오고 context객체 안에 있는 속성들을
        // 웹페이지와 결합해서 콜백함수의 두번째 구멍으로 전달

        req.app.render('clientList', context, (err, html) => {
            // 만약 1번째 구멍으로 에러가 전달
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }


            // 정상실행으로 2번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }


})



// 웹 서버 실행하기
const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹 서버 실행됨: http://localhost:${port}/person/list`);
})
