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

module.exports = {
	 index: function (req,res) {
    var referer = req.headers.referer || "https://www.google.co.jp";
    request.get('http://tkmab.com', function (error, response, body) {
      res.view({
        httpRes: getCss(response.body), 
        referer: referer
      });
    });
  }
};

