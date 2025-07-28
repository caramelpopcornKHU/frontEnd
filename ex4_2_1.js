// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈을 불러오기
const http = require('http');
const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
})


const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

const router = express.Router();
app.use('/', router);

router.route('/page/list').get(async (req, res) => {
    console.log('/page/list 요청됨');

    let conn;
    try {
        // 데이터베이스로 SQL문 실행 요청하기
        conn = await pool.getConnection();

        const sql = `select id, name, age, mobile from test.person`;
        const rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        req.app.render('list', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }

            res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
            res.end(html);

        })

    } catch(err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    } finally {
        if (conn) { conn.end(); }
    }

})

router.route('/page/add').get(async (req, res) => {
    console.log('/page/add 요청됨');
 
    try {
        
        const context = {
             
        }

        req.app.render('add', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }

            res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
            res.end(html);

        })

    } catch(err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    } 

})

router.route('/page/insert').get(async (req, res) => {
    console.log('/page/insert 요청됨');

    const params = req.query;
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`);

    let conn;
    try {
        // 데이터베이스로 SQL문 실행 요청하기
        conn = await pool.getConnection();

        let sql = `insert into test.person(name, age, mobile) values ('${params.name}', ${params.age}, '${params.mobile}')`;
        let rows = await conn.query(sql, []);

        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        req.app.render('list', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리 중 에러 -> ${err}`);
            }

            res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
            res.end(html);

        })

    } catch(err) {
        console.error(`요청 처리 중 에러 -> ${err}`);
    } finally {
        if (conn) { conn.end(); }
    }

})


const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹서버 실행됨 -> port: ${port}`);
})
