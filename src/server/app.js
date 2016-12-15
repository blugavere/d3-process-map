'use strict';

const express = require('express');
const app = express();
const path = require('path');

// must specify options hash even if no options provided!
const phpExpress = require('php-express')({
    // assumes php is in your PATH
    binPath: 'php'
});

// set view engine to php-express
app.set('views', path.join(__dirname, '../client'));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.get('/', (req, res) => res.render('graph', {
    title: 'Hey',
    message: 'Hello there!'
}))

app.use('/public', express.static(path.join(__dirname, '../../public')));

app.use('/', express.static(path.join(__dirname, '../client')));





const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('PHPExpress app listening at http://%s:%s', host, port);
});