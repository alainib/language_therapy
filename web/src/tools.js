/**
 * On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
 * @param min
 * @param max
 * @returns {*}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * ne pas utiliser pour faire un ceil / floor; il y a Math.floor() et Math.ceil() pour ca
 * arondi un nombre décimal, ATTENTION il faut que ce soit avec virgule pas de point sinon il ne prend que l'entier
 * @param {*} value
 * @param {*} precision : 0 ,	1 chiffre apres la virgule, 2 etc
 */
export function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
* permet de tester si la propriété `field` d'un des element du tableau `array` vaut `word`
* [{ "key": "de", "doc_count": 3 },
{ "key": "ad", "doc_count": 1 } ]

* @param word : string
* @param array of object
* @param field name
* @returns {boolean}
*/
export function stringInArrayOfObject(word, array, field) {
  let length = array.length;
  word = word.toLowerCase();
  for (let i = 0; i < length; i++) {
    if (array[i][field] && array[i][field].toLowerCase() === word) return true;
  }
  return false;
}

// trie un tableau d'object selon le champ fieldname
export function arrayObjectSort(arr, fieldname) {
  function compare(a, b) {
    if (a[fieldname] && !b[fieldname]) return -1;
    if (!a[fieldname] && b[fieldname]) return 1;

    if (a[fieldname] < b[fieldname]) return -1;
    if (a[fieldname] > b[fieldname]) return 1;

    return 0;
  }
  return arr.sort(compare);
}

export function isdefined(myvar) {
  return myvar !== null && myvar !== undefined;
}
export function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
/**
 * test if a `word` is in `array`
 * @param word : string
 * @param array : array list
 * @returns {boolean}
 */
export function stringInArray(word, array) {
  if (isdefined(array) && isdefined(word)) {
    return array.includes(word);
  }
  return false;
}

/*
retourne un tableau a partir des clés d'un object
 
*/
export function objectToArray(object) {
  let res = Object.keys(object).map(function(key) {
    return { key, value: object[key] };
  });
  return res;
}

/**
 * return date of today yyyy/mm/dd , if hm==true return yyyy/mm/dd hh-mm
 * @param {*} hm
 */
export function getTodayDate(hm = false) {
  var todayTime = new Date();
  var month = todayTime.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var day = todayTime.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var year = todayTime.getFullYear();
  if (hm) {
    var hours = todayTime.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = todayTime.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}
