const express = require('express');
const webclient = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.query.b1);
  webclient.get({
    url: "http://192.168.10.4/prepare",
    qs: req.query
  }, function (error, response, body) {
    webclient.get({
      url: "http://192.168.10.4/pushbutton",
    }, function (error, response, body) {
      console.log('taste done');
    });
  });
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send({ "result": "ok"});
});

module.exports = router;
