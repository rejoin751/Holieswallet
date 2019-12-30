var express = require("express");
var bodyParser = require('body-parser');
const router = express.Router();
var async = require('async');
var requests = require("../connection");
var multer = require("multer");
const browser = require('browser-detect');
const Controller = require('../Controller/controller');


router.get('/',function(req,res,next){
    res.redirect("/dashboard");
});
router.get('/dashboard',function(req,res,next){
    
    res.render("dashboard");
});
router.get('/transactions',function(req,res,next){
    
    res.render("transactions");
});

router.get('*',function(req, res,next){
    
    res.redirect('/dashboard');
 });


module.exports = router;