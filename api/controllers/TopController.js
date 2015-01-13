/**
 * TopController
 *
 * @description :: Server-side logic for managing tops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require('request');
var jsdom = require("jsdom"); 
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

// function getCss(bodies) {

//   return $($.parseHTML(bodies)).filter(function() {
//       return $(this).attr("rel")  == "stylesheet";
//   });
// }

function getCss(bodies) {
  var arr = [];
   $.each($.parseHTML(bodies), function() {
      if($(this).attr("rel")  == "stylesheet") {
        arr.push($(this).attr("href"));
      }
   })
  return arr
}

function randomReferer() {
  var refList = [
  "https://www.facebook.com/",
  "https://twitter.com/",
  "http://gigazine.net/", 
  "http://rocketnews24.com/",
  "http://www.uniqlo.com/jp/"
  ];

  return refList[Math.floor( Math.random() * 5 )];
}

module.exports = {
	index: function (req,res) {
    var referer = req.header('Referrer') || randomReferer();
    
    // request.get(referer, function (error, response, body) {
    //   res.view({
    //     httpRes: getCss(response.body), 
    //     referer: referer
    //   });
    // });
    res.view({
    });
  }
};

