
'use strict';

var expect = require('chai').expect;
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var StockData = require('../models/stock-data');


module.exports = function(ip, callback, ticker, like)  {
  console.log(ticker, 'module')
        request({url: 'https://finance.google.com/finance/info?q=NASDAQ%3a' + ticker,
              json: true}, 
              function (error, response, body){     
      console.log(ticker, 'request');
       if (error) return;   
       var json = JSON.parse(body.slice(4, body.length));
       StockData.findOne({stock: json[0].t}, function (err, foundStock){
         if (err) return err;
         if (foundStock) {
           foundStock.price = json[0].l;
           if (like &&  foundStock.ips.indexOf(ip) < 0)
           {
             foundStock.likes = foundStock.likes + 1;
             foundStock.ips.push(ip);
           }
           foundStock.save();
           
           callback(foundStock.toObject());
         } else {
       
       var newStock = new StockData({
         stock: json[0].t,
         price: json[0].l,
         ips: []
       })
       
       if (like &&  foundStock.ips.indexOf(ip) < 0) {
         newStock.likes = 1;
         newStock.ips.push(ip);
       } else {
         newStock.likes = 0;
       }
       newStock.save();
       callback(newStock.toObject());
     
       }
        
       })
        })
        
        
        }
    