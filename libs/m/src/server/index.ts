import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ejs from 'ejs';

import config from '../../webpack.config';

const app = express();
const compiler = webpack(config);

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output?.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!\n');
});

app.get('/', (req, res) => {
  res.render('index');
});
