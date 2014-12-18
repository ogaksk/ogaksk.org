/**
 * LecturesController
 *
 * @description :: Server-side logic for managing lectures
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req,res) {
    res.view({
      anounce: "授業のアナウンスはこちら...",
      anouncelink: "https://docs.google.com/document/d/1czgH8AzDZneKLkr-x8ZVI7945So_heYKPbSWA5U6zjI/edit?usp=sharing", 
      pubarea: "URLなどの置き場はこちら...",
      pubarealink: "https://docs.google.com/document/d/15z-kuNxdVNnvMzATXM9O3IvqZ6YMOnouf_njEtjUtLo/edit?usp=sharing"
    });
  }
};

