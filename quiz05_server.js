// 웹 서버 만들기

//다른 개발자가 만들어둔 module불러오기
const http = require('http');
const express = require('express');
const cors =require('cors');

const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin',
    supportBigNumbers: true
})


/*
BigInt.prototype.toJSON = () => {
        return this.toString();
        }
*/

// 웹 서비스를 위한 객체 만들기
const app = express();

app.use(cors());

// 웹페이지 파일을 저장해두고 불러와서 사용하기 위해 사용되는 모듈에 대한 설정
app.set('views', './views');
app.set('view engine', 'ejs');

// 라우터 설정하기
// 클라이언트 (요청하는 쪽, -> 웹 브라우저)에서 요청 경로로 요청하는 것을
// 어떤 함수로 실행시켜서 응답을 보내줄지를 결정해 주는 것
// 요청 경로 -> 함수 매칭(매핑)
const router = express.Router();
app.use('/', router);

// /person/list-data 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/list-data').get(async (req, res) => {
    console.log(`/person/list-data 요청경로로 요청됨`);

    // 데이터베이스에서 데이터 조회하기

    let conn;
    try {
        let sql = `select id, name, age, mobile from test.person`;
        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);

        

        const output = {
            code: 200,
            message: 'OK',
            data: rows
        }
        
        // 클라이언트(요청한 곳, 웹 브라우저) 쪽으로 응답을 보내줌
        res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
        res.end(JSON.stringify(output));

    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})


// /person/modify 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/modify').get(async (req, res) => {
    console.log(`/person/modify 요청경로로 요청됨`);

    // 클라이언트로부터 전달받은 요청 파라미터 확인하기
    const params = req.query;
    console.log(`요청 파라미터 -> params: ${JSON.stringify(params)}`);


    // 데이터베이스에서 데이터 조회하기

    let conn;

    try {
        // 클라이언트(웹브라우저)가 보내준 요청 파라미터를 SQL문과 합쳐서 업데이트 실행
        let sql = `update test.person set name = '${params.name}', age = ${params.age}, mobile = '${params.mobile}'
                    where id = ${params.id}`;
        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);

        // 업데이트한 결과로 고객 목록을 볼 수 있도록 list.ejs 웹페이지 파일을 불러온 후
        // DB의 데이터와 결합해서 응답 보내기
        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            data: rows
        }
        
        // 클라이언트(요청한 곳, 웹 브라우저) 쪽으로 응답을 보내줌
        res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
        res.end(JSON.stringify(output));
        
        

    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})

// /person/update 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/update').get(async (req, res) => {
    console.log(`/person/update 요청경로로 요청됨`);

    // 클라이언트로부터 전달받은 요청 파라미터 확인하기
    const params = req.query;
    console.log(`요청 파라미터 -> params: ${JSON.stringify(params)}`);


    
    try {

        const context = {
            params: params
        }
        // views 폴더 안에 있는 update.ejs 웹페이지 파일을 읽어와서 요청 파라미터로 
        // 전달받은 데이터를 결합한 후
        // 콜백함수의 두번째 구멍으로 전달해줌
        req.app.render('update', context, (err, html) => {
            // 만약 첫번째 구멍으로 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
                return;
            }

            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트(요청한 곳, 웹 브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
            res.end(html);
        })

    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {

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

        

        const output = {
            code: 200,
            message: 'OK',
            data: rows
        }

        // 클라이언트(요청한 곳, 웹 브라우저) 쪽으로 응답을 보내줌
        res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
        res.end(JSON.stringify(output));

    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
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

        
        const output = {
            code: 200,
            message: 'OK',
            data: rows
        }

        // 클라이언트(요청한 곳, 웹 브라우저) 쪽으로 응답을 보내줌
        res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
        res.end(JSON.stringify(output));
        

        
        
    } catch (err) {
        console.error(`에러 발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }


})



//웹서버 실행하기
const port = 7001;
//const port = 5173;
http.createServer(app).listen(port, () => {
    console.log(`웹 서버 실행됨 : ${port}`);
    console.log(`웹 서버 실행됨: http://localhost:${port}/person/list-data`);
})
