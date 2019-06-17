
const readlineAsync = require("readline-async");
const recursive = require("recursive-readdir");
const fs = require('fs').promises;
const googleTranslate = require('google-translate')("AIzaSyAGPrFmDaHB8n0erUabxsUNqkgk2z9HLoM");


// lit depuis le clavier 
async function readKeyboard() {

	return readlineAsync().then(line => {
		return line;
	})
}
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

// récupere un path et retourne le nom du fichier sans espace
function extractFileName(fileName) {
	fileName = fileName.replace(".jpg", "").replace("_", " ");
	let tmp = fileName.split("\\");
	return tmp[tmp.length - 1];
}

let output = {};

(async () => {
	try {
		const subFolders = await fs.readdir("../" + path);
		for (var i = 0; i < subFolders.length; i++) {
			const pathToFolder = "../" + path + subFolders[i];

			res = await fs.stat(pathToFolder);

			if (res.isDirectory()) {
				console.log('[y] scan ' + subFolders[i] + " ?");
				if (await readKeyboard() == "y") {

					output[subFolders[i]] = [];

					// on liste la liste des fichiers dans le dossier
					const subFiles = await fs.readdir(pathToFolder);
					// on récupère le dernier car on est asynchrone, pour retourner les données à la fin	
					let lastWord = extractFileName(subFiles[subFiles.length - 1]);

					const requirePath = "number_therapy/" + path + subFolders[i];

					for (var s = 0; s < subFiles.length; s++) {


						const pushInside = output[subFolders[i]];


						let word = extractFileName(subFiles[s]);
						googleTranslate.translate(word, 'fr', 'ar', function (err, translation) {

							pushInside.push({
								'path': '<require(>"' + requirePath + translation.originalText.replace(" ", "_") + ".jpg" + '"<)>',
								'fr': translation.originalText,
								'ar': translation.translatedText
							});

							if (lastWord == translation.originalText) {
								cljmin(output);
							}
						});


					}
				}


			}
		}


	} catch (err) {
		console.error(err);
	}
})();




/*
recursive("../" + path, [], async function (err, files) {

	if (err) {
		console.error(err);
	}


	let lastWord = extractFileName(files[files.length - 1]);
	for (var i = 0; i < files.length; i++) {
		console.log(files[i]);

		let word = extractFileName(files[i]);
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


*/





