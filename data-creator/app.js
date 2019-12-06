const readlineAsync = require("readline-async");

const fs = require("fs").promises;
const fse = require("fs-extra");
var _ = require("lodash");
var path = require("path");

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

async function writeJs(fileName, data) {
  await fse.writeFile(fileName, data, "utf8");
  console.log("Write complete " + fileName);
}

async function writeTxt(fileName, data) {
  fileName = "./" + fileName;

  await fse.writeFile(fileName, data, "utf8");
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

// retourne l'extension du fichier (jpg, mp3)
function getExtension(fileName) {
  if (fileName.indexOf(".jpg") > 0) {
    return "jpg";
  } else if (fileName.indexOf(".mp3") > 0) {
    return "mp3";
  }
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
  s = replaceAll(replaceAll(s, "\\", "/"), " ", "_");
  d = replaceAll(replaceAll(d, "\\", "/"), " ", "_");

  let movedEntry = {
    fileName: entry.originalText,
    originalText: entry.originalText,
    translatedText: entry.translatedText,
    path: d,
    audio: replaceAll(cleanName(entry.originalText), " ", "_")
  };
  try {
    await fse.copy(s, d);
  } catch (err) {
    console.error(err);
  }
  return movedEntry;
}

// enleve les caractères speciaux (accents)
function cleanName(entry) {
  return _.deburr(entry);
}

async function moveAudio(entry, sourcePath) {
  let s = path.join(sourcePath, entry);

  let d = path.join(mobileDestPathAudio, cleanName(entry));
  s = replaceAll(s, "\\", "/");
  d = replaceAll(d, "\\", "/");
  //console.log("s", { s, d });

  try {
    await fse.copy(s, d);
  } catch (err) {
    console.error(err);
  }
  return true;
}

/***
 * parse le dossier-source "mot-image" contenant les dossiers par catégories
 *       les noms de fichier sont en "fr-arabe.jpg"
 *
 * dans le dossier de sortie (mobilePathDest), crée le dossier "mot-image" si n'existe pas, copie les sous dossiers avec les images en enlevant la partie en arabe car sinon le require echoue
 *
 * crée un fichier data.js dans mobilePathDest avec les noms de fichiers de mobilePathDest
 */
const pathSource = path.join(__dirname, "mot-image");
const mobilePathDest = path.join(__dirname, "..", "mobile", "ressources", "mot-image");
const mobileDestPathAudio = path.join(__dirname, "..", "mobile", "android", "app", "src", "main", "res", "raw");

const apiPathDest = path.join(__dirname, "..", "api", "public", "mot-image");
(async () => {
  try {
    clj({ pathSource, mobilePathDest, mobileDestPathAudio, apiPathDest });

    // vide le dossier de dest
    fse.removeSync(mobilePathDest);
    fse.ensureDirSync(mobilePathDest);
    fse.ensureDirSync(apiPathDest);

    // parcour les sous dossiers
    const subFolders = await fs.readdir(pathSource);

    let mobileOutput = "{";
    let webOutput = "{";

    let missingMp3Output = "";
    for (var i = 0; i < subFolders.length; i++) {
      const sourcePathSubFolder = path.join(pathSource, subFolders[i]);
      res = await fs.stat(sourcePathSubFolder);

      if (res.isDirectory()) {
        // on crée le sous dossier dans le dossier de destination
        const destPathSubFolder = path.join(mobilePathDest, subFolders[i]);
        fse.ensureDirSync(destPathSubFolder);

        missingMp3Output += subFolders[i] + "\n";

        mobileOutput += '"' + subFolders[i] + '":[';
        webOutput += '"' + subFolders[i] + '":[';
        // on parcours les fichiers dans le dossier courant
        const fileNames = await fs.readdir(sourcePathSubFolder);

        for (var s = 0; s < fileNames.length; s++) {
          let extension = getExtension(fileNames[s]);
          if (extension == "jpg") {
            let entry = extractFileName(fileNames[s]);
            let movedEntry = await moveEntry(entry, sourcePathSubFolder, destPathSubFolder);

            let pathToMp3 = path.join(sourcePathSubFolder, replaceAll(movedEntry.originalText, " ", "_"));

            // test que le fichier audio exist pour ce mot
            if (!fse.existsSync(pathToMp3 + ".mp3")) {
              missingMp3Output += "   " + movedEntry.originalText + "\n";
            }
            if (!fse.existsSync(pathToMp3 + "_ar.mp3")) {
              missingMp3Output += "   " + movedEntry.translatedText + "\n";
            }

            if (!entry.translatedText) {
              console.warn("not translated :", entry);
            } else {
              webOutput += `{"path": "${movedEntry.path.replace(
                "C:/work/workspace/language_therapy/mobile/ressources/mot-image/",
                "/mot-image/"
              )}",
              "fr": "${movedEntry.originalText}",
              "ar": "${movedEntry.translatedText}",
              "audio":"${movedEntry.audio}"
            }`;
              mobileOutput += `{"path": require("${movedEntry.path.replace("C:/work/workspace/language_therapy/mobile/", "language_therapy/")}"),
                  "fr": "${movedEntry.originalText}",
                  "ar": "${movedEntry.translatedText}",
                  "audio":"${movedEntry.audio}"
                }`;
              if (s + 1 < fileNames.length) {
                mobileOutput += ",";
                webOutput += ",";
              }
            }
          } else {
            moveAudio(fileNames[s], sourcePathSubFolder);
          }
        }
        mobileOutput += "],";
        webOutput += "],";
      }
    }
    mobileOutput += "}";
    webOutput += "}";
    console.log("finish parsing ");
    console.log("copying...");
	   
	let writeMeMobile = "let _IMAGES =" + mobileOutput + "; export default {_IMAGES }";
    writeJs("../mobile/ressources/data.js", writeMeMobile);
    // copie tout le dossier image mobile propre vers celui de web
    fse.copySync(mobilePathDest, apiPathDest);
    fse.copySync(mobileDestPathAudio, apiPathDest + "/mp3");
	
	webOutput = webOutput.replace("},],}" ,"}]}");	
  
	let writeMeWeb = "let _IMAGES =" + webOutput +";module.exports = function () {this._IMAGES  =_IMAGES ;}"
    writeJs(path.join(__dirname, "..", "api", "data.js"), writeMeWeb);

    writeTxt(`missingMp3Output.txt`, missingMp3Output);
    missingMp3Output;
  } catch (err) {
    console.error("err", err);
  }
})();
