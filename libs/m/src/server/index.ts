import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});
