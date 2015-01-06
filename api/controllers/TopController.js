/**
 * TopController
 *
 * @description :: Server-side logic for managing tops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require('request');

module.exports = {
	 index: function (req,res) {
    var httpRes;
    request.get('http://tkmab.com', function (error, response, body) {
      
      httpRes = response.body;
      console.log(httpRes);
        // if (!error && response.statusCode == 200) {
        //     httpRes = response.body;
        //     // Continue with your processing here.
        // }
      res.view({
        httpRes: httpRes
      });
    });
  }
};

