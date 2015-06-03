/**
 * TopController
 *
 * @description :: Server-side logic for managing tops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require('request');
var jsdom = require("jsdom"); 
var tumblrApi = "http://api.tumblr.com/v2/blog/ogaksk.tumblr.com/posts/photo?api_key=OIw2IeiARIPWtiarpM03ckcJlDYLAIU8DIdNoLAN3m9Fm66fjN&limit=1";
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
    // var referer = req.header('Referrer') || randomReferer();
    
    request.get(tumblrApi, function (error, response, body) {
      var data = JSON.parse(body);

      res.view({
        imgUrl: data.response.posts[0].photos[0].alt_sizes[0].url, 
        date: data.response.posts[0].date,
        caption: data.response.posts[0].caption
      });
    });
    // res.view({
    // });
  }
};

