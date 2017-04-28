/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var express = require('express');
var mongoose = require('mongoose');
var StockData = require('../models/stock-data');
var IP = require('../models/ip');
var stockHandler = require('../controllers/Handler');
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
mongoose.connect(CONNECTION_STRING);

module.exports = function(app) {
  var result = [];
  app.route('/api/stock-prices')
    .get(function (req, res){
    console.log(req.query.stock, 'api');
    var processing = function(data){
        if (Array.isArray(req.query.stock)){
          result.push(data);
          if (result.length === 2){
           res.json({stockData: [{stock: result[0].stock, 
                                 price: result[0].price,
                                rel_likes: result[0].likes - result[1].likes},
                {stock: result[1].stock,
                             price: result[1].price,
                             rel_likes: result[1].likes - result[0].likes
               }]});
            result = [];
          } else {
            
            stockHandler(req.ip, processing, req.query.stock[1],req.query.like);
          }
        }
      else {
       res.json({stockData: {stock: data.stock, 
                                 price: data.price,
                                likes: data.likes}});
     } 
      
    }
    if (Array.isArray(req.query.stock)){
      stockHandler(req.ip, processing, req.query.stock[0], req.query.like);
    } else stockHandler(req.ip, processing, req.query.stock, req.query.like);
      })
        
      }

  

         






     
           
       
       
            
      