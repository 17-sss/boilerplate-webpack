const express = require('express');

const router = express.Router();

// app: [GET, / ]
router.get('/', (req, res) => {
    res.render('index', {title: 'Webpack-express-boilerplate'});
});

module.exports = router;