const readlineAsync = require("readline-async");
const recursive = require("recursive-readdir");
const fs = require("fs").promises;
const googleTranslate = require("google-translate")(
  "AIzaSyAGPrFmDaHB8n0erUabxsUNqkgk2z9HLoM"
);
var jsonfile = require("jsonfile");

// lit depuis le clavier
async function readKeyboard() {
  return readlineAsync().then(line => {
    return line;
  });
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

function replaceAll(str, find, replace) {
  function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  if (str == null) {
    return null;
  }
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

function writeJson(fileName, data) {
  fileName = "../ressources/" + fileName;
  jsonfile
    .writeFile(fileName, data)
    .then(res => {
      console.log("Write complete " + fileName);
    })
    .catch(error => console.error(error));
}

const path = "ressources/mot-image/";

// récupere un path et retourne le nom du fichier sans espace {originalText,translatedText}
function extractFileName(fileName) {
  fileName = replaceAll(fileName.replace(".jpg", ""), "_", " ");
  // on récupere le nom de fichier depuis le chemin complet
  let tmp = fileName.split("\\");
  filenameTmp = tmp[tmp.length - 1];
  // il faut séparer le nom fr de la traduction si elle existe
  if (filenameTmp.indexOf("-") > 0) {
    let tmp2 = filenameTmp.split("-");
    return {
      fileName: filenameTmp,
      originalText: tmp2[0],
      translatedText: tmp2[1]
    };
  } else {
    return {
      fileName: filenameTmp,
      originalText: filenameTmp,
      translatedText: null
    };
  }
}

// rajoute une entree
function addEntry(pushInside, currentWord, lastWord, requirePath, output) {
  console.log(" addEntry currentWord", currentWord);

  pushInside.push({
    path:
      '<require(">' +
      requirePath +
      replaceAll(currentWord.fileName, " ", "_") +
      '.jpg">)',
    //'path': require(requirePath + currentWord.originalText.replace(" ", "_") + ".jpg"),
    fr: currentWord.originalText,
    ar: currentWord.translatedText
  });

  if (lastWord.originalText == currentWord.originalText) {
    writeJson(`output.json`, output);
  }
}

let output = {};

(async () => {
  try {
    const subFolders = await fs.readdir("../" + path);
    console.log("subFolders", subFolders);
    for (var i = 0; i < subFolders.length; i++) {
      const pathToFolder = "../" + path + subFolders[i];

      res = await fs.stat(pathToFolder);

      if (res.isDirectory()) {
        console.log("[y] scan " + subFolders[i] + " ?");
        if ((await readKeyboard()) == "y") {
          output[subFolders[i]] = [];

          // on liste la liste des fichiers dans le dossier
          const subFiles = await fs.readdir(pathToFolder);
          // on récupère le dernier car on est asynchrone, pour retourner les données à la fin
          let lastWord = extractFileName(subFiles[subFiles.length - 1]);

          const requirePath = "number_therapy/" + path + subFolders[i] + "/";

          for (var s = 0; s < subFiles.length; s++) {
            const pushInside = output[subFolders[i]];
            let word = extractFileName(subFiles[s]);

            if (!word.translatedText) {
              googleTranslate.translate(word.originalText, "fr", "ar", function(
                err,
                translation
              ) {
                addEntry(
                  pushInside,
                  {
                    fileName: word.originalText,
                    ...translation
                  },
                  lastWord,
                  requirePath,
                  output
                );
              });
            } else {
              addEntry(pushInside, word, lastWord, requirePath, output);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("err", err);
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
