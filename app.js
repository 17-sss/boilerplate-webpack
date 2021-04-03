const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const indexRouter = require('./backend/routes');

const app = express();

app.locals.pretty = true;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/frontend/views'));
app.set('port', process.env.SERVER_PORT || 4000);

app.use(express.static(path.join(__dirname, '/frontend/src')));
app.use('/vendors/bootstrap', express.static(path.join(__dirname,"./node_modules/bootstrap/dist")));
app.use('/vendors/fontawesome', express.static(path.join(__dirname,"./node_modules/@fortawesome/fontawesome-free")));
app.use('/vendors/jquery', express.static(path.join(__dirname,"./node_modules/jquery/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

module.exports = app;