const fs = require("fs");
const path = require('path');
module.exports = function() {
  /**
   * On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
   * @param min
   * @param max
   * @returns {*}
   */
  this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  this.writeLog = function ( data) { 
	
	var pathToFileLog = path.join(__dirname,'log', 'log.txt');
	console.log("writeLog", data,pathToFileLog );
	fs.appendFile(pathToFileLog, data +"\n", { encoding: 'utf8' }, function (err) {
		  if (err) {
				console.error("write error", err);
		  }
	});
   };
  this.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  /**
* permet de tester si la propriété `field` d'un des element du tableau `array` vaut `word`
* [{ "key": "de", "doc_count": 3 },
{ "key": "ad", "doc_count": 1 } ]

* @param word : string
* @param array of object
* @param field name
* @returns {boolean}
*/
  this.stringInArrayOfObject = function(word, array, field) {
    let length = array.length;
    word = word.toLowerCase();
    for (let i = 0; i < length; i++) {
      if (array[i][field] && array[i][field].toLowerCase() === word) return true;
    }
    return false;
  };
};
