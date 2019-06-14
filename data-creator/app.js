
var recursive = require("recursive-readdir");
var fs = require("fs");
var googleTranslate = require('google-translate')("AIzaSyAGPrFmDaHB8n0erUabxsUNqkgk2z9HLoM");


function cljmin(data) {
	console.log(JSON.stringify(data));
}
function clj(data) {
	console.log(JSON.stringify(data, undefined, 4));
}
function clnj(name, data) {
	console.log(name, JSON.stringify(data, undefined, 4));
}


const path = "ressources/mot-image/";
const requirePath = "number_therapy/" + path;
function cleanFileName(fileName) {
	fileName = fileName.replace(".jpg", "").replace("_", " ");
	let tmp = fileName.split("\\");
	return tmp[tmp.length - 1];
}

let output = [];

recursive("../" + path, [], async function (err, files) {

	if (err) {
		console.error(err);
	}

	let lastWord = cleanFileName(files[files.length - 1]);
	for (var i = 0; i < files.length; i++) {

		let word = cleanFileName(files[i]);
		googleTranslate.translate(word, 'fr', 'ar', function (err, translation) {

			output.push({
				'path': '<require(>"' + requirePath + translation.originalText.replace(" ", "_") + ".jpg" + '"<)>',
				'fr': translation.originalText,
				'ar': translation.translatedText
			});

			if (lastWord == translation.originalText) {
				cljmin(output);
			}
		});
	}
});






