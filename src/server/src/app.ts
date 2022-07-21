import express from 'express';

const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config();

// 3001 포트로 서버 오픈
app.listen(3001, function () {
  console.log('start! express server on port 3001');
});

// dist 디렉토리를 static으로 기억한다.
// dist 내부의 파일들을 localhost:3001/파일명 으로 브라우저에서 불러올 수 있다.
app.use(express.static('build'));

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', './build/index.html'));
});

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/1/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/2/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/3/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/4/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/5/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/6/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/deliverya/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/deliveryu/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/destination/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/rider/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/shopfee/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.get('/shoplocation/:commonParams', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});
