const readlineAsync = require("readline-async");

const fs = require("fs").promises;
const fse = require("fs-extra");
var path = require("path");

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

async function writeJson(fileName, data) {
  fileName = "../ressources/" + fileName;
  /*jsonfile.writeFile(fileName, data).then(res => {
    console.log("Write complete " + fileName);
  }).catch(error => console.error(error));
  */
  await fse.writeFile(fileName, JSON.stringify(data), 'utf8');
  console.log("Write complete " + fileName);
}

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

/*
 rajoute une entree dans le json
 */
function addEntry(pushInside, currentEntry) {
  // console.log(" addEntry currentEntry", currentEntry);

  pushInside.push({
    //   path: require(replaceAll(currentEntry.path, " ", "_")),
    path: replaceAll(currentEntry.path, " ", "_"),
    fr: currentEntry.originalText,
    ar: currentEntry.translatedText
  });
}

/**
 * recupère une entreé de fichier avec path,fr,ar  , renome le fichier en FR et le place dans destPath
 * @param {obj} entry 
 * @param {string} sourcePath
 * @param {string} destPath 
 */
async function moveEntry(entry, sourcePath, destPath) {

  let s = path.join(sourcePath, entry.fileName + ".jpg");
  let d = path.join(destPath, entry.originalText + ".jpg");
  s = replaceAll(s, "\\", "/");
  d = replaceAll(d, "\\", "/");

  let movedEntry = {
    fileName: entry.originalText,
    originalText: entry.originalText,
    translatedText: entry.translatedText,
    path: d
  }
  try {

    await fse.copy(s, d);
  } catch (err) {
    console.error(err)
  }
  return movedEntry;
}

/***
 * parse le dossier-source "mot-image" contenant les dossiers par catégories
 *       les noms de fichier sont en "fr-arabe.jpg"
 *
 * dans le dossier de sortie (pathDest), crée le dossier "mot-image" si n'existe pas, copie les sous dossiers avec les images en enlevant la partie en arabe car sinon le require echoue
 *
 * crée un fichier data.json dans pathDest avec les noms de fichiers de pathDest
 */

const pathSource = path.join(__dirname, "mot-image");
const pathDest = path.join(__dirname, "..", "ressources", "mot-image");
let output = {};


(async () => {
  try {
    clj({ pathSource, pathDest });
    console.log("continu ? press y");

    // vide le dossier de dest
    fse.removeSync(pathDest);
    fse.ensureDirSync(pathDest);

    if (true || (await readKeyboard()) == "y") {
      // parcour les sous dossier
      const subFolders = await fs.readdir(pathSource);
      console.log("subFolders", subFolders);


      for (var i = 0; i < subFolders.length; i++) {
        const sourcePathSubFolder = path.join(pathSource, subFolders[i]);

        res = await fs.stat(sourcePathSubFolder);

        if (res.isDirectory()) {
          // on crée le sous dossier dans le dossier de destination
          const destPathSubFolder = path.join(pathDest, subFolders[i]);
          fse.ensureDirSync(destPathSubFolder);

          output[subFolders[i]] = [];
          // on parcours les fichiers dans le dossier courant
          const fileNames = await fs.readdir(sourcePathSubFolder);

          for (var s = 0; s < fileNames.length; s++) {
            const pushInside = output[subFolders[i]];
            let entry = extractFileName(fileNames[s]);
            let movedEntry = await moveEntry(entry, sourcePathSubFolder, destPathSubFolder);
            if (!entry.translatedText) {
              console.warn("not translated :", entry);
            } else {
              addEntry(pushInside, movedEntry);
            }
          }
        }
      }

      console.log("finish ALL ");
      writeJson(`output.json`, output);

    }
  } catch (err) {
    console.error("err", err);
  }
})();



/*

const recursive = require("recursive-readdir");
const googleTranslate = require("google-translate")(
  "AIzaSyAGPrFmDaHB8n0erUabxsUNqkgk2z9HLoM"
);


recursive("../" + path, [], async function (err, files) {

	if (err) {
		console.error(err);
	}


	let lastEntry = extractFileName(files[files.length - 1]);
	for (var i = 0; i < files.length; i++) {
		console.log(files[i]);

		let entry = extractFileName(files[i]);
		googleTranslate.translate(entry, 'fr', 'ar', function (err, translation) {

			output.push({
				'path': '<require(>"' + requirePath + translation.originalText.replace(" ", "_") + ".jpg" + '"<)>',
				'fr': translation.originalText,
				'ar': translation.translatedText
			});

			if (lastEntry == translation.originalText) {
				cljmin(output);
			}
		});

	}
});


*/
