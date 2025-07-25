// 1. 모듈 불러오기
const http = require('http');
const express = require('express'); // 다른 사람이 만든 웹 프레임워크. 복잡한 걸 쉽게 만들어줌.
const port = 7001;

// 2. 웹서버 객체 만들기
const app = express(); // 이 안에 "어떤 요청이 들어오면 이렇게 처리해라"를 하나씩 등록하게 됩니다.

// 3. 뷰 엔진 설정 (EJS 사용)
app.set('views', './views2');            // 뷰 폴더 경로
app.set('view engine', 'ejs');          // EJS 템플릿 사용

// 4. 라우터 설정 (라우팅) 주소별로 페이지를 나눈다.
const router = express.Router();
app.use('/', router);

// 5. 로그인 페이지
router.route('/page/loginPage').get((req, res) => {
    console.log(`/page/loginPage 요청됨`);

    const params = req.query;

    const context = {
        message: 'loginPage입니다!',
        date: new Date(),
        name : params.name
    };

    req.app.render('loginPage', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리 중 에러 -> ${err}`);
            res.status(500).send('뷰 렌더링 에러');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
});

// 6. menu 페이지
router.route('/page/menu').get((req, res) => {
    console.log(`/page/menu 요청됨`);

    const params = req.query;

    const context = {
        message: '두 번째 페이지입니다!',
        date: new Date(),
        username: params.username,
        prevPage : params.prevPage
    };

    req.app.render('menu', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리 중 에러 -> ${err}`);
            res.status(500).send('뷰 렌더링 에러');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
});


// 7. clientManage 페이지
router.route('/page/clientManage').get((req, res) => {
    console.log(`/page/clientManage 요청됨`);

    const params = req.query;

    const context = {
        message: '고객관리',
        date: new Date(),
        name: params.username
    };

    req.app.render('clientManage', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리 중 에러 -> ${err}`);
            res.status(500).send('뷰 렌더링 에러');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
});

// 8. productManage 페이지
router.route('/page/productManage').get((req, res) => {
    console.log(`/page/productManage 요청됨`);

    const params = req.query;

    const context = {
        message: '상품관리',
        date: new Date(),
        name: params.username
    };

    req.app.render('productManage', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리 중 에러 -> ${err}`);
            res.status(500).send('뷰 렌더링 에러');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
});


// 9. salesManage 페이지
router.route('/page/salesManage').get((req, res) => {
    console.log(`/page/salesManage 요청됨`);

    const params = req.query;

    const context = {
        message: '매출관리',
        date: new Date(),
        name: params.username
    };

    req.app.render('salesManage', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리 중 에러 -> ${err}`);
            res.status(500).send('뷰 렌더링 에러');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
});


// 10. 웹서버 실행
http.createServer(app).listen(port, () => {
    console.log(`웹 서버 실행됨: http://localhost:${port}/page/loginPage`);
});
